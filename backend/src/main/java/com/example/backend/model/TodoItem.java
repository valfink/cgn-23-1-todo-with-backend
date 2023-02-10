package com.example.backend.model;

public record TodoItem(
        String id,
        String description,
        TodoStatus status
) {
}
