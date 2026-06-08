package com.example.backend.service;

import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepo;
    @Transactional
    public void updateRole(Long userId, Role role) {
        User user = userRepo.findById(userId).orElseThrow(() ->
                        new CustomExceptionHandler("User not found"));
        user.setRoles(Set.of(role));
        userRepo.save(user);
    }
}
