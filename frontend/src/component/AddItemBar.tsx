import "./AddItemBar.css";
import {ChangeEvent, FormEvent, useState} from "react";

type AddItemBarProps = {
    newItemHandler(description: string): void
}

export default function AddItemBar(props: AddItemBarProps) {
    const [description, setDescription] = useState("");

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setDescription(e.target.value);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        props.newItemHandler(description);
        setDescription("");
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