package com.example.backend.mappers;


import com.example.backend.dtos.UserDTO;
import com.example.backend.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toDto(User u);
    User toEntity(UserDTO ud);
}

