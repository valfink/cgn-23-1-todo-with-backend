import {TodoItem} from "../model/TodoItem";
import "./TodoCard.css";
import {todoStatus} from "../model/TodoStatus";

type TodoCardProps = {
    item: TodoItem,
    advanceOrDeleteItem(item: TodoItem): void,
    setViewItemDetails(item: TodoItem): void,
    setEditItem(item: TodoItem): void
}

export default function TodoCard(props: TodoCardProps) {
    function handleAdvanceButtonClick() {
        props.advanceOrDeleteItem(props.item);
    }
    function handleDetailsButtonClick() {
        props.setViewItemDetails(props.item);
    }
    function handleEditButtonClick() {
        props.setEditItem(props.item);
    }

    return (
        <section className={"todo-item"}>
            <h3>{props.item.description}</h3>
            <div className={"edit-buttons"}><
                button onClick={handleDetailsButtonClick}>Details</button>
                <button onClick={handleEditButtonClick}>Edit</button>
            </div>
            <button
                className={"advance " + props.item.status}
                onClick={handleAdvanceButtonClick}
            >
                {todoStatus[props.item.status].hasNexStatus ? "Advance" : "Delete"}
            </button>
        </section>
    );
}