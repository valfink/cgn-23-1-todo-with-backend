import "./FilterBar.css";

type FilterBarProps = {
    buttons: {
        value: string,
        isSelected: boolean
    }[]
}

export default function FilterBar(props: FilterBarProps) {
    const filterButtons = props.buttons.map(b => <button className={"filter-button " + (b.isSelected ? "selected" : "")}>{b.value}</button>);
    return (
        <section className={"filter-bar"}>
            <span>Show:</span> {filterButtons}
        </section>
    );
}