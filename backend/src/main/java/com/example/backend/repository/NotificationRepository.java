package com.example.backend.repository;

import com.example.backend.entity.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
}
