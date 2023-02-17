import {SingleStatus} from "./TodoStatus";

export type TodoItem = {
    id: string,
    description: string,
    status: SingleStatus["jsonValue"]
}