package com.example.backend.service;

import com.example.backend.dtos.CreateRequest;
import com.example.backend.dtos.IncidentDetails;
import com.example.backend.entity.Incident;
import com.example.backend.entity.IncidentPriority;
import com.example.backend.entity.IncidentStatus;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.IncidentMapper;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IncidentService {
    private final IncidentRepository incidents;
    private final UserRepository users;
    private final IncidentMapper mapper;
    public IncidentDetails create(CreateRequest r, User reporter) {
        User as = null;
        if (r.getAssigneeId() != null) {
            as = users.findById(r.getAssigneeId())
                    .orElseThrow(() ->
                            new CustomExceptionHandler(
                                    "User with id " + r.getAssigneeId() + " not found"
                            )
                    );
        }
        Incident incident = Incident.builder()
                .title(r.getTitle())
                .description(r.getDescription())
                .priority(
                        r.getPriority() == null ? IncidentPriority.MEDIUM : r.getPriority()
                )
                .status(IncidentStatus.OPEN)
                .reporter(reporter)
                .assignee(as)
                .build();
        System.out.println(incident);
        incident= incidents.save(incident);
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

    public void delete(Long id) {

    }

}
