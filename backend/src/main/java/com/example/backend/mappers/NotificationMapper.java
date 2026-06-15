package com.example.backend.mappers;

import com.example.backend.dtos.NotificationRecords.NotificationDTO;
import com.example.backend.entity.Notifications;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface NotificationMapper {

    @Mapping(target = "senderName",source = "sender.name")
    @Mapping(target = "senderAvatar", source = "sender.avatarUrl")
    NotificationDTO toDto(Notifications notification);
}
