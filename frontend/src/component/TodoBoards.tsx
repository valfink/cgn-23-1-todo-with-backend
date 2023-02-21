import {ServerStatus, todoStatus} from "../model/TodoStatus";
import TodoBoard from "./TodoBoard";
import React from "react";
import {TodoItem} from "../model/TodoItem";

type TodoBoardsProps = {
    todoItems: TodoItem[],
    boardFilter: ServerStatus | undefined,
    advanceOrDeleteTodo: (item: TodoItem) => void,
    setEditTodo: (item: TodoItem) => void,
    setViewTodoDetails: (item: TodoItem) => void
}

export default function TodoBoards(props: TodoBoardsProps) {

    return (
        <>
            {Object.values(todoStatus)
                .filter(status => props.boardFilter ? status.jsonValue === props.boardFilter : true)
                .map(status =>
                    <TodoBoard
                        key={"board" + status.jsonValue}
                        boardName={status.displayText}
                        items={props.todoItems.filter(item => item.status === status.jsonValue)}
                        advanceOrDeleteItem={props.advanceOrDeleteTodo}
                        setEditItem={props.setEditTodo}
                        setViewItemDetails={props.setViewTodoDetails}
                    />
                )}
        </>
    )


}