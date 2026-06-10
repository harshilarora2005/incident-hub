package com.example.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class CloudinaryService {
    private final Cloudinary cloudinary;
    public String uploadAvatar(MultipartFile file, Long Id) {
        try{
            Map<?, ?> uploadResult = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "incident-management/avatars",
                            "public_id", "user_" + Id.toString(),
                            "overwrite", true,
                            "invalidate", true
                    )
            );
            return result.get("secure_url").toString();
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image");
        }
    }
}
