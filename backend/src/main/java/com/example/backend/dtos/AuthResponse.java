package com.example.backend.dtos;

import com.example.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Set;

@Data
@AllArgsConstructor
public class AuthResponse {
    Long userId;
    private String name;
    private String email;
    Set<Role> roles;
    private String avatarUrl;
}