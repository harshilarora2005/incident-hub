package com.example.backend.service;

import com.example.backend.dtos.UserDTO;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.UserMapper;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final CloudinaryService cloudinaryService;

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