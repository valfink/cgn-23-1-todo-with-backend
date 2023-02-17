import "./AddItemBar.css";

export default function AddItemBar() {
    return (
        <section className={"add-item-bar"}>
            <input type={"text"} placeholder={"Add new item..."} /><button>Add</button>
        </section>
    );
}