package com.example.backend.service;

import com.example.backend.config.JwtUtil;
import com.example.backend.dtos.AuthResponse;
import com.example.backend.dtos.LoginRequest;
import com.example.backend.dtos.RegisterRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder enc;
    private final JwtUtil jwt;
    private final AuthenticationManager am;

    public AuthResponse register(RegisterRequest r, HttpServletResponse response) {
        if (userRepo.existsByEmail(r.getEmail())) {
            throw new CustomExceptionHandler("Email already exists");
        }
        User user = User.builder()
                .email(r.getEmail())
                .name(r.getName())
                .passwordHash(enc.encode(r.getPassword()))
                .roles(new java.util.HashSet<>(Set.of(Role.ENGINEER)))
                .build();
        userRepo.save(user);
        return createAuthResponse(user, response);
    }
    public AuthResponse login(LoginRequest r, HttpServletResponse response) {
        User user = userRepo.findByEmail(r.getEmail())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password"));
        if (!enc.matches(r.getPassword(), user.getPasswordHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid email or password");
        }
        return createAuthResponse(user, response);
    }

    private AuthResponse createAuthResponse(User user, HttpServletResponse response) {
        Set<String> roleNames = user.getRoles().stream().map(Enum::name).collect(Collectors.toSet());
        String token = jwt.generateToken(user.getId(), user.getEmail(), roleNames);
        ResponseCookie cookie = ResponseCookie
                .from("access_token", token)
                .httpOnly(true)
                .secure(false) // change to true in production (HTTPS)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return new AuthResponse(user.getId(), user.getEmail(), user.getName(), user.getRoles());
    }

}