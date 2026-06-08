package com.example.backend.controller;

import com.example.backend.dtos.IncidentDetails;
import com.example.backend.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {
    private final IncidentService service;
    private final
    @PostMapping
    public IncidentDetails create(@Valid @RequestBody IncidentDetails incidentDetails) {
        return service.create(incidentDetails);
    }

}
