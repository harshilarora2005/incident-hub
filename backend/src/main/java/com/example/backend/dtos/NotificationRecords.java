package com.example.backend.dtos;

public class NotificationRecords {
    public record EmailContent(String recipient, String msgBody, String subject) {}


}
