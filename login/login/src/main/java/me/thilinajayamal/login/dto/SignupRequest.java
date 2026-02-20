package me.thilinajayamal.login.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class SignupRequest {

    @NotNull
    @NotBlank(message = "Username must not be blank")
    private String username;

    @NotNull
    @NotBlank(message = "Password must not be blank")
    @Pattern(
            regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!]).{8,}$",
            message = "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
    )
    private String password;

    @NotNull
    @NotBlank
    private String name;
}