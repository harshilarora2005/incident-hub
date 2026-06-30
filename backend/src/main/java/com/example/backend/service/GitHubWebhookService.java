package com.example.backend.service;

import com.example.backend.dtos.GitHubRecords.*;
import com.example.backend.entity.AuditAction;
import com.example.backend.entity.Incident;
import com.example.backend.entity.User;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.utils.IncidentRefUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class GitHubWebhookService {

    private final IncidentRepository incidentRepository;
    private final AuditService auditService;
    private final NotificationService notificationService;

    @Transactional
    public void handlePush(PushPayload payload) {
        Long incidentId = IncidentRefUtils.extractFromBranch(payload.ref());
        Incident incident = incidentId != null ? findIncident(incidentId) : null;
        if (incident == null) return;

        String pusherName = payload.pusher() != null ? payload.pusher().name() : "Someone";
        int commitCount = payload.commits() != null ? payload.commits().size() : 0;
        if (commitCount == 0) return;

        String summary = pusherName + " pushed " + commitCount +
                (commitCount == 1 ? " commit" : " commits");

        auditService.log(
                incident.getId(), incident.getTitle(), systemActor(incident),
                AuditAction.GITHUB_PUSH, null, summary
        );

        notifyWatchers(incident, "GitHub activity", summary + " to " + incident.getTitle());
    }

    @Transactional
    public void handlePullRequest(PullRequestPayload payload) {
        var pr = payload.pullRequest();
        if (pr == null) return;

        Long incidentId = IncidentRefUtils.extractIncidentId(pr.title(), pr.body());
        Incident incident = incidentId != null ? findIncident(incidentId) : null;
        if (incident == null) return;

        String author = pr.user() != null ? pr.user().login() : "Someone";
        AuditAction action;
        String summary;

        switch (payload.action()) {
            case "opened" -> {
                action = AuditAction.GITHUB_PR_OPENED;
                summary = author + " opened PR #" + pr.number() + ": " + pr.title();
            }
            case "closed" -> {
                boolean merged = Boolean.TRUE.equals(pr.merged());
                action = merged ? AuditAction.GITHUB_PR_MERGED : AuditAction.GITHUB_PR_CLOSED;
                summary = (merged ? "Merged PR #" : "Closed PR #") + pr.number() + ": " + pr.title();
            }
            default -> {
                return;
            }
        }

        auditService.log(incident.getId(), incident.getTitle(), systemActor(incident),
                action, null, pr.htmlUrl());

        notifyWatchers(incident, "GitHub activity", summary);
    }

    private Incident findIncident(Long id) {
        return incidentRepository.findById(id).orElse(null);
    }

    private User systemActor(Incident incident) {
        return incident.getReporter();
    }

    private void notifyWatchers(Incident incident, String title, String message) {
        Set<User> recipients = new HashSet<>(incident.getAssignees());
        recipients.add(incident.getReporter());
        recipients.forEach(user ->
                notificationService.send(title, message, incident.getId(), user, incident.getReporter())
        );
    }
}