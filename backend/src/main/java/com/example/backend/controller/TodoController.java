package com.example.backend.controller;

import com.example.backend.model.TodoItem;
import com.example.backend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping("todo")
    public TodoItem addTodoItem(@RequestBody TodoItem todoItem) {
        return todoService.addTodoItem(todoItem);
    }

    @GetMapping("todo")
    public List<TodoItem> listTodoItems() {
        return todoService.listTodoItems();
    }

    @GetMapping("todo/{id}")
    public TodoItem getTodoItemById(@PathVariable String id) {
        return todoService.getTodoItemById(id);
    }
}
