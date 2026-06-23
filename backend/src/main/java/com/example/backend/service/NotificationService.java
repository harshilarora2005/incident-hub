package com.example.backend.service;

import com.example.backend.dtos.CommentRecords;
import com.example.backend.dtos.NotificationRecords.NotificationDTO;
import com.example.backend.entity.Notifications;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.NotificationMapper;
import com.example.backend.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dtos.CommentRecords.CommentResponse;
import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Transactional(readOnly = true)
    public List<NotificationDTO> getForUser(Long recipientId) {
        List<Notifications> le = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(recipientId);
        return le.stream()
                .map(notificationMapper::toDto)
                .toList();
    }

    @Transactional(readOnly = true)
    public long getUnreadCount(Long recipientId) {
        return notificationRepository.countByRecipientIdAndIsReadFalse(recipientId);
    }

    @Transactional
    public NotificationDTO markRead(Long notificationId, Long recipientId) {
        Notifications notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new CustomExceptionHandler("Notification not found"));
        if (!notification.getRecipient().getId().equals(recipientId)) {
            throw new CustomExceptionHandler("Not your notification");
        }
        notification.setRead(true);
        notificationRepository.save(notification);
        return notificationMapper.toDto(notification);
    }

    @Transactional
    public void markAllRead(Long recipientId) {
        notificationRepository.markAllReadByRecipientId(recipientId);
    }

    public void broadcast(Long incidentId, String type, CommentResponse comment) {
        messagingTemplate.convertAndSend(
                "/topic/incidents/" + incidentId + "/comments",
                new CommentRecords.CommentEvent(type, comment)
        );
    }
    @Transactional
    public void send(String title, String message, Long incidentId, User recipient, User sender) {
        Notifications notification = Notifications.builder()
                .title(title)
                .message(message)
                .incidentId(incidentId)
                .recipient(recipient)
                .sender(sender)
                .isRead(false)
                .createdAt(Instant.now())
                .build();

        NotificationDTO dto = notificationMapper.toDto(notificationRepository.save(notification));
        messagingTemplate.convertAndSendToUser(
                String.valueOf(recipient.getId()),
                "/queue/notifications",
                dto
        );
    }
}