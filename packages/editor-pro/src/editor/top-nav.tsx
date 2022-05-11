import React from 'react';
import { Pane, majorScale, Heading, CodeIcon, Button, SegmentedControl } from 'evergreen-ui';
import useDispatch from '@data-driven-forms/dnd/use-dispatch';

const TopNav = () => {
	const dispatch = useDispatch();

	return <Pane
		is="nav"
		width="100%"
		position="sticky"
		top={0}
		backgroundColor="white"
		zIndex={10}
		height={majorScale(5)}
		flexShrink={0}
		display="flex"
		alignItems="center"
		borderBottom="muted"
		paddingLeft={majorScale(3)}
		paddingRight={majorScale(1)}
		background='tint2'
	>
		<Pane display="flex" alignItems="center" width={236}>
			<Heading size={500}>
                Data Driven Forms Pro Editor
			</Heading>
		</Pane>
		<Pane flex={1} display="flex" justifyContent="center">
			<SegmentedControl
				size="small"
				width="200px"
				options={[
					{label: 'Build mode', value: 'build'},
					{label: 'Test', value: 'test'}
				]}
				onChange={(mode) => dispatch({type: 'SET_MODE', mode})}
			/>
		</Pane>
		<Pane display="flex" justifyContent="flex-end" width={236}>
			<Button iconBefore={CodeIcon} onClick={() => dispatch({ type: 'TOGGLE_SCHEMA' })}>
                Show Schema
			</Button>
		</Pane>
	</Pane>;
};

export default TopNav;
