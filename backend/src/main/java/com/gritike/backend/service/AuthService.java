
package com.gritike.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gritike.backend.entity.User;
import com.gritike.backend.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // =========================
    // REGISTER
    // =========================

    public User registerUser(User user) {

        String email = user.getEmail().trim();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already registered");
        }

        user.setEmail(email);

        // Encode password before saving
        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        // Every newly registered account is a USER
        user.setRole("USER");

        return userRepository.save(user);
    }

    // =========================
    // LOGIN
    // =========================

    public User loginUser(String email, String password) {

        String cleanEmail = email.trim();

        User user = userRepository.findByEmail(cleanEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with email: " + cleanEmail
                        )
                );

        // Check password using BCrypt
        if (!passwordEncoder.matches(
                password,
                user.getPassword())) {

            throw new RuntimeException(
                    "Invalid email or password"
            );
        }

        return user;
    }
}

