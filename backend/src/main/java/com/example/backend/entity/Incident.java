package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name="incidents")
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Incident {
        @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)
        private Long id;

        @Column(nullable=false)
        private String title;

        @Column(columnDefinition="TEXT")
        private String description;

        @Enumerated(EnumType.STRING)
        @Column(nullable=false)
        private IncidentStatus status = IncidentStatus.OPEN;

        @Enumerated(EnumType.STRING)
        @Column(nullable=false)
        private IncidentPriority priority = IncidentPriority.MEDIUM;

        @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="reporter_id", nullable=false)
        private User reporter;

        @ManyToOne(fetch=FetchType.LAZY) @JoinColumn(name="assignee_id")
        private User assignee;

        @Builder.Default
        @Column(name="created_at", nullable=false)
        private Instant createdAt = Instant.now();

        @Column(name="updated_at", nullable=false)
        private Instant updatedAt = Instant.now();

        @PreUpdate void touch() {
            this.updatedAt = Instant.now();
        }
}
