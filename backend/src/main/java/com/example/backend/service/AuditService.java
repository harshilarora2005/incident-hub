package com.example.backend.service;

import com.example.backend.dtos.AuditRecords.AuditLogDTO;
import com.example.backend.entity.*;
import com.example.backend.mappers.AuditMapper;
import com.example.backend.repository.AuditRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditRepository auditLogRepository;
    private final AuditMapper auditMapper;

    @Transactional
    public void log(Long incidentId, String incidentTitle, User changedBy, AuditAction action, String oldValue, String newValue) {
        auditLogRepository.save(
                AuditLog.builder()
                        .incidentId(incidentId)
                        .incidentTitle(incidentTitle)
                        .changedBy(changedBy)
                        .action(action)
                        .oldValue(oldValue)
                        .newValue(newValue)
                        .changedAt(Instant.now())
                        .build()
        );
    }

    @Transactional(readOnly = true)
    public List<AuditLogDTO> getForIncident(Long incidentId) {
        return auditLogRepository.findByIncidentIdOrderByChangedAtDesc(incidentId)
                .stream().map(auditMapper::toDto).toList();
    }

    @Transactional(readOnly = true)
    public List<AuditLogDTO> getRecent() {
        return auditLogRepository.findTop20ByOrderByChangedAtDesc()
                .stream().map(auditMapper::toDto).toList();
    }
}