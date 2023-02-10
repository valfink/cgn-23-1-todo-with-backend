package com.example.backend.repository;

import com.example.backend.model.TodoItem;
import com.example.backend.model.TodoStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class TodoItemRepoTest {
    TodoItem todo1, todo2;
    Map<String, TodoItem> todoItemMap;
    TodoItemRepo todoItemRepo;

    @BeforeEach
    void setUp() {
        todo1 = new TodoItem("123", "My first item", TodoStatus.OPEN);
        todo2 = new TodoItem("234", "My second item", TodoStatus.OPEN);
        todoItemMap = new HashMap<>(Map.of(todo1.id(), todo1));
        todoItemRepo = new TodoItemRepo(todoItemMap);
    }

    @Test
    void addTodoItem() {
        // GIVEN
        TodoItem expected = todo2;

        // WHEN
        TodoItem actual = todoItemRepo.addTodoItem(todo2);

        // THEN
        assertEquals(expected, actual);
    }
}