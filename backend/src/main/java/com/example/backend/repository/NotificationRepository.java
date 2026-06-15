package com.example.backend.repository;

import com.example.backend.entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {

    List<Notifications> findByRecipientIdOrderByCreatedAtDesc(Long recipientId);

    long countByRecipientIdAndIsReadFalse(Long recipientId);
    
    @Modifying
    @Query("UPDATE Notifications n SET n.isRead = true WHERE n.recipient.id = :recipientId AND n.isRead = false")
    void markAllReadByRecipientId(Long recipientId);
}