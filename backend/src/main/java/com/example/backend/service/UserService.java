package com.example.backend.service;

import com.cloudinary.Cloudinary;
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
import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepo;
    private final UserMapper mapper;
    private final CloudinaryService service;
    @Transactional
    public void updateRole(Long userId, Role role) {
        User user = userRepo.findById(userId).orElseThrow(() ->
                        new CustomExceptionHandler("User not found"));
        user.getRoles().add(role);
        userRepo.save(user);
    }

    @Transactional(readOnly = true)
    public List<UserDTO> findAll() {
        return userRepo.findAll()
                .stream()
                .map(mapper::toDto)
                .toList();
    }
    @Transactional
    public UserDTO uploadAvatar(MultipartFile file, User currentUser) {
        String avatarUrl = service.uploadAvatar(file);
        currentUser.setAvatarUrl(avatarUrl);
        userRepo.save(currentUser);
        return mapper.toDto(currentUser);
    }
}
