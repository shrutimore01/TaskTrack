package com.example.TaskTrack.user.service;

import com.example.TaskTrack.user.dto.UserRequest;
import com.example.TaskTrack.user.dto.UserResponse;
import com.example.TaskTrack.user.entity.Role;
import com.example.TaskTrack.user.entity.User;
import com.example.TaskTrack.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public UserResponse getUserById(Long id) {
        return toResponse(findUser(id));
    }

    public UserResponse createUser(UserRequest request) {
        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Email is already registered"
            );
        }

        if (request.getPassword() == null ||
                request.getPassword().isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Password is required"
            );
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );
        user.setPhone(request.getPhone());
        user.setProfileImageUrl(request.getProfileImageUrl());

        user.setRole(
                request.getRole() == null
                        ? Role.MEMBER
                        : request.getRole()
        );

        user.setActive(
                request.getActive() == null
                        || request.getActive()
        );

        User savedUser = userRepository.save(user);
        return toResponse(savedUser);
    }

    public UserResponse updateUser(
            Long id,
            UserRequest request
    ) {
        User user = findUser(id);
        String email = normalizeEmail(request.getEmail());

        userRepository.findByEmailIgnoreCase(email)
                .filter(existingUser ->
                        !existingUser.getId().equals(id))
                .ifPresent(existingUser -> {
                    throw new ResponseStatusException(
                            HttpStatus.CONFLICT,
                            "Email is already used by another user"
                    );
                });

        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPhone(request.getPhone());
        user.setProfileImageUrl(request.getProfileImageUrl());

        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        if (request.getActive() != null) {
            user.setActive(request.getActive());
        }

        if (request.getPassword() != null &&
                !request.getPassword().isBlank()) {
            user.setPassword(
                    passwordEncoder.encode(
                            request.getPassword()
                    )
            );
        }

        User updatedUser = userRepository.save(user);
        return toResponse(updatedUser);
    }

    public UserResponse changeUserStatus(
            Long id,
            boolean active
    ) {
        User user = findUser(id);
        user.setActive(active);

        User updatedUser = userRepository.save(user);
        return toResponse(updatedUser);
    }

    public void deleteUser(Long id) {
        User user = findUser(id);
        userRepository.delete(user);
    }

    private User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new ResponseStatusException(
                                HttpStatus.NOT_FOUND,
                                "User not found with ID: " + id
                        )
                );
    }

    private String normalizeEmail(String email) {
        if (email == null || email.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Email is required"
            );
        }

        return email.trim().toLowerCase();
    }

    private UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.getPhone(),
                user.getProfileImageUrl(),
                user.isActive(),
                user.getCreatedAt(),
                user.getUpdatedAt()
        );
    }
}