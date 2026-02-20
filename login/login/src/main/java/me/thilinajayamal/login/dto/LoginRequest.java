package me.thilinajayamal.login.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LoginRequest {
    @NotNull
    @NotBlank
    private String username;

    @NotBlank
    @NotNull
    private String password;
}
