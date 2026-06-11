package com.example.backend.controller;

import com.example.backend.dtos.AuthResponse;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;
    private final AuthService authService;
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<Void> updateRole(@PathVariable Long id, @RequestParam Role role) {
        userService.updateRole(id, role);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAll();
    }
    @PatchMapping("/me/avatar")
    public ResponseEntity<UserDTO> uploadAvatar(@RequestParam("file") MultipartFile file, Authentication authentication) {
        AuthResponse au = authService.getCurrentUser(authentication);
        return ResponseEntity.ok(userService.uploadAvatar(file, au));
    }
}
