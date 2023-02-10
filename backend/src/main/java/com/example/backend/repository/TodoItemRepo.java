package com.example.backend.repository;

import com.example.backend.model.TodoItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class TodoItemRepo {
    private final Map<String, TodoItem> todoItemMap;

    public TodoItem addTodoItem(TodoItem todoItem) {
        todoItemMap.put(todoItem.id(), todoItem);
        return todoItem;
    }

    public List<TodoItem> listTodoItems() {
        return todoItemMap.values().stream().toList();
    }

    public Optional<TodoItem> getTodoItemById(String id) {
        return Optional.ofNullable(todoItemMap.get(id));
    }

}
