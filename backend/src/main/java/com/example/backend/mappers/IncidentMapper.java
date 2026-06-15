package com.example.backend.mappers;

import com.example.backend.dtos.IncidentDetails;
import com.example.backend.dtos.UpdateRequest;
import com.example.backend.entity.Incident;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface IncidentMapper {

    IncidentDetails toDto(Incident incident);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateIncidentFromRequest(UpdateRequest request,
                                   @MappingTarget Incident incident);

    Incident toEntity(IncidentDetails incidentDetails);
}
