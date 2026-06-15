package com.example.backend.dtos;

import com.example.backend.entity.Role;
import jakarta.validation.constraints.*;
import java.util.Set;

public class AuthRecords {
    public record LoginRequest(
            @NotBlank @Email String email,
            @NotBlank String password
    ) {}
    public record RegisterRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @NotBlank @Size(min = 8) String password
    ) {}
    public record AuthResponse(
            Long userId,
            String name,
            String email,
            Set<Role> roles,
            String avatarUrl
    ) {}
}