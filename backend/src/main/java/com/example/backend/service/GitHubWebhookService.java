package com.example.backend.service;

import com.example.backend.dtos.GitHubRecords.*;
import com.example.backend.entity.AuditAction;
import com.example.backend.entity.Incident;
import com.example.backend.entity.User;
import com.example.backend.repository.IncidentRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.IncidentRefUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GitHubWebhookService {

    private static final String URL_MARKER = "__url__:";

    private final IncidentRepository incidentRepository;
    private final UserRepository userRepository;
    private final AuditService auditService;
    private final NotificationService notificationService;

    @Value("${app.github-bot.email}")
    private String botEmail;

    private User botUser;

    @PostConstruct
    private void loadBotUser() {
        botUser = userRepository.findByEmail(botEmail)
                .orElseThrow(() -> new IllegalStateException(
                        "GitHub bot user not seeded — check Seeder ran with app.github-bot.email=" + botEmail));
        log.info("GitHub bot user loaded: id={}, email={}", botUser.getId(), botUser.getEmail());
    }
    @Transactional
    public void handlePush(PushPayload payload) {
        Long incidentId = IncidentRefUtils.extractFromBranch(payload.ref());
        Incident incident = incidentId != null ? findIncident(incidentId) : null;
        if (incident == null) return;

        String pusherName = payload.pusher() != null ? payload.pusher().name() : "Someone";
        List<PushPayload.Commit> commits = payload.commits() != null ? payload.commits() : List.of();
        if (commits.isEmpty()) return;

        String branch = payload.ref().replace("refs/heads/", "");

        String commitLines = commits.stream()
                .limit(3)
                .map(c -> "• " + shortSha(c.id()) + " " + firstLine(c.message()))
                .collect(Collectors.joining("\n"));

        if (commits.size() > 3) {
            commitLines += "\n…and " + (commits.size() - 3) + " more";
        }

        String summary = pusherName + " pushed " + commits.size() +
                (commits.size() == 1 ? " commit" : " commits") + " to " + branch;

        String latestUrl = commits.get(commits.size() - 1).url();
        String detail = summary + "\n" + commitLines +
                (latestUrl != null ? "\n" + URL_MARKER + latestUrl : "");

        auditService.log(incident.getId(), incident.getTitle(), botUser,
                AuditAction.GITHUB_PUSH, branch, detail);

        notifyWatchers(incident, "GitHub activity", summary);
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
            default -> { return; }
        }

        String bodyPreview = pr.body() != null && !pr.body().isBlank()
                ? "\n" + firstLine(pr.body().strip())
                : "";

        String detail = summary + bodyPreview +
                (pr.htmlUrl() != null ? "\n" + URL_MARKER + pr.htmlUrl() : "");

        auditService.log(incident.getId(), incident.getTitle(), botUser,
                action, null, detail);

        notifyWatchers(incident, "GitHub activity", summary);
    }

    private Incident findIncident(Long id) {
        return incidentRepository.findById(id).orElse(null);
    }

    private void notifyWatchers(Incident incident, String title, String message) {
        Set<User> recipients = new HashSet<>(incident.getAssignees());
        recipients.add(incident.getReporter());
        recipients.forEach(user ->
                notificationService.send(title, message, incident.getId(), user, botUser)
        );
    }

    private String shortSha(String sha) {
        return sha != null && sha.length() >= 7 ? sha.substring(0, 7) : sha;
    }

    private String firstLine(String message) {
        if (message == null) return "";
        int idx = message.indexOf('\n');
        return idx > 0 ? message.substring(0, idx) : message;
    }
}