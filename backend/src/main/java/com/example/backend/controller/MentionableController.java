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
        Incident incident = incidentRepository.findById(incidentId)
                .orElseThrow(() -> new CustomExceptionHandler("Incident not found: " + incidentId));

        List<UserDTO> users = new ArrayList<>();
        users.add(userMapper.toDto(incident.getReporter()));
        incident.getAssignees().stream()
                .map(userMapper::toDto)
                .forEach(users::add);

        List<UserDTO> distinct = users.stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(
                                UserDTO::getId,
                                u -> u,
                                (a, b) -> a,
                                LinkedHashMap::new
                        ),
                        m -> new ArrayList<>(m.values())
                ));

        return ResponseEntity.ok(distinct);
    }
}