package com.example.backend.service;

import com.example.backend.model.TodoItem;
import com.example.backend.repository.TodoItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoItemRepo todoItemRepo;
    private final IDService idService;

    public TodoItem addTodoItem(TodoItem todoItemWithoutID) {
        TodoItem todoItem = new TodoItem(idService.generateID(), todoItemWithoutID.description(), todoItemWithoutID.status());
        return todoItemRepo.addTodoItem(todoItem);
    }
}
