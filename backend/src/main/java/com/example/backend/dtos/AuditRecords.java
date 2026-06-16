package com.example.backend.dtos;

import com.example.backend.entity.AuditAction;
import java.time.Instant;
public class AuditRecords {
    public record AuditLogDTO(
            Long id,
            Long incidentId,
            String incidentTitle,
            String changedByName,
            String changedByAvatar,
            AuditAction action,
            String oldValue,
            String newValue,
            Instant changedAt
    ) {}
}