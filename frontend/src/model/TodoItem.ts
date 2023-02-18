import {ServerStatus} from "./TodoStatus";

export type TodoItem = {
    id?: string,
    description: string,
    status: ServerStatus
}