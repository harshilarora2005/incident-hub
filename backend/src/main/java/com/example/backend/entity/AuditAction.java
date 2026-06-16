package com.example.backend.entity;

public enum AuditAction {
    CREATED,
    DELETED,
    STATUS_CHANGED,
    PRIORITY_CHANGED,
    TITLE_CHANGED,
    DESCRIPTION_CHANGED,
    CATEGORY_CHANGED,
    DUE_DATE_CHANGED,
    ASSIGNEE_ADDED,
    ASSIGNEE_REMOVED
}
