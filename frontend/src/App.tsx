import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./component/Header";
import FilterBar from "./component/FilterBar";
import {ServerStatus, todoStatus} from "./model/TodoStatus";
import TodoBoard from "./component/TodoBoard";
import {TodoItem} from "./model/TodoItem";
import AddItemBar from "./component/AddItemBar";
import axios from "axios";
import DetailsAndEditModal from "./component/DetailsAndEditModal";

function App() {
    const [items, setItems] = useState<TodoItem[]>([]);
    const [boardFilter, setBoardFilter] = useState<ServerStatus | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<TodoItem | undefined>(undefined);
    const [modalAction, setModalAction] = useState<"details" | "edit">("details");

    function fetchItems() {
        console.log("Fetching items...");
        axios.get("/api/todo")
            .then(response => {
                setItems(response.data);
            })
            .catch(e => console.error(e));
    }

    function postNewItem(itemDescription: string) {
        const item: TodoItem = {
            description: itemDescription,
            status: "OPEN"
        }
        console.log("Posting new item...");
        axios.post("/api/todo", item)
            .then(fetchItems)
            .catch(e => console.error(e));
    }

    function advanceOrDeleteItem(item: TodoItem) {
        if (todoStatus[item.status].hasNexStatus) {
            const advancedItem: TodoItem = {
                id: item.id,
                description: item.description,
                status: todoStatus[item.status].nextStatus
            }
            console.log("Advancing item...");
            axios.put("/api/todo/" + item.id, advancedItem)
                .then(fetchItems)
                .catch(e => console.error(e));
        } else {
            console.log("Deleting item...");
            axios.delete("/api/todo/" + item.id)
                .then(fetchItems)
                .catch(e => console.error(e));
        }
    }

    function setEditItem(item: TodoItem) {
        setModalAction("edit");
        setSelectedItem(item);
    }

    function setViewItemDetails(item: TodoItem) {
        setModalAction("details");
        setSelectedItem(item);
    }

    function closeModal() {
        setSelectedItem(undefined);
    }

    function updateItem(item: TodoItem) {
        axios.put("/api/todo/" + item.id, item)
            .then(fetchItems)
            .catch(e => console.error(e));
    }

    // static mock props, will eventually become state!
    const filterButtons: { value: string, filterValue: ServerStatus | undefined }[] = Object.values(todoStatus)
        .map(status => ({
            value: status.displayText,
            filterValue: status.jsonValue
        }));
    filterButtons.unshift({value: "All", filterValue: undefined})

    // static props
    const todoBoards = Object.values(todoStatus)
        .filter(status => boardFilter ? status.jsonValue === boardFilter : true)
        .map(status => <TodoBoard
            key={"board" + status.jsonValue}
            boardName={status.displayText}
            items={items.filter(item => item.status === status.jsonValue)}
            advanceOrDeleteItem={advanceOrDeleteItem}
            setEditItem={setEditItem}
            setViewItemDetails={setViewItemDetails}/>)

    useEffect(fetchItems, []);

    return (
        <div className="App">
            <Header/>
            <main>
                {selectedItem &&
                    <DetailsAndEditModal
                        item={selectedItem}
                        action={modalAction}
                        closeModal={closeModal}
                        updateItem={updateItem} />}
                <FilterBar
                    buttons={filterButtons}
                    currenFilter={boardFilter}
                    changeFilter={setBoardFilter}
                />
                <section className={"board-container"}>
                    {todoBoards}
                </section>
                <AddItemBar
                    newItemHandler={postNewItem}
                />
            </main>
        </div>
    );
}

export default App;
