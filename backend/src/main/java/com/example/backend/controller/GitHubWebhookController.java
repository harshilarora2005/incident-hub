package com.example.backend.controller;

import com.example.backend.dtos.GitHubRecords.*;
import com.example.backend.service.GitHubWebhookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

@Slf4j
@RestController
@RequestMapping("/api/webhooks/github")
@RequiredArgsConstructor
public class GitHubWebhookController {

    private final GitHubWebhookService webhookService;
    private final ObjectMapper objectMapper;

    @Value("${github.webhook.secret}")
    private String webhookSecret;

    @PostConstruct
    public void debugSecret() {
        log.info("Webhook secret loaded, length={}", webhookSecret.length());
    }

    @PostMapping
    public ResponseEntity<Void> handle(
            @RequestBody String rawBody,
            @RequestHeader("X-Hub-Signature-256") String signature,
            @RequestHeader("X-GitHub-Event") String eventType,
            HttpServletRequest request
    ) throws Exception {
        if (!isValidSignature(rawBody, signature)) {
            log.warn("Invalid GitHub webhook signature from {}", request.getRemoteAddr());
            return ResponseEntity.status(401).build();
        }

        switch (eventType) {
            case "push" -> webhookService.handlePush(
                    objectMapper.readValue(rawBody, PushPayload.class));
            case "pull_request" -> webhookService.handlePullRequest(
                    objectMapper.readValue(rawBody, PullRequestPayload.class));
            default -> log.debug("Ignoring unhandled GitHub event: {}", eventType);
        }

        return ResponseEntity.ok().build();
    }

    private boolean isValidSignature(String payload, String signatureHeader) throws Exception {
        if (signatureHeader == null || !signatureHeader.startsWith("sha256=")) return false;

        Mac mac = Mac.getInstance("HmacSHA256");
        mac.init(new SecretKeySpec(webhookSecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256"));
        byte[] hash = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

        String computed = "sha256=" + bytesToHex(hash);
        return MessageDigest.isEqual(
                computed.getBytes(StandardCharsets.UTF_8),
                signatureHeader.getBytes(StandardCharsets.UTF_8)
        );
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder sb = new StringBuilder();
        for (byte b : bytes) sb.append(String.format("%02x", b));
        return sb.toString();
    }
}