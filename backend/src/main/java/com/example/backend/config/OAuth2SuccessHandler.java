package com.example.backend.config;

import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.EmailService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepo;
    private final JwtUtil jwt;
    private final EmailService es;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");
        User user = userRepo.findByEmail(email)
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .email(email)
                            .name(name)
                            .roles(new HashSet<>(Set.of(Role.ENGINEER)))
                            .build();
                    try {
                        es.sendWelcomeEmail(email, name);
                    } catch (Exception e) {
                        System.err.println("Welcome email failed: " + e.getMessage());
                    }
                    return userRepo.save(newUser);
                });
        String token = jwt.generateToken(
                user.getId(),
                user.getEmail(),
                Set.of("ENGINEER")
        );

        ResponseCookie cookie = ResponseCookie.from("access_token", token)
                        .httpOnly(true)
                        .path("/")
                        .sameSite("Lax")
                        .build();

        response.addHeader(
                HttpHeaders.SET_COOKIE,
                cookie.toString()
        );

        response.sendRedirect("http://localhost:5173");
    }
}