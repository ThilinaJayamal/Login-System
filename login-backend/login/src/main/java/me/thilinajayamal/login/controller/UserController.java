package me.thilinajayamal.login.controller;

import lombok.RequiredArgsConstructor;
import me.thilinajayamal.login.mapper.UserMapper;
import me.thilinajayamal.login.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<?> getMe(Authentication authentication) {

        return userService.getUserByUsername(authentication.getName())
                .map(user -> ResponseEntity.ok(UserMapper.toUserResponse(user)))
                .orElseGet(() -> ResponseEntity.status(404).body(null));
    }
}
