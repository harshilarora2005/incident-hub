package com.example.backend.dtos;

import com.example.backend.entity.IncidentCategory;
import com.example.backend.entity.IncidentPriority;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class CreateRequest {
    @NotBlank
    private String title;
    private String description;
    private IncidentPriority priority;
    private IncidentCategory category;
    private List<Long> assigneeIds;
    private LocalDate dueAt;
}
