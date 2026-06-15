package com.example.backend.mappers;

import com.example.backend.dtos.IncidentRecords.*;
import com.example.backend.entity.Incident;
import org.mapstruct.*;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface IncidentMapper {

    IncidentDetails toDto(Incident incident);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateIncidentFromRequest(UpdateRequest request, @MappingTarget Incident incident);
}