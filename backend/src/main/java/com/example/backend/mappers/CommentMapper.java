package com.example.backend.mappers;

import com.example.backend.dtos.CommentRecords.CommentResponse;
import com.example.backend.entity.Comment;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface CommentMapper {

    @Mapping(target = "incidentId",   source = "incident.id")
    @Mapping(target = "authorId",     source = "author.id")
    @Mapping(target = "authorName",   source = "author.name")
    @Mapping(target = "authorAvatar", source = "author.avatarUrl")
    CommentResponse toDto(Comment comment);
}