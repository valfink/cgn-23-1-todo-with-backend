import "./FilterBar.css";
import {ServerStatus} from "../model/TodoStatus";
import {BaseSyntheticEvent} from "react";

type FilterBarProps = {
    buttons: {
        value: string,
        filterValue: ServerStatus | undefined,
    }[],
    currenFilter: ServerStatus | undefined,
    changeFilter(filter: ServerStatus | undefined): void
}

export default function FilterBar(props: FilterBarProps) {
    function handleButtonClick(e: BaseSyntheticEvent) {
        console.log("Filter: " + e.target.dataset["filter"]);
        props.changeFilter(e.target.dataset["filter"]);
    }

    const filterButtons = props.buttons
        .map(b =>
            <button
                className={"filter-button " + (b.filterValue === props.currenFilter ? "selected" : "")}
                data-filter={b.filterValue}
                onClick={handleButtonClick}
            >
                {b.value}
            </button>);

    return (
        <section className={"filter-bar"}>
            <span>Show:</span> {filterButtons}
        </section>
    );
}