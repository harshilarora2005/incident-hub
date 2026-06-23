package com.example.backend.repository;

import com.example.backend.dtos.IncidentRecords.IncidentDetails;
import com.example.backend.entity.Incident;
import com.example.backend.entity.IncidentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findAllByOrderByCreatedAtDesc();
    long countByStatus(IncidentStatus status);
    @Query("""
    SELECT i FROM Incident i
    LEFT JOIN FETCH i.reporter
    LEFT JOIN FETCH i.assignees
    WHERE i.id = :id
    """)
    Optional<Incident> findByIdWithReporterAndAssignees(@Param("id") Long id);
}
