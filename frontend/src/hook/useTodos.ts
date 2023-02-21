import {useEffect, useState} from "react";
import {NewTodoItem, TodoItem} from "../model/TodoItem";
import {todoStatus} from "../model/TodoStatus";
import axios from "axios";

export default function useTodos() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);

    function fetchTodos() {
        console.log("Fetching items...");
        axios.get("/api/todo")
            .then(response => {
                setTodoItems(response.data);
            })
            .catch(console.error);
    }

    function postNewTodo(item: NewTodoItem) {
        console.log("Posting new item...");
        return axios.post("/api/todo", item)
            .then(response => setTodoItems(prevState => [...prevState, response.data]))
            // .then(fetchItems)
            .catch(console.error);
    }

    function advanceOrDeleteTodo(item: TodoItem) {
        if (todoStatus[item.status].hasNexStatus) {
            const advancedItem: TodoItem = {
                ...item,
                status: todoStatus[item.status].nextStatus
            }
            console.log("Advancing item...");
            axios.put("/api/todo/" + item.id, advancedItem)
                .then(response => setTodoItems(prevState =>
                    prevState.map(oldItem =>
                        oldItem.id === item.id ? response.data : oldItem)))
                // .then(fetchItems)
                .catch(console.error);
        } else {
            console.log("Deleting item...");
            axios.delete("/api/todo/" + item.id)
                .then(fetchTodos)
                .catch(console.error);
        }
    }

    function updateTodo(item: TodoItem) {
        axios.put("/api/todo/" + item.id, item)
            .then(fetchTodos)
            .catch(console.error);
    }

    useEffect(fetchTodos, []);

    return {todoItems, postNewTodo, advanceOrDeleteTodo, updateTodo}
}