package com.example.backend.repository;

import com.example.backend.dtos.IncidentRecords.IncidentDetails;
import com.example.backend.entity.Incident;
import com.example.backend.entity.IncidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findAllByOrderByCreatedAtDesc();
    long countByStatus(IncidentStatus status);
}
