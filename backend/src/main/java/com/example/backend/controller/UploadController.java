package com.example.backend.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequestMapping("/api/upload")
@RequiredArgsConstructor
public class UploadController {
    private final Cloudinary cloudinary;
    @PostMapping("/attachment")
    public ResponseEntity<UploadResponse> uploadAttachment(@RequestParam("file") MultipartFile file) {
        try {
            Map<?, ?> result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "incident-management/attachments",
                            "resource_type", "auto"
                    )
            );
            String url= result.get("secure_url").toString();
            String originalName= file.getOriginalFilename();
            return ResponseEntity.ok(new UploadResponse(url, originalName));
        } catch (Exception e) {
            throw new RuntimeException("Upload failed: " + e.getMessage());
        }
    }

    public record UploadResponse(String url, String originalName) {}
}