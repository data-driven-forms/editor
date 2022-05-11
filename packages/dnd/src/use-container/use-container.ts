import { createRef, useEffect } from 'react';
import useDispatch from '../use-dispatch';
import useState from '../use-state';

interface UseContainerConfig {
    id?: string;
    isRoot?: boolean;
}

const useContainer = ({ id, isRoot }: UseContainerConfig) => {
	const state = useState();
	const dispatch = useDispatch();

	const ref = createRef<HTMLDivElement>();

	const finalId = isRoot ? 'root' : id;

	if(!isRoot && !finalId) {
		throw new Error('Missing id for non-root container!');
	}

	const container = state.containers[finalId || 'root'] || { children: [] };

	useEffect(() => {
		if (ref.current) {
			dispatch({ type: 'UPDATE_CONTAINER', id: finalId, ref: ref.current });
		}
	}, []);

	return { ref, container, id: finalId || 'root' };
};

export default useContainer;
