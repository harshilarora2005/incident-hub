package com.example.backend.service;

import com.example.backend.dtos.CommentRecords.*;
import com.example.backend.entity.*;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.CommentMapper;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.utils.MentionUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final IncidentRepository incidentRepository;
    private final CommentMapper commentMapper;
    private final NotificationService notificationService;

    @Transactional(readOnly = true)
    public List<CommentResponse> getComments(Long incidentId) {
        findIncident(incidentId);
        return commentRepository.findByIncidentIdOrderByCreatedAtAsc(incidentId)
                .stream()
                .map(commentMapper::toDto)
                .toList();
    }

    @Transactional
    public CommentResponse addComment(Long incidentId, CommentRequest request, User currentUser) {
        Incident incident = findIncident(incidentId);
        assertCanComment(incident, currentUser);

        Comment comment = Comment.builder()
                .incident(incident)
                .author(currentUser)
                .content(request.content())
                .attachmentUrl(request.attachmentUrl())
                .attachmentName(request.attachmentName())
                .build();

        CommentResponse response = commentMapper.toDto(commentRepository.save(comment));
        notificationService.broadcast(incidentId, "CREATED", response);
        sendMentionNotifications(request.content(), incident, currentUser);
        return response;
    }

    @Transactional
    public CommentResponse editComment(Long incidentId, Long commentId, CommentRequest request, User currentUser) {
        Comment comment = findComment(commentId, incidentId);

        if (!comment.getAuthor().getId().equals(currentUser.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You can only edit your own comments");
        }

        comment.setContent(request.content());
        if (request.attachmentUrl()  != null) comment.setAttachmentUrl(request.attachmentUrl());
        if (request.attachmentName() != null) comment.setAttachmentName(request.attachmentName());

        CommentResponse response = commentMapper.toDto(commentRepository.save(comment));
        notificationService.broadcast(incidentId, "UPDATED", response);
        return response;
    }

    @Transactional
    public void deleteComment(Long incidentId, Long commentId, User currentUser) {
        Comment comment = findComment(commentId, incidentId);

        boolean isAuthor = comment.getAuthor().getId().equals(currentUser.getId());
        boolean isAdmin  = currentUser.getRoles().contains(Role.ADMIN);

        if (!isAuthor && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not allowed to delete this comment");
        }

        CommentResponse response = commentMapper.toDto(comment);
        commentRepository.delete(comment);
        notificationService.broadcast(incidentId, "DELETED", response);
    }

    private void sendMentionNotifications(String content, Incident incident, User sender) {
        Set<Long> mentionedIds = MentionUtils.extractMentionedIds(content);
        if (mentionedIds.isEmpty()) return;

        Map<Long, User> eligibleById = new HashMap<>();
        eligibleById.put(incident.getReporter().getId(), incident.getReporter());
        incident.getAssignees().forEach(a -> eligibleById.put(a.getId(), a));

        String plainContent = MentionUtils.toPlainText(content);

        mentionedIds.forEach(userId -> {
            User mentioned = eligibleById.get(userId);
            if (mentioned == null) return;
            if (mentioned.getId().equals(sender.getId())) return;

            notificationService.send(
                    sender.getName() + " mentioned you",
                    sender.getName() + " mentioned you in a comment: \"" + truncate(plainContent) + "\"",
                    incident.getId(),
                    mentioned,
                    sender
            );
        });
    }

    private Incident findIncident(Long incidentId) {
        return incidentRepository.findById(incidentId)
                .orElseThrow(() -> new CustomExceptionHandler("Incident not found: " + incidentId));
    }

    private Comment findComment(Long commentId, Long incidentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CustomExceptionHandler("Comment not found: " + commentId));
        if (!comment.getIncident().getId().equals(incidentId)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Comment does not belong to this incident");
        }
        return comment;
    }

    private void assertCanComment(Incident incident, User user) {
        boolean isAssignee = incident.getAssignees().stream()
                .anyMatch(a -> a.getId().equals(user.getId()));
        boolean isReporter = incident.getReporter().getId().equals(user.getId());
        boolean isAdmin    = user.getRoles().contains(Role.ADMIN);

        if (!isAssignee && !isReporter && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only assignees, the reporter, or admins can comment on this incident");
        }
    }

    private static String truncate(String s) {
        return s.length() <= 80 ? s : s.substring(0, 80) + "…";
    }
}