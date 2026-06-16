package com.example.backend.controller;

import com.example.backend.dtos.AuditRecords.AuditLogDTO;
import com.example.backend.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/audit")
@RequiredArgsConstructor
public class AuditController {

    private final AuditService auditService;

    @GetMapping("/recent")
    public ResponseEntity<List<AuditLogDTO>> recent() {
        return ResponseEntity.ok(auditService.getRecent());
    }

    @GetMapping("/incident/{incidentId}")
    public ResponseEntity<List<AuditLogDTO>> forIncident(@PathVariable Long incidentId) {
        return ResponseEntity.ok(auditService.getForIncident(incidentId));
    }
}