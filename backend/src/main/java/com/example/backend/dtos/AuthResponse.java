package com.example.backend.dtos;

import com.example.backend.entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.Set;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    Long userId;
    private String name;
    private String email;
    Set<Role> roles;
}