package com.example.backend.controller;

import com.example.backend.model.TodoItem;
import com.example.backend.model.TodoStatus;
import com.example.backend.repository.TodoItemRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

//import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class TodoControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    TodoItemRepo todoItemRepo;
    TodoItem todo1_noID, todo2_noID, todo1_withID, todo2_withID;

    @BeforeEach
    void setUp() {
        todo1_noID = new TodoItem(null, "My first item", TodoStatus.OPEN);
        todo2_noID = new TodoItem(null, "My second item", TodoStatus.OPEN);
        todo1_withID = new TodoItem("123", "My first item", TodoStatus.OPEN);
        todo2_withID = new TodoItem("234", "My second item", TodoStatus.OPEN);
    }

    @Test
    @DirtiesContext
    void addTodoItem() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/todo")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"description": "fds", "status": "OPEN"}
                        """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {"description": "fds", "status": "OPEN"}
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void listTodoItems() throws Exception {
        // GIVEN
        todoItemRepo.addTodoItem(todo1_withID);
        todoItemRepo.addTodoItem(todo2_withID);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todo"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "id": "123",
                                "description": "My first item",
                                "status": "OPEN"
                            },
                            {
                                "id": "234",
                                "description": "My second item",
                                "status": "OPEN"
                            }
                        ]
                        """));

        // THEN
    }

    @Test
    @DirtiesContext
    void getTodoItemById() throws Exception {
        // GIVEN
        todoItemRepo.addTodoItem(todo1_withID);
        todoItemRepo.addTodoItem(todo2_withID);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/todo/" + todo1_withID.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "123",
                            "description": "My first item",
                            "status": "OPEN"
                        }
                        """));

        // THEN
    }

    @Test
    @DirtiesContext
    void updateTodoItem() throws Exception {
        // GIVEN
        todoItemRepo.addTodoItem(todo1_withID);
        todoItemRepo.addTodoItem(todo2_withID);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/todo/" + todo1_withID.id())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                            {
                                "id": "123",
                                "description": "My first item EDITED",
                                "status": "IN_PROGRESS"
                            }
                            """))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "123",
                            "description": "My first item EDITED",
                            "status": "IN_PROGRESS"
                        }
                        """));

        // THEN
    }

    @Test
    @DirtiesContext
    void deleteTodoItem() throws Exception {
        // GIVEN
        todoItemRepo.addTodoItem(todo1_withID);
        todoItemRepo.addTodoItem(todo2_withID);

        // WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/todo/" + todo1_withID.id()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "123",
                            "description": "My first item",
                            "status": "OPEN"
                        }
                        """));

        // THEN
    }
}