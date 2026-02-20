package me.thilinajayamal.login.mapper;

import me.thilinajayamal.login.dto.UserResponse;
import me.thilinajayamal.login.model.UserModel;

public class UserMapper {

    public static UserResponse toUserResponse(UserModel user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getName(),
                user.getRole()
        );
    }
}