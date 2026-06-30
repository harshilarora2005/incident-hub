package com.example.backend.utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class IncidentRefUtils {
    private static final Pattern INCIDENT_REF =
            Pattern.compile("(?:incident|inc)[-\\s]?#?(\\d+)", Pattern.CASE_INSENSITIVE);

    public static Long extractIncidentId(String... texts) {
        for (String text : texts) {
            if (text == null || text.isBlank()) continue;
            Matcher m = INCIDENT_REF.matcher(text);
            if (m.find()) {
                return Long.parseLong(m.group(1));
            }
        }
        return null;
    }

    public static Long extractFromBranch(String ref) {
        if (ref == null) return null;
        String branch = ref.replace("refs/heads/", "");
        return extractIncidentId(branch);
    }
}