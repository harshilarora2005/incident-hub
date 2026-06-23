package com.example.backend.utils;

import java.util.*;
import java.util.regex.*;

public final class MentionUtils {

    private MentionUtils() {}
    private static final Pattern MENTION_PATTERN =
            Pattern.compile("@\\[(\\d+):([^\\]]+)]");

    public static Set<Long> extractMentionedIds(String content) {
        if (content == null || content.isBlank()) return Set.of();
        Set<Long> ids = new LinkedHashSet<>();
        Matcher m = MENTION_PATTERN.matcher(content);
        while (m.find()) {
            ids.add(Long.parseLong(m.group(1)));
        }
        return Collections.unmodifiableSet(ids);
    }

    public static String toPlainText(String content) {
        if (content == null) return "";
        return MENTION_PATTERN.matcher(content).replaceAll("@$2");
    }

    public static String mentionToken(Long userId, String displayName) {
        return "@[" + userId + ":" + displayName + "]";
    }
}