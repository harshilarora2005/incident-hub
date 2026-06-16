package com.example.backend.controller;

import com.example.backend.dtos.NotificationRecords.NotificationDTO;
import com.example.backend.dtos.AppUserDetails;
import com.example.backend.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping
    public ResponseEntity<List<NotificationDTO>> getAll(@AuthenticationPrincipal AppUserDetails userDetails) {
        System.out.println(userDetails.getId());
        return ResponseEntity.ok(notificationService.getForUser(userDetails.getId()));
    }

    @GetMapping("/unread-count")
    public ResponseEntity<Long> unreadCount(@AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(notificationService.getUnreadCount(userDetails.getId()));
    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationDTO> markRead(@PathVariable Long id, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(notificationService.markRead(id, userDetails.getId()));
    }

    @PatchMapping("/read-all")
    public ResponseEntity<Void> markAllRead(@AuthenticationPrincipal AppUserDetails userDetails) {
        notificationService.markAllRead(userDetails.getId());
        return ResponseEntity.noContent().build();
    }
}