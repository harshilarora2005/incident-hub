package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dtos.AuthResponse;
import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepo;
    private final PasswordEncoder enc;
    private final JwtUtil jwt;
    private final AuthenticationManager am;
    public AuthResponse register(RegisterRequest r) {
        if(userRepo.existsByEmail(r.getEmail())) {
            throw new IllegalArgumentException("Email already registered: " + r.getEmail());
        }
        User u = User.builder().email(r.getEmail()).name(r.getName()).passwordHash(enc.encode(r.getPassword()))
                .roles(new java.util.HashSet<>(Set.of(Role.ENGINEER))).build();
        userRepo.save(u);
        return tokenFor(u);
    }

    public AuthResponse login(LoginRequest r) {
        System.out.println("Login attempt for email: " + r.getEmail());
        User u = userRepo.findByEmail(r.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found: " + r.getEmail()));
        System.out.println("User found for email: " + r.getEmail());
        if(!enc.matches(r.getPassword(),u.getPasswordHash())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return tokenFor(u);
    }
    private AuthResponse tokenFor(User u) {
        Set<String> roleNames = u.getRoles().stream().map(Enum::name).collect(Collectors.toSet());
        String token = jwt.generateToken(u.getId(), u.getEmail(), roleNames);
        return new AuthResponse(token, u.getId(), u.getEmail(), u.getName(), u.getRoles());
    }
}
