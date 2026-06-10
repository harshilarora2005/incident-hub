package com.example.backend.service;

import com.example.backend.dtos.CreateRequest;
import com.example.backend.dtos.IncidentDetails;
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
    private final IncidentRepository incidents;
    private final UserRepository users;
    private final IncidentMapper mapper;
    public IncidentDetails create(CreateRequest r, User reporter) {
        Set<User> assignees = new HashSet<>();
        if (r.getAssigneeIds() != null && !r.getAssigneeIds().isEmpty()) {
            List<User> usersFound = users.findAllById(r.getAssigneeIds());
            if (usersFound.size() != r.getAssigneeIds().size()) {
                throw new CustomExceptionHandler(
                        "One or more assignees were not found"
                );
            }
            assignees.addAll(usersFound);
        }
        Incident incident = Incident.builder()
                .title(r.getTitle())
                .description(r.getDescription())
                .priority(
                        r.getPriority() == null
                                ? IncidentPriority.MEDIUM
                                : r.getPriority()
                )
                .category(
                        r.getCategory() == null
                                ? IncidentCategory.GENERAL
                                : r.getCategory()
                )
                .dueAt(r.getDueAt())
                .status(IncidentStatus.OPEN)
                .progress(0)
                .reporter(reporter)
                .assignees(assignees)
                .build();

        incident = incidents.save(incident);
        IncidentDetails inc = mapper.toDto(incident);
        return inc;
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
        return mapper.toDto(incidents.findById(id).orElseThrow(() ->
                new CustomExceptionHandler(
                        "Incident with id " + id + " not found"
                )
        ));
    }

    @Transactional(readOnly = true)
    public List<IncidentDetails> getIncidentsForUser(Long userId) {
       User us = users.findById(userId).orElseThrow(()->
               new CustomExceptionHandler("User not found"));
        Set<Incident> li = us.getAssignedIncidents()
                .stream()
                .sorted(
                        Comparator.comparing(Incident::getCreatedAt)
                                .reversed()
                )
                .collect(Collectors.toCollection(LinkedHashSet::new));

       return li.stream().map(mapper::toDto).toList();
    }

}
