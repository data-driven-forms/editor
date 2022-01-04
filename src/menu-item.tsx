import useStartDrag from "./hooks/use-start-drag";

const MenuItem = ({ component, label, isContainer }: any) => {
    const events = useStartDrag({component, isContainer});

    return <div
        className="component"
        {...events}
    >
        {label}
    </div>
}

export default MenuItem;
