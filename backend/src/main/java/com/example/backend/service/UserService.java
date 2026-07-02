package com.example.backend.service;

import com.example.backend.dtos.UserDTO;
import com.example.backend.dtos.UserRecords.InviteRequest;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.UserMapper;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CloudinaryService cloudinaryService;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    private static final String DEFAULT_PASSWORD = "Welcome@123";

    @Transactional
    public void updateRole(Long userId, Role role) {
        User user = findUserById(userId);
        user.getRoles().add(role);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return userRepository.findAll().stream()
                .map(userMapper::toDto)
                .toList();
    }

    @Transactional
    public UserDTO inviteUser(InviteRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "A user with this email already exists");
        }

        User user = User.builder()
                .name(request.name())
                .email(request.email())
                .passwordHash(passwordEncoder.encode(DEFAULT_PASSWORD))
                .roles(new HashSet<>(Set.of(request.role())))
                .build();

        User saved = userRepository.save(user);

        try {
            emailService.sendInviteEmail(saved.getEmail(), saved.getName(), DEFAULT_PASSWORD);
        } catch (Exception e) {
            System.err.println("Invite email failed for " + saved.getEmail() + ": " + e.getMessage());
        }

        return userMapper.toDto(saved);
    }

    @Transactional
    public UserDTO updateDisplayName(Long userId, String newName) {
        User user = findUserById(userId);
        user.setName(newName);
        return userMapper.toDto(user);
    }

    @Transactional
    public UserDTO uploadAvatar(Long userId, MultipartFile file) {
        User user = findUserById(userId);
        user.setAvatarUrl(cloudinaryService.uploadAvatar(file, userId));
        return userMapper.toDto(user);
    }

    private User findUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new CustomExceptionHandler("User not found"));
    }
}