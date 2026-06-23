package com.example.backend.controller;

import com.example.backend.dtos.AppUserDetails;
import com.example.backend.entity.Role;
import com.example.backend.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.example.backend.dtos.CommentRecords.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/incidents/{incidentId}/comments")
public class CommentController {
    private final CommentService commentService;

    @GetMapping
    public ResponseEntity<List<CommentResponse>> list(@PathVariable Long incidentId) {
        return ResponseEntity.ok(commentService.getComments(incidentId));
    }
    @PostMapping
    public ResponseEntity<CommentResponse> create(@PathVariable Long incidentId,
                                                  @Valid @RequestBody CommentRequest request,
                                                  @AuthenticationPrincipal AppUserDetails userDetails) {
        return ResponseEntity.ok(commentService.addComment(incidentId, request, userDetails.getUser()));
    }
    @PutMapping("/{commentId}")
    public ResponseEntity<CommentResponse> edit(
            @PathVariable Long incidentId,
            @PathVariable Long commentId,
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal AppUserDetails userDetails
    ) {
        return ResponseEntity.ok(commentService.editComment(incidentId, commentId, request, userDetails.getUser()));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long incidentId,
            @PathVariable Long commentId,
            @AuthenticationPrincipal AppUserDetails userDetails
    ) {
        commentService.deleteComment(incidentId, commentId, userDetails.getUser());
        return ResponseEntity.noContent().build();
    }
}
