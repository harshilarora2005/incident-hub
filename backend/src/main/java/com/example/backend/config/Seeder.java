package com.example.backend.config;

import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {
    private final UserRepository users;
    private final PasswordEncoder enc;
    @Value("${app.admin.email}") String email;
    @Value("${app.admin.password}") String password;
    @Value("${app.admin.name}") String name;
    @Override
    public void run(String... args) throws Exception {
        if (users.findByEmail(email).isPresent()) {
            return;
        }
        users.save(User.builder()
                .email(email).name(name).passwordHash(enc.encode(password))
                .roles(new HashSet<>(Set.of(Role.ADMIN, Role.MANAGER, Role.ENGINEER)))
                .build());
        System.out.println("[Seeder] admin user created: " + email);
    }
}
