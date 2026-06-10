package com.example.backend.controller;

import com.example.backend.dtos.AuthResponse;
import com.example.backend.dtos.CreateRequest;
import com.example.backend.dtos.IncidentDetails;
import com.example.backend.service.AuthService;
import com.example.backend.service.IncidentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
public class IncidentController {
    private final IncidentService service;
    private final CurrentUser user;
    private final AuthService authService;

    @GetMapping
    public List<IncidentDetails> list(){
        return service.findAll();
    }
    @PostMapping
    public IncidentDetails create(@Valid @RequestBody CreateRequest req) {
        return service.create(req,user.get());
    }
    @GetMapping("/{id}")
    public IncidentDetails findById(@PathVariable Long id){
        return service.findById(id);
    }
    @GetMapping("/my")
    public List<IncidentDetails> listMy(Authentication authentication){
        AuthResponse au = authService.getCurrentUser(authentication);
        return service.getIncidentsForUser(au.getUserId());
    }

}
