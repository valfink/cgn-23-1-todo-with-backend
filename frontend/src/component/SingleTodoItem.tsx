import {TodoItem} from "../model/TodoItem";
import "./SingleTodoItem.css";
import {todoStatus} from "../model/TodoStatus";

type SingleTodoItemProps = {
    item: TodoItem
}

export default function SingleTodoItem(props: SingleTodoItemProps) {
    return (
        <section className={"todo-item"}>
            <h3>{props.item.description}</h3>
            <div className={"edit-links"}><a>Details</a> | <a>Edit</a></div>
            <button className={"advance " + props.item.status}>{todoStatus[props.item.status].nextStatus ? "Advance" : "Delete"}</button>
        </section>
    );
}