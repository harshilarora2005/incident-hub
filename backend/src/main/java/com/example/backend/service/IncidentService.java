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

@Service
@RequiredArgsConstructor
public class IncidentService {

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

        return incidentMapper.toDto(incidentRepository.save(incident));
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

        return incidentMapper.toDto(incidentRepository.save(incident));
    }

    @Transactional
    public void updateStatus(Long incidentId, IncidentStatus newStatus) {
        Incident incident = findIncidentById(incidentId);
        incident.setStatus(newStatus);
        incident.setProgress(progressFor(newStatus));
    }

    @Transactional
    public IncidentDetails updateIncident(Long id, UpdateRequest request) {
        Incident incident = findIncidentById(id);
        incidentMapper.updateIncidentFromRequest(request, incident);
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

    private int progressFor(IncidentStatus status) {
        return switch (status) {
            case IN_PROGRESS -> 50;
            case REVIEW -> 90;
            case RESOLVED -> 100;
            default -> 0;
        };
    }
}