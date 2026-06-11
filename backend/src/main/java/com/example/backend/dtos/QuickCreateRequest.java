package com.example.backend.dtos;

import com.example.backend.entity.IncidentStatus;
import lombok.Data;
import java.time.LocalDate;
import java.util.List;

@Data
public class QuickCreateRequest {
    private String title;
    private IncidentStatus status;
    private LocalDate dueAt;
    private List<Long> assigneeIds;
}