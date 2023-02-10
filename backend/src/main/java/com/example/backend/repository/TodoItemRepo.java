package com.example.backend.repository;

import com.example.backend.model.TodoItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
@RequiredArgsConstructor
public class TodoItemRepo {
    private final Map<String, TodoItem> todoItemMap;

    public TodoItem addTodoItem(TodoItem todoItem) {
        todoItemMap.put(todoItem.id(), todoItem);
        return todoItem;
    }
}
