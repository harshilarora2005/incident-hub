package com.example.backend.dtos;

import com.example.backend.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UserRecords {
    public record UpdateNameRequest(String newName) {}

    public record InviteRequest(
            @NotBlank String name,
            @Email @NotBlank String email,
            @NotNull Role role
    ) {}
}