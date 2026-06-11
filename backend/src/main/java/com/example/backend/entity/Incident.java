package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.time.Instant;
import java.util.*;
import java.time.LocalDate;

@Entity
@Table(name = "incidents")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
@SQLRestriction("is_deleted = false")
public class Incident {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IncidentStatus status = IncidentStatus.OPEN;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private IncidentPriority priority = IncidentPriority.MEDIUM;

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private IncidentCategory category = IncidentCategory.GENERAL;

    @Builder.Default
    private Integer progress = 0;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;

    @Builder.Default
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "incident_assignees",
            joinColumns = @JoinColumn(name = "incident_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> assignees = new HashSet<>();

    @Column(name = "due_at")
    private LocalDate dueAt;

    @Column(name = "resolved_at")
    private Instant resolvedAt;

    @Column(name = "deleted_at")
    private Instant deletedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = Instant.now();
        if (status == IncidentStatus.RESOLVED && resolvedAt == null) {
            resolvedAt = Instant.now();
        }
    }

    public boolean isDeleted() {
        return deletedAt != null;
    }
}