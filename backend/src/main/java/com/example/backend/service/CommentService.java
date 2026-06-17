package com.example.backend.service;

import com.example.backend.dtos.CommentRecords;
import com.example.backend.entity.Comment;
import com.example.backend.entity.Incident;
import com.example.backend.entity.Role;
import com.example.backend.entity.User;
import com.example.backend.exception.CustomExceptionHandler;
import com.example.backend.mappers.CommentMapper;
import com.example.backend.repository.CommentRepository;
import com.example.backend.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.dtos.CommentRecords.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final IncidentRepository incidentRepository;
    private final CommentMapper commentMapper;

    @Transactional(readOnly = true)
    public List<CommentRecords.CommentResponse> getComments(Long incidentId) {
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

        return commentMapper.toDto(commentRepository.save(comment));
    }
    
    private Incident findIncident(Long incidentId) {
        return incidentRepository.findById(incidentId)
                .orElseThrow(() -> new CustomExceptionHandler("Incident not found: " + incidentId));
    }
    private void assertCanComment(Incident incident, User user) {
        boolean isAssignee = incident.getAssignees().stream()
                .anyMatch(a -> a.getId().equals(user.getId()));
        boolean isReporter = incident.getReporter().getId().equals(user.getId());
        boolean isAdmin = user.getRoles().contains(Role.ADMIN);

        if (!isAssignee && !isReporter && !isAdmin) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only assignees, the reporter, or admins can comment on this incident");
        }
    }
}
