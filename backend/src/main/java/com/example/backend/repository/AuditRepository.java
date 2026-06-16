package com.example.backend.repository;

import com.example.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuditRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByIncidentIdOrderByChangedAtDesc(Long incidentId);
    List<AuditLog> findTop20ByOrderByChangedAtDesc();
}
