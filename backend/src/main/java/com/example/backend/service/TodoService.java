package com.example.backend.service;

import com.example.backend.model.TodoItem;
import com.example.backend.repository.TodoItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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

    public TodoItem getTodoItemById(String id) {
        return todoItemRepo.getTodoItemById(id).orElseThrow(NoSuchElementException::new);
    }

    public TodoItem updateTodoItem(String id, TodoItem todoItem) {
        getTodoItemById(id);
        if (!id.equals(todoItem.id())) {
            throw new SecurityException("The provided IDs don't match (" + id + " in path, " + todoItem.id() + " in Item).");
        }
        return todoItemRepo.addTodoItem(todoItem);
    }
}
