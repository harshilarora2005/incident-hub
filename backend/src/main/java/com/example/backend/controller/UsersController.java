package com.example.backend.controller;

import com.example.backend.dtos.AppUserDetails;
import com.example.backend.dtos.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.dtos.UserRecords.UpdateNameRequest;
import com.example.backend.dtos.AuthRecords.AuthResponse;
import com.example.backend.service.AuthService;
import com.example.backend.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UserService userService;
    private final AuthService authService;
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PatchMapping("/{id}/role")
    public ResponseEntity<Void> updateRole(@PathVariable Long id, @RequestParam Role role) {
        userService.updateRole(id, role);
        return ResponseEntity.noContent().build();
    }
    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.findAll();
    }
    @PatchMapping("/me/name")
    public ResponseEntity<UserDTO> updateUserName(@Valid @RequestBody UpdateNameRequest req, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(userService.updateDisplayName(userDetails.getId(),req.newName()));
    }

    @PatchMapping("/me/avatar")
    public ResponseEntity<UserDTO> uploadAvatar(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(userService.uploadAvatar(userDetails.getId(),file));
    }
}
