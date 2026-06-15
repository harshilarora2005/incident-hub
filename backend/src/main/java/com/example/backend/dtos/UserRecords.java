package com.example.backend.dtos;

public class UserRecords {
    public record UpdateNameRequest(String newName) {}
    public record EmailContent(String recipient, String msgBody, String subject) {}
}