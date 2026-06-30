package com.example.backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class GitHubRecords {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PushPayload(
            String ref,
            List<Commit> commits,
            Repository repository,
            Pusher pusher
    ) {
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Commit(String id, String message, String url) {}
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record Pusher(String name) {}
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record PullRequestPayload(
            String action, // opened, closed, reopened, edited...
            @JsonProperty("pull_request") PullRequest pullRequest,
            Repository repository
    ) {
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record PullRequest(
                Long number,
                String title,
                String body,
                @JsonProperty("html_url") String htmlUrl,
                Boolean merged,
                User user
        ) {}
        @JsonIgnoreProperties(ignoreUnknown = true)
        public record User(String login) {}
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Repository(@JsonProperty("full_name") String fullName) {}
}