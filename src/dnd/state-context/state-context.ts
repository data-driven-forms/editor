import { createContext } from "react";
import { AnyObject } from "../types";

interface Component extends AnyObject {
    ref?: React.Ref<HTMLDivElement>;
}

interface Container extends AnyObject {
    ref?: React.Ref<HTMLDivElement>;
    children: string[];
}

interface Components {
    [key: string]: Component;
}

interface Containers {
    [key: string]: Container;
}

interface StateContext extends AnyObject {
    components: Components;
    containers: Containers;
    draggingElement?: string | null,
    isDraggingContainer?: boolean | null,
    draggingSourceContainer?: string | null,
}

const context = createContext<StateContext>({
    components: {},
    containers: {
        root: {
            children: []
        }
    },
    draggingElement: null,
    isDraggingContainer: null,
    draggingSourceContainer: null,
})

export default context;
