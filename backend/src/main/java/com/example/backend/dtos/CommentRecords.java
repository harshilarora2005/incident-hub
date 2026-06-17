package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;
import java.time.Instant;

public class CommentRecords {
    public record CommentRequest(
            @NotBlank String content,
            String attachmentUrl,
            String attachmentName
    ) {}
    public record CommentResponse(
            Long id,
            Long incidentId,
            Long authorId,
            String authorName,
            String authorAvatar,
            String content,
            String attachmentUrl,
            String attachmentName,
            Instant createdAt,
            Instant updatedAt
    ) {}
}