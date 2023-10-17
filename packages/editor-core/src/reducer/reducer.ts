import { dragDrop, dragStart, updateComponent, updateContainer } from '@data-driven-forms/dnd/reducer';

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
	case 'UNSELECT_COMPONENT':
		state.selectedComponent = null;
		return { ...state };
	case 'UPDATE_PROPS':
		state.components[action.id] = {
			...action.props
		};
		return { ...state };
	case 'REMOVE_COMPONENT':
		const removeInnerChild = (id: string) => {
			delete state.components[id];
			if (state.containers[id]) {
				const children = state.containers[id].children;

				children.forEach(removeInnerChild);

				delete state.containers[id];
			}
		};

		// remove item + container + all children
		removeInnerChild(action.id);

		// clear component from parent container
		const parent = Object.keys(state.containers).find(key =>
			state.containers[key].children.includes(action.id)
		);

		state.containers[parent as string].children = state.containers[parent as string].children.filter((key: string) => key !== action.id);

		return { ...state, ...(action.id === state.selectedComponent && { selectedComponent: null }) };
	case 'TOGGLE_SCHEMA':
		state.showSchema = action.showSchema || !state.showSchema;
		return { ...state };
	case 'SET_MODE':
		state.mode = action.mode;
		return { ...state };
	}
};

export default reducer;
