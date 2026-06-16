package com.example.backend.mappers;

import com.example.backend.dtos.AuditRecords.AuditLogDTO;
import com.example.backend.entity.AuditLog;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface AuditMapper {

    @Mapping(target = "changedByName",source = "changedBy.name")
    @Mapping(target = "changedByAvatar",source = "changedBy.avatarUrl")
    AuditLogDTO toDto(AuditLog log);
}