package com.example.backend.dtos;

import java.time.Instant;

public class NotificationRecords {
    public record EmailContent(String recipient, String msgBody, String subject) {
    }
    public record NotificationDTO(
            Long id,
            String title,
            String message,
            boolean isRead,
            Instant createdAt,
            Long incidentId,
            String senderName,
            String senderAvatar
    ) {}
}
