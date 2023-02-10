package com.example.backend.model;

public record TodoItem(
        String description,
        TodoStatus status
) {
}
