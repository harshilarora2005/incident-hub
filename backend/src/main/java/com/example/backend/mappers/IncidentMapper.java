package com.example.backend.mappers;

import com.example.backend.dtos.IncidentDetails;
import com.example.backend.entity.Incident;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface IncidentMapper {

    IncidentDetails toDto(Incident incident);

    Incident toEntity(IncidentDetails incidentDetails);
}
