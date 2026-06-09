package com.example.backend.controller;

import com.example.backend.dtos.EmailContent;
import com.example.backend.service.EmailService;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/emails")
@RequiredArgsConstructor
public class EmailController {
    private final EmailService emailService;
    @PostMapping("/simple")
    public ResponseEntity<Void> sendSimpleEmail(@RequestBody EmailContent email) {
        try {
            emailService.sendEmail(email.getRecipient(), email.getSubject(), email.getMsgBody());
        }catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}
