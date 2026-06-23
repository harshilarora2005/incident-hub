package com.example.backend.controller;

import com.example.backend.dtos.UserDTO;
import com.example.backend.entity.Incident;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.UserMapper;
import com.example.backend.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/incidents/{incidentId}/mentionables")
@RequiredArgsConstructor
public class MentionableController {

    private final IncidentRepository incidentRepository;
    private final UserMapper userMapper;

    @GetMapping
    public ResponseEntity<List<UserDTO>> getMentionables(@PathVariable Long incidentId) {
        Incident incident = incidentRepository.findByIdWithReporterAndAssignees(incidentId)
                .orElseThrow(() -> new CustomExceptionHandler("Incident not found: " + incidentId));

        List<UserDTO> distinct = new ArrayList<>(new LinkedHashMap<Long, UserDTO>() {{
            put(incident.getReporter().getId(), userMapper.toDto(incident.getReporter()));
            incident.getAssignees().forEach(a -> putIfAbsent(a.getId(), userMapper.toDto(a)));
        }}.values());

        return ResponseEntity.ok(distinct);
    }
}