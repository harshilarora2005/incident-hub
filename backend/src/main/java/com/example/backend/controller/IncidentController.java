package com.example.backend.controller;

import com.example.backend.dtos.IncidentRecords.*;
import com.example.backend.dtos.AppUserDetails;
import com.example.backend.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public ResponseEntity<List<IncidentDetails>> list() {
        return ResponseEntity.ok(incidentService.findAll());
    }

    @PostMapping
    public ResponseEntity<IncidentDetails> create(@Valid @RequestBody CreateRequest request, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(incidentService.create(request, userDetails.getUser()));
    }

    @PostMapping("/quick")
    public ResponseEntity<IncidentDetails> createQuick(@Valid @RequestBody QuickCreateRequest request, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(incidentService.createQuick(request, userDetails.getUser()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<IncidentDetails> findById(@PathVariable Long id) {
        return ResponseEntity.ok(incidentService.findById(id));
    }

    @GetMapping("/my")
    public ResponseEntity<List<IncidentDetails>> listMy(@AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(incidentService.findAllForUser(userDetails.getId()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable Long id, @RequestBody UpdateStatusRequest request) {
        incidentService.updateStatus(id, request.status());
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<IncidentDetails> updateIncident(@PathVariable Long id, @RequestBody UpdateRequest request, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(incidentService.updateIncident(id, request, userDetails.getUser()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(
            @PathVariable Long id,
            @AuthenticationPrincipal AppUserDetails userDetails) {
        incidentService.deleteIncident(id, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }
}