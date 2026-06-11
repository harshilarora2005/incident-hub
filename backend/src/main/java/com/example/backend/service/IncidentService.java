package com.example.backend.service;

import com.example.backend.dtos.CreateRequest;
import com.example.backend.dtos.IncidentDetails;
import com.example.backend.dtos.QuickCreateRequest;
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
    private final IncidentRepository incidents;
    private final UserRepository users;
    private final IncidentMapper mapper;

    @Transactional
    public IncidentDetails create(CreateRequest r, User reporter) {
        Set<User> assignees = resolveAssignees(r.getAssigneeIds(), true);

        Incident incident = Incident.builder()
                .title(r.getTitle())
                .description(r.getDescription())
                .priority(r.getPriority() == null ? IncidentPriority.MEDIUM : r.getPriority())
                .category(r.getCategory() == null ? IncidentCategory.GENERAL : r.getCategory())
                .dueAt(r.getDueAt())
                .status(IncidentStatus.OPEN)
                .progress(0)
                .reporter(reporter)
                .assignees(assignees)
                .build();

        return mapper.toDto(incidents.save(incident));
    }
    public void updateStatus(Long incidentId, IncidentStatus newStatus) {
        Incident incident = incidents.findById(incidentId).orElseThrow(()->
                new CustomExceptionHandler("Incident not found")
        );
        incident.setStatus(newStatus);
        incidents.save(incident);
    }
    @Transactional
    public IncidentDetails createQuick(QuickCreateRequest r, User reporter) {
        Set<User> assignees = resolveAssignees(r.getAssigneeIds(), false);

        Incident incident = Incident.builder()
                .title(r.getTitle())
                .status(r.getStatus() == null ? IncidentStatus.OPEN : r.getStatus())
                .dueAt(r.getDueAt())
                .progress(resolveProgress(r.getStatus()))
                .reporter(reporter)
                .assignees(assignees)
                .build();

        return mapper.toDto(incidents.save(incident));
    }

    @Transactional(readOnly = true)
    public List<IncidentDetails> findAll() {
        return incidents.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(mapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public IncidentDetails findById(Long id) {
        return mapper.toDto(
                incidents.findById(id).orElseThrow(() ->
                        new CustomExceptionHandler("Incident with id " + id + " not found"))
        );
    }

    @Transactional(readOnly = true)
    public List<IncidentDetails> getIncidentsForUser(Long userId) {
        User user = users.findById(userId).orElseThrow(() ->
                new CustomExceptionHandler("User not found"));

        return user.getAssignedIncidents()
                .stream()
                .sorted(Comparator.comparing(Incident::getCreatedAt).reversed())
                .map(mapper::toDto)
                .toList();
    }

    private Set<User> resolveAssignees(List<Long> assigneeIds, boolean strict) {
        if (assigneeIds == null || assigneeIds.isEmpty()) return new HashSet<>();

        List<User> found = users.findAllById(assigneeIds);
        if (strict && found.size() != assigneeIds.size()) {
            throw new CustomExceptionHandler("One or more assignees were not found");
        }
        return new HashSet<>(found);
    }

    private Integer resolveProgress(IncidentStatus status) {
        Integer progress = switch(status){
            case OPEN -> 0;
            case IN_PROGRESS -> 50;
            case REVIEW -> 90;
            case RESOLVED -> 100;
            default -> 0;
        };
        return progress;
    }
}