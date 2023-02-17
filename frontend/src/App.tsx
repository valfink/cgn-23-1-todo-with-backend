import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./component/Header";
import FilterBar from "./component/FilterBar";
import {todoStatus} from "./model/TodoStatus";
import TodoBoard from "./component/TodoBoard";
import {TodoItem} from "./model/TodoItem";
import AddItemBar from "./component/AddItemBar";
import axios from "axios";

function App() {
    const [items, setItems] = useState<TodoItem[]>([]);

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

    // static mock props, will eventually become state!
    const filterButtons = [
        {value: "All", isSelected: true},
        {value: "New", isSelected: false},
        {value: "Doing", isSelected: false},
        {value: "Done", isSelected: false},
    ];
    // static props
    const todoBoards = Object.values(todoStatus).map(status => <TodoBoard
        boardName={status.displayText}
        items={items.filter(item => item.status === status.jsonValue)}
        advanceOrDeleteItem={advanceOrDeleteItem}
    />)

    useEffect(fetchItems, []);

    return (
        <div className="App">
            <Header/>
            <main>
                <FilterBar
                    buttons={filterButtons}
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
