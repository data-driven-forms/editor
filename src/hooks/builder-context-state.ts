import { createContext } from "react";

interface BuilderState {
    containers: any;
    schema: any;
    draggingElement: any;
}

const BuilderContextState = createContext<BuilderState>({
    containers: {},
    schema: {},
    draggingElement: null
});

export default BuilderContextState;
