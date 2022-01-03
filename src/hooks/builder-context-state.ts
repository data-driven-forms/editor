import { createContext } from "react";

interface BuilderState {
    containers: any;
    schema: any;
    draggingElement: any;
    components: any;
}

const BuilderContextState = createContext<BuilderState>({
    containers: {},
    schema: {},
    draggingElement: null,
    components: {}
});

export default BuilderContextState;
