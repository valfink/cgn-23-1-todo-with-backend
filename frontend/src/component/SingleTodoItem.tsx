import {TodoItem} from "../model/TodoItem";
import "./SingleTodoItem.css";
import {todoStatus} from "../model/TodoStatus";

type SingleTodoItemProps = {
    item: TodoItem,
    advanceOrDeleteItem(item: TodoItem): void
}

export default function SingleTodoItem(props: SingleTodoItemProps) {
    function handleButtonClick() {
        props.advanceOrDeleteItem(props.item);
    }

    return (
        <section className={"todo-item"}>
            <h3>{props.item.description}</h3>
            <div className={"edit-links"}><a>Details</a> | <a>Edit</a></div>
            <button
                className={"advance " + props.item.status}
                onClick={handleButtonClick}
            >
                {todoStatus[props.item.status].hasNexStatus ? "Advance" : "Delete"}
            </button>
        </section>
    );
}