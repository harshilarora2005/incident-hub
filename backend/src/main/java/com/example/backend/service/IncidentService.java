package com.example.backend.service;

import com.example.backend.dtos.CreateRequest;
import com.example.backend.dtos.IncidentDetails;
import com.example.backend.entity.Incident;
import com.example.backend.entity.IncidentPriority;
import com.example.backend.entity.IncidentStatus;
import com.example.backend.entity.User;
import com.example.backend.mappers.IncidentMapper;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IncidentService {
    private final IncidentRepository incidents;
    private final UserRepository users;
    private final IncidentMapper mapper;
    public IncidentDetails create(CreateRequest r, User reporter) {
        Incident incident = Incident.builder()
                .title(r.getTitle())
                .description(r.getDescription())
                .priority(
                        r.getPriority() == null ? IncidentPriority.MEDIUM : r.getPriority()
                )
                .status(IncidentStatus.OPEN)
                .reporter(reporter)
                .assignee(
                        r.getAssigneeId() == null? null : users.findById(r.getAssigneeId()).orElse(null)
                )
                .build();
        System.out.println(incident);
        incident= incidents.save(incident);
        IncidentDetails inc = mapper.toDto(incident);
        return inc;
    }

}
