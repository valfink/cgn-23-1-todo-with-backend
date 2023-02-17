import {TodoItem} from "../model/TodoItem";
import "./DetailsEditModal.css";
import {ChangeEvent, useState} from "react";

type DetailsEditModalProps = {
    item: TodoItem |undefined,
    action: "edit" | "details",
    closeModal(): void
}

export default function DetailsEditModal(props: DetailsEditModalProps) {
    const [newDescription, setNewDescription] = useState(props.item?.description);
    const [newStatus, setNewStatus] = useState(props.item?.status);


    function handleDescriptionChange(e: ChangeEvent<HTMLInputElement>) {
        setNewDescription(e.target.value);
    }

    const editItemView = (
        <>
            <h2>Edit Item</h2>
            <form>
                <strong>Description: </strong> <input value={newDescription} onChange={handleDescriptionChange} /><br/>
                <strong>Status: </strong> <select><option>HALLO</option></select><br/>
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