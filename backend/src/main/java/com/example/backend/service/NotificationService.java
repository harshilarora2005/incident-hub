package com.example.backend.service;

import com.example.backend.dtos.NotificationRecords.NotificationDTO;
import com.example.backend.entity.Incident;
import com.example.backend.entity.Notifications;
import com.example.backend.entity.User;
import com.example.backend.repository.NotificationRepository;
import com.example.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;
    private final UserRepository users;
    private final NotificationRepository notifications;

    @Transactional
    public void notifyAllUsers(User sender, Incident incident) {
        List<User> recipients = users.findAll();
        for (User recipient : recipients) {
            Notifications notification =
                    Notifications.builder()
                            .title("New Incident")
                            .message(
                                    sender.getName()
                                            + " created "
                                            + incident.getTitle()
                            )
                            .sender(sender)
                            .recipient(recipient)
                            .incidentId(incident.getId())
                            .createdAt(Instant.now())
                            .isRead(false)
                            .build();

            notifications.save(notification);

            NotificationDTO dto = new NotificationDTO(
                    notification.getId(),
                    notification.getTitle(),
                    notification.getMessage(),
                    incident.getId(),
                    sender.getId(),
                    sender.getName(),
                    notification.isRead(),
                    notification.getCreatedAt()
            );

            messagingTemplate.convertAndSend(
                    "/topic/notifications",
                    dto
            );
        }
    }
}