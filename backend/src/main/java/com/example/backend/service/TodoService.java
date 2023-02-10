package com.example.backend.service;

import com.example.backend.model.TodoItem;
import com.example.backend.repository.TodoItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoItemRepo todoItemRepo;
    private final IDService idService;

    public TodoItem addTodoItem(TodoItem todoItemWithoutID) {
        TodoItem todoItem = new TodoItem(idService.generateID(), todoItemWithoutID.description(), todoItemWithoutID.status());
        return todoItemRepo.addTodoItem(todoItem);
    }

    public List<TodoItem> listTodoItems() {
        return todoItemRepo.listTodoItems();
    }
}
