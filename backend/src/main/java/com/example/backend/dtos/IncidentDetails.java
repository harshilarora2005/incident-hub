package com.example.backend.dtos;

import com.example.backend.entity.IncidentCategory;
import com.example.backend.entity.IncidentPriority;
import com.example.backend.entity.IncidentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentDetails {
    private long id;
    private String title;
    private String description;
    private IncidentStatus status;
    private IncidentPriority priority;
    private IncidentCategory category;
    private Integer progress;
    private UserDTO reporter;
    private List<UserDTO> assignees;
    private LocalDate dueAt;
    private Instant resolvedAt;
    private Instant createdAt;
    private Instant updatedAt;
}