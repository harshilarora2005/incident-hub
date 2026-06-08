package com.example.backend.dtos;

import com.example.backend.entity.IncidentPriority;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateRequest {
    @NotBlank
    private String title;

    private String description;
    private IncidentPriority priority;
    private Long assigneeId;

}
