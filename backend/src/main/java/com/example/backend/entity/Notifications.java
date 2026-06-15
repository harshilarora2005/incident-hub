package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notifications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String message;

    private boolean isRead;

    private Instant createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    private User recipient;

    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;

    private Long incidentId;
}
