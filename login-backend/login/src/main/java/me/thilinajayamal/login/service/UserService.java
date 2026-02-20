package me.thilinajayamal.login.service;

import lombok.RequiredArgsConstructor;
import me.thilinajayamal.login.model.UserModel;
import me.thilinajayamal.login.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<UserModel> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
