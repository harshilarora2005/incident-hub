package com.example.backend.service;

import com.example.backend.entity.AppUserDetails;
import com.example.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class AppUserDetailsService implements UserDetailsService {
    private final UserRepository users;
    @Override public UserDetails loadUserByUsername(String email) {
        return users.findByEmail(email).map(AppUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
