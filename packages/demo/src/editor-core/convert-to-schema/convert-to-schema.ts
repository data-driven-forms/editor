import { AnyObject } from "../../dnd/types";

export const convertComponent = (state: AnyObject, id: string) => {
    let schema = {};

    if(state.components[id]) {
        const { ref, ...props } = state.components[id];

        schema = { ...schema, ...props };
    }

    if(state.containers[id]) {
        const {children} = state.containers[id];

        const fields = children.map((child: string) =>
            convertComponent(state, child)
        );

        schema = { ...schema, fields };
    }

    return schema;
}

const convertToSchema = (state: AnyObject) => {
    const schema = convertComponent(state, 'root');

    return schema;
}

export default convertToSchema;
