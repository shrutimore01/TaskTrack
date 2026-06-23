package com.example.TaskTrack.auth.dto;

import com.example.TaskTrack.user.entity.Role;

public class AuthResponse {

    private String message;
    private Long userId;
    private String name;
    private String email;
    private Role role;

    public AuthResponse() {
    }

    public AuthResponse(
            String message,
            Long userId,
            String name,
            String email,
            Role role
    ) {
        this.message = message;
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public Role getRole() {
        return role;
    }
}