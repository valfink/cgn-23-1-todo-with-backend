package com.example.backend.controller;

import com.example.backend.model.TodoItem;
import com.example.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping("todo")
    public TodoItem addTodoItem(@RequestBody TodoItem todoItem) {
        return todoService.addTodoItem(todoItem);
    }
}
