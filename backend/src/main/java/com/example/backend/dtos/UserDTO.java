package com.example.backend.dtos;

import com.example.backend.entity.Role;
import lombok.Data;

import java.time.Instant;
import java.util.Set;

@Data
public class UserDTO {
    private Long id;
    private String name;
    private String email;
    private String avatarUrl;
    private Set<Role> roles;
    private Instant createdAt;
}