package com.example.backend.service;

import com.example.backend.dtos.IncidentRecords.*;
import com.example.backend.entity.*;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.IncidentMapper;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final NotificationService notificationService;
    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;
    private final IncidentMapper incidentMapper;

    @Transactional
    public IncidentDetails create(CreateRequest request, User reporter) {
        Incident incident = Incident.builder()
                .title(request.title())
                .description(request.description())
                .priority(Objects.requireNonNullElse(request.priority(), IncidentPriority.MEDIUM))
                .category(Objects.requireNonNullElse(request.category(), IncidentCategory.GENERAL))
                .dueAt(request.dueAt())
                .status(IncidentStatus.OPEN)
                .progress(0)
                .reporter(reporter)
                .assignees(resolveAssignees(request.assigneeIds(), true))
                .build();

        Incident saved = incidentRepository.save(incident);
        notifyAssignees(saved, saved.getAssignees(), reporter);
        return incidentMapper.toDto(saved);
    }

    @Transactional
    public IncidentDetails createQuick(QuickCreateRequest request, User reporter) {
        IncidentStatus status = Objects.requireNonNullElse(request.status(), IncidentStatus.OPEN);
        Incident incident = Incident.builder()
                .title(request.title())
                .status(status)
                .dueAt(request.dueAt())
                .progress(progressFor(status))
                .reporter(reporter)
                .assignees(resolveAssignees(request.assigneeIds(), false))
                .build();

        Incident saved = incidentRepository.save(incident);
        notifyAssignees(saved, saved.getAssignees(), reporter);
        return incidentMapper.toDto(saved);
    }

    @Transactional
    public void updateStatus(Long incidentId, IncidentStatus newStatus) {
        Incident incident = findIncidentById(incidentId);
        incident.setStatus(newStatus);
        incident.setProgress(progressFor(newStatus));
    }

    @Transactional
    public IncidentDetails updateIncident(Long id, UpdateRequest request, User sender) {
        Incident incident = findIncidentById(id);

        Set<Long> existingAssigneeIds = incident.getAssignees().stream()
                .map(User::getId)
                .collect(Collectors.toSet());

        Set<User> updatedAssignees = resolveAssignees(request.assigneesIds(), true);

        List<User> newlyAssigned = updatedAssignees.stream()
                .filter(u -> !existingAssigneeIds.contains(u.getId()))
                .toList();

        incident.setAssignees(updatedAssignees);
        incidentMapper.updateIncidentFromRequest(request, incident);
        notifyAssignees(incident, newlyAssigned, sender);

        return incidentMapper.toDto(incident);
    }

    @Transactional(readOnly = true)
    public List<IncidentDetails> findAll() {
        return incidentRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(incidentMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public IncidentDetails findById(Long id) {
        return incidentMapper.toDto(findIncidentById(id));
    }

    @Transactional(readOnly = true)
    public List<IncidentDetails> findAllForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptionHandler("User not found"));
        return user.getAssignedIncidents().stream()
                .sorted(Comparator.comparing(Incident::getCreatedAt).reversed())
                .map(incidentMapper::toDto)
                .toList();
    }

    // --- helpers ---

    private Incident findIncidentById(Long id) {
        return incidentRepository.findById(id)
                .orElseThrow(() -> new CustomExceptionHandler("Incident with id " + id + " not found"));
    }

    private Set<User> resolveAssignees(List<Long> assigneeIds, boolean strict) {
        if (assigneeIds == null || assigneeIds.isEmpty()) return new HashSet<>();
        List<User> found = userRepository.findAllById(assigneeIds);
        if (strict && found.size() != assigneeIds.size()) {
            throw new CustomExceptionHandler("One or more assignees were not found");
        }
        return new HashSet<>(found);
    }

    private void notifyAssignees(Incident incident, Collection<User> assignees, User sender) {
        assignees.forEach(assignee -> {
            if (!assignee.getId().equals(sender.getId())) {
                notificationService.send(
                        "Assigned to incident",
                        "You've been assigned to: " + incident.getTitle(),
                        incident.getId(),
                        assignee,
                        sender
                );
            }
        });
    }

    private int progressFor(IncidentStatus status) {
        return switch (status) {
            case IN_PROGRESS -> 50;
            case REVIEW      -> 90;
            case RESOLVED    -> 100;
            default          -> 0;
        };
    }
}