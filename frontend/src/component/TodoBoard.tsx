import {TodoItem} from "../model/TodoItem";
import SingleTodoItem from "./SingleTodoItem";

type TodoBoardProps = {
    boardName: string,
    items: TodoItem[]
}

export default function TodoBoard(props: TodoBoardProps) {
    const todoItems = props.items.map(i => <SingleTodoItem item={i} />)
    return (
        <section className={"todo-board"}>
            {props.boardName}
            {todoItems}
        </section>
    );
}