package com.example.backend.controller;

import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService auth;
    @PostMapping
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest r) {
        return auth.register(r);
    }
}
