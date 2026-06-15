package com.example.backend.dtos;

import com.example.backend.entity.*;
import jakarta.validation.constraints.NotBlank;
import java.time.*;
import java.util.List;

public class IncidentRecords {

    public record CreateRequest(
            @NotBlank String title,
            String description,
            IncidentPriority priority,
            IncidentCategory category,
            List<Long> assigneeIds,
            LocalDate dueAt
    ) {}

    public record QuickCreateRequest(
            String title,
            IncidentStatus status,
            LocalDate dueAt,
            List<Long> assigneeIds
    ) {}

    public record UpdateStatusRequest(IncidentStatus status) {}
    public record UpdateRequest(
            String title,
            String description,
            IncidentStatus status,
            IncidentPriority priority,
            IncidentCategory category,
            UserDTO reporter,
            List<Long> assigneesIds,
            LocalDate dueAt
    ) {}
    public record IncidentDetails(
            long id,
            String title,
            String description,
            IncidentStatus status,
            IncidentPriority priority,
            IncidentCategory category,
            Integer progress,
            UserDTO reporter,
            List<UserDTO> assignees,
            LocalDate dueAt,
            Instant resolvedAt,
            Instant createdAt,
            Instant updatedAt
    ) {}
}