import { CursorPosition } from '../drop-cursor';
import findTargetElement from '../find-target-element';
import { StateContext } from '../state-context';

describe('find-target-element', () => {
	let position: CursorPosition;
	let state: StateContext;

	it('find correct container', () => {
		position = {
			x: 10,
			y: 10
		};

		state = {
			components: {},
			containers: {
				root: {
					children: [],
					ref: ({
						getBoundingClientRect: () => ({
							toJSON: () => ({
								x: 5,
								right: 15,
								y: 5,
								bottom: 15,
								left: 20,
							})
						})
					}) as Element
				}
			}
		};

		expect(findTargetElement(position, state)).toEqual(
			{
				'container': 'root',
				'position': 0,
				'rect': {
					'bottom': 15,
					'left': 20,
					'right': 15,
					'x': 5,
					'y': 5,
				},
			}
		);
	});
});
