import React, {useState} from 'react';
import './App.css';
import Header from "./component/Header";
import FilterBar from "./component/FilterBar";
import {ServerStatus, todoStatus} from "./model/TodoStatus";
import {TodoItem} from "./model/TodoItem";
import AddItemBar from "./component/AddItemBar";
import DetailsAndEditModal from "./component/DetailsAndEditModal";
import useTodos from "./hook/useTodos";
import TodoBoards from "./component/TodoBoards";

function App() {
    const [boardFilter, setBoardFilter] = useState<ServerStatus | undefined>(undefined);
    const [selectedItem, setSelectedItem] = useState<TodoItem | undefined>(undefined);
    const [modalAction, setModalAction] = useState<"details" | "edit">("details");

    const {todoItems, postNewTodo, advanceOrDeleteTodo, updateTodo} = useTodos();

    function setEditTodo(item: TodoItem) {
        setModalAction("edit");
        setSelectedItem(item);
    }

    function setViewTodoDetails(item: TodoItem) {
        setModalAction("details");
        setSelectedItem(item);
    }

    function closeModal() {
        setSelectedItem(undefined);
    }

    // static mock props, will eventually become state!
    const filterButtons: { value: string, filterValue: ServerStatus | undefined }[] = Object.values(todoStatus)
        .map(status => ({
            value: status.displayText,
            filterValue: status.jsonValue
        }));
    filterButtons.unshift({value: "All", filterValue: undefined})

    return (
        <div className="App">
            <Header/>
            <main>
                {selectedItem &&
                    <DetailsAndEditModal
                        item={selectedItem}
                        action={modalAction}
                        closeModal={closeModal}
                        updateItem={updateTodo}
                    />}
                <FilterBar
                    buttons={filterButtons}
                    currenFilter={boardFilter}
                    changeFilter={setBoardFilter}
                />
                <section className={"board-container"}>
                    <TodoBoards
                        todoItems={todoItems}
                        boardFilter={boardFilter}
                        advanceOrDeleteTodo={advanceOrDeleteTodo}
                        setEditTodo={setEditTodo}
                        setViewTodoDetails={setViewTodoDetails}
                    />
                </section>
                <AddItemBar
                    onSubmit={postNewTodo}
                />
            </main>
        </div>
    );
}

export default App;
