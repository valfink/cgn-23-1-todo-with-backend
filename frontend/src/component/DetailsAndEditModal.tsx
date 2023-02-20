import {TodoItem} from "../model/TodoItem";
import "./DetailsEditModal.css";
import {ChangeEvent, FormEvent, useState} from "react";
import {ServerStatus, todoStatus} from "../model/TodoStatus";

type DetailsAndEditModalProps = {
    // FIXME: Cannot leave out the "undefined"
    item: TodoItem | undefined,
    action: "edit" | "details",
    closeModal(): void,
    updateItem(item: TodoItem): void;
}

export default function DetailsAndEditModal(props: DetailsAndEditModalProps) {
    const [newDescription, setNewDescription] = useState(props.item?.description);
    const [newStatus, setNewStatus] = useState(props.item?.status);

    function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
        setNewDescription(e.target.value);
    }
    function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
        // FIXME: Is this a bad idea?
        setNewStatus(e.target.value as ServerStatus);
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newItem: TodoItem = {
            id: props.item?.id,
            // FIXME: Have to typecast everything because of line 8 :(
            description: newDescription as string,
            status: newStatus as ServerStatus,
        }
        props.updateItem(newItem);
        props.closeModal();
    }

    const editItemView = (
        <>
            <h2>Edit Item</h2>
            <form onSubmit={handleSubmit}>
                <strong>Description: </strong> <input value={newDescription} onChange={handleDescriptionChange}/><br/>
                <strong>Status: </strong>
                <select onChange={handleSelectChange}>
                    {Object.values(todoStatus).map(status =>
                        <option
                            selected={status.jsonValue === newStatus}
                            value={status.jsonValue}>{status.displayText}
                        </option>
                    )}
                </select><br/>
                <button type={"submit"}>Update</button><br/>
                <button onClick={props.closeModal}>Close</button>
            </form>
        </>
    );
    const viewItemView = (
        <>
            <h2>View Item</h2>
            <strong>Description: </strong> {props.item?.description}<br/>
            <strong>ID: </strong> {props.item?.id}<br/>
            <strong>Status: </strong> {props.item?.status}<br/>
            <button onClick={props.closeModal}>Close</button>
        </>
    );

    return (
        !props.item ? <></> :
            <div className={"details-edit-modal "}>
                <div className={"modal-content"}>
                    {props.action === "edit" ? editItemView : viewItemView}
                </div>
            </div>
    );
}