import "./AddItemBar.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {NewTodoItem} from "../model/TodoItem";

type AddItemBarProps = {
    onSubmit: (item: NewTodoItem) => Promise<void>
}

export default function AddItemBar(props: AddItemBarProps) {
    const [description, setDescription] = useState("");

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const item: NewTodoItem = {
            description: description,
            status: "OPEN"
        }
        props.onSubmit(item)
            .then(() => setDescription(""));
    }

    return (
        <section className={"add-item-bar"}>
            <form onSubmit={handleSubmit}>
                <input type={"text"} placeholder={"Add new item..."} value={description} onChange={handleInputChange}/>
                <button type={"submit"}>Add</button>
            </form>
        </section>
    );
}