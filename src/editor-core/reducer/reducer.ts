import { dragDrop, dragStart, updateComponent, updateContainer } from "../../dnd/reducer";

const reducer = (state: any, action: any) => {
    console.log(action.type, '>>', state, action);
    switch (action.type) {
        case 'DRAG_START':
            return dragStart(state, action);
        case 'DRAG_DROP':
            return dragDrop(state, action);
        case 'UPDATE_CONTAINER':
            return updateContainer(state, action);
        case 'UPDATE_COMPONENT':
            return updateComponent(state, action);
        case 'SELECT_COMPONENT':
            state.selectedComponent = action.id;
            return { ...state };
        case 'UPDATE_PROPS':
            state.components[action.id] = {
                ...state.components[action.id],
                ...action.props
            };
            return { ...state };
    }
}

export default reducer;
