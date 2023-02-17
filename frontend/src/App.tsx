import React from 'react';
import './App.css';
import Header from "./component/Header";
import FilterBar from "./component/FilterBar";
import {todoStatus} from "./model/TodoStatus";
import TodoBoard from "./component/TodoBoard";
import {TodoItem} from "./model/TodoItem";
import AddItemBar from "./component/AddItemBar";

function App() {

    // static mock props, will eventually become state!
    const filterButtons = [
        {value: "All", isSelected: true},
        {value: "New", isSelected: false},
        {value: "Doing", isSelected: false},
        {value: "Done", isSelected: false},
    ];
    const testItems: TodoItem[] = [
        {
            "id": "a",
            "description": "ERstes item",
            "status": "OPEN"
        },
        {
            "id": "b",
            "description": "Zweite item",
            "status": "OPEN"
        },
        {
            "id": "c",
            "description": "Drittes item",
            "status": "DONE"
        },
    ]
    // static props
    const todoBoards = Object.values(todoStatus).map(s => <TodoBoard
        boardName={s.displayText}
        items={testItems.filter(i => i.status === s.jsonValue)}
    />)

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
                <AddItemBar />
            </main>
        </div>
    );
}

export default App;
