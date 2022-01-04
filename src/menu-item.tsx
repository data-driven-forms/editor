import useHandle from "./hooks/use-handle";

const MenuItem = ({ component, label, isContainer }: any) => {
    const events = useHandle({component, isContainer});

    return <div
        className="component"
        {...events}
    >
        {label}
    </div>
}

export default MenuItem;
