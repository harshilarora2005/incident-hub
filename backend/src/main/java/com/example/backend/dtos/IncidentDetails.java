package com.example.backend.dtos;

import com.example.backend.entity.IncidentPriority;
import com.example.backend.entity.IncidentStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class IncidentDetails {
    private long id;
    private String title;
    private String description;
    private IncidentStatus status;
    private IncidentPriority priority;
    private UserDTO reporter;
    private UserDTO assignee;
    private Instant createdAt;
    private Instant updatedAt;

}
