package com.example.backend.dtos;

import com.example.backend.entity.IncidentStatus;
import lombok.Data;

@Data
public class QuickCreateRequest {
    private String title;
    private IncidentStatus status;
}