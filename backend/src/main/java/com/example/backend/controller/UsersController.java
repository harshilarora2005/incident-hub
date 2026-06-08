package com.example.backend.controller;

import com.example.backend.entity.Role;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<Void> updateRole(@PathVariable Long id, @RequestParam Role role) {
        userService.updateRole(id, role);
        return ResponseEntity.noContent().build();
    }
}
