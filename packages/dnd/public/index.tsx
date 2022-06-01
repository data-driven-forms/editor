import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';

import reducer, { initialState } from '../src/reducer';
import Provider from '../src/provider';
import useContainer from '../src/use-container';
import useComponent from '../src/use-component';
import useHandle from '../src/use-handle';

const Component : React.FC<{id: string; container: string}> = ({ id, container }) => {
	const { ref } = useComponent({ id });
	const handlers = useHandle({ component: id, sourceContainer: container});

	return <div ref={ref} {...handlers} style={{
		background: 'blue',
		minHeight: 100,
		minWidth: 308,
		margin: 4,
		color: 'white',
		textAlign: 'center',
		fontSize: 48
	}}>{id}</div>;
};

const Container = () => {
	const { ref, container, id } = useContainer({ isRoot: true });

	return <div ref={ref} style={{
		background: 'gray',
		minHeight: 400,
		minWidth: 400,
		padding: 4
	}}>
		{container.children.map((key: string) =>
			<Component key={key} id={key} container={id} />
		)}
	</div>;
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, {
		...initialState,
		components: {
			'#1': {},
			'#2': {},
			'#3': {}
		},
		containers: {
			root: {
				children: ['#1', '#2', '#3'],
				ref: null
			}
		},
	});

	return <Provider state={state} dispatch={dispatch}>
		<Container />
	</Provider>;
};

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
