package com.example.backend.dtos;

import java.time.Instant;

public class NotificationRecords {
    public record EmailContent(String recipient, String msgBody, String subject) {
    }
    public record NotificationDTO(
            Long id,
            String title,
            String message,
            Long incidentId,
            Long senderId,
            String senderName,
            boolean isRead,
            Instant createdAt
    ) {}
}
