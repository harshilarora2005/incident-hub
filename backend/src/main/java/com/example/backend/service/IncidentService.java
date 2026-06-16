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

import java.time.Instant;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncidentService {

    private final AuditService auditService;
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
        auditService.log(saved.getId(), saved.getTitle(), reporter,
                AuditAction.CREATED, null, saved.getTitle());
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
        auditService.log(saved.getId(), saved.getTitle(), reporter,
                AuditAction.CREATED, null, saved.getTitle());
        notifyAssignees(saved, saved.getAssignees(), reporter);
        return incidentMapper.toDto(saved);
    }

    @Transactional
    public void updateStatus(Long incidentId, IncidentStatus newStatus, User changedBy) {
        Incident incident = findIncidentById(incidentId);
        String oldStatus = incident.getStatus().name();
        incident.setStatus(newStatus);
        incident.setProgress(progressFor(newStatus));
        auditService.log(incidentId, incident.getTitle(), changedBy,
                AuditAction.STATUS_CHANGED, oldStatus, newStatus.name());
    }

    @Transactional
    public IncidentDetails updateIncident(Long id, UpdateRequest request, User sender) {
        Incident incident = findIncidentById(id);

        if (request.title() != null && !request.title().equals(incident.getTitle())) {
            auditService.log(id, incident.getTitle(), sender,
                    AuditAction.TITLE_CHANGED, incident.getTitle(), request.title());
        }
        if (request.description() != null && !request.description().equals(incident.getDescription())) {
            auditService.log(id, incident.getTitle(), sender,
                    AuditAction.DESCRIPTION_CHANGED, null, null);
        }
        if (request.priority() != null && !request.priority().equals(incident.getPriority())) {
            auditService.log(id, incident.getTitle(), sender,
                    AuditAction.PRIORITY_CHANGED,
                    incident.getPriority().name(), request.priority().name());
        }
        if (request.category() != null && !request.category().equals(incident.getCategory())) {
            auditService.log(id, incident.getTitle(), sender,
                    AuditAction.CATEGORY_CHANGED,
                    incident.getCategory().name(), request.category().name());
        }
        if (request.dueAt() != null && !request.dueAt().equals(incident.getDueAt())) {
            auditService.log(id, incident.getTitle(), sender,
                    AuditAction.DUE_DATE_CHANGED,
                    String.valueOf(incident.getDueAt()), String.valueOf(request.dueAt()));
        }

        Set<Long> existingIds = incident.getAssignees().stream()
                .map(User::getId).collect(Collectors.toSet());
        Set<User> updatedAssignees = resolveAssignees(request.assigneesIds(), true);
        Set<Long> updatedIds = updatedAssignees.stream()
                .map(User::getId).collect(Collectors.toSet());

        List<User> newlyAssigned = updatedAssignees.stream()
                .filter(u -> !existingIds.contains(u.getId())).toList();
        List<User> removed = incident.getAssignees().stream()
                .filter(u -> !updatedIds.contains(u.getId())).toList();

        newlyAssigned.forEach(u -> auditService.log(id, incident.getTitle(), sender,
                AuditAction.ASSIGNEE_ADDED, null, u.getName()));
        removed.forEach(u -> auditService.log(id, incident.getTitle(), sender,
                AuditAction.ASSIGNEE_REMOVED, u.getName(), null));

        incident.setAssignees(updatedAssignees);
        incidentMapper.updateIncidentFromRequest(request, incident);
        notifyAssignees(incident, newlyAssigned, sender);

        return incidentMapper.toDto(incident);
    }

    @Transactional
    public void deleteIncident(Long id, User deletedBy) {
        Incident incident = findIncidentById(id);
        auditService.log(id, incident.getTitle(), deletedBy,
                AuditAction.DELETED, incident.getTitle(), null);
        incident.setDeletedAt(Instant.now());
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