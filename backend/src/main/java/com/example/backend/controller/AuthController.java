package com.example.backend.controller;

import com.example.backend.dtos.AppUserDetails;
import com.example.backend.dtos.AuthRecords.*;
import com.example.backend.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authService.register(request, response));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request, HttpServletResponse response) {
        return ResponseEntity.ok(authService.login(request, response));
    }
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> me(@AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(new AuthResponse(
                userDetails.getId(),
                userDetails.getName(),
                userDetails.getEmail(),
                userDetails.getRoles(),
                userDetails.getAvatarUrl()
        ));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        authService.logout(response);
        return ResponseEntity.noContent().build();
    }
}