package com.example.backend.dtos;

import com.example.backend.entity.IncidentCategory;
import com.example.backend.entity.IncidentPriority;
import com.example.backend.entity.IncidentStatus;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class UpdateRequest {
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
}
