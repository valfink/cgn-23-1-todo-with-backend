import {TodoItem} from "../model/TodoItem";
import TodoCard from "./TodoCard";
import "./TodoBoard.css";

type TodoBoardProps = {
    boardName: string,
    items: TodoItem[],
    advanceOrDeleteItem(item: TodoItem): void,
    setEditItem(item: TodoItem): void,
    setViewItemDetails(item: TodoItem): void
}

export default function TodoBoard(props: TodoBoardProps) {
    const todoItems = props.items
        .map(i => <TodoCard
            key={i.id}
            item={i}
            advanceOrDeleteItem={props.advanceOrDeleteItem}
            setEditItem={props.setEditItem}
            setViewItemDetails={props.setViewItemDetails} />)
    return (
        <section className={"todo-board"}>
            <h2>{props.boardName}</h2>
            {todoItems}
        </section>
    );
}