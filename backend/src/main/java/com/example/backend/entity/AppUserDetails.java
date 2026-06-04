package com.example.backend.entity;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.stream.Collectors;

@Getter
public class AppUserDetails implements UserDetails {
    private final User user;
    public AppUserDetails(User user) {
        this.user = user;
    }
    public Long getId() {
        return user.getId();
    }
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return user.getRoles().stream().map(r ->
                new SimpleGrantedAuthority("ROLE_" + r.name())).collect(Collectors.toList());
    }
    @Override
    public String getPassword() {
        return user.getPasswordHash();
    }

    @Override
    public String getUsername() {
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
