import {TodoItem} from "../model/TodoItem";
import SingleTodoItem from "./SingleTodoItem";
import "./TodoBoard.css";

type TodoBoardProps = {
    boardName: string,
    items: TodoItem[]
}

export default function TodoBoard(props: TodoBoardProps) {
    const todoItems = props.items.map(i => <SingleTodoItem item={i} />)
    return (
        <section className={"todo-board"}>
            <h2>{props.boardName}</h2>
            {todoItems}
        </section>
    );
}