import {TodoItem} from "../model/TodoItem";

type SingleTodoItemProps = {
    item: TodoItem
}

export default function SingleTodoItem(props: SingleTodoItemProps) {
    return (
        <section>
            {props.item.description}
        </section>
    );
}