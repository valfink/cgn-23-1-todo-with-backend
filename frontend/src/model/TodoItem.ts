import {ServerStatus} from "./TodoStatus";

export type TodoItem = {
    id?: string,
    description: string,
    status: ServerStatus
}

export type NewTodoItem = Omit<TodoItem, "id">