const findTargetElement = (position: any, state: any): any => {
    let result = null;
    let resultContainer = null;
    let resultPosition;

    let margin = Infinity;

    // find most suitable container
    Object.keys(state.containers).forEach(key => {
        let temporaryResult = null;

        const container = state.containers[key];

        const metadata = container.ref.getBoundingClientRect().toJSON();

        // check if mouse is inside a container
        if (
            position.x >= metadata.x
            && position.x <= metadata.right
            && position.y >= metadata.y
            && position.y <= metadata.bottom
            && position.x - metadata.left <= margin
        ) {
            // check if users wants to move item under another item
            container.children.forEach((id: any, index: number) => {
                const component = state.components[id] || state.containers[id];
                const componentPosition = component.ref.getBoundingClientRect().toJSON();

                // if users points 5px under and half of the component
                // insert item under the component
                if (
                    Math.abs(componentPosition.bottom - position.y) < (componentPosition.height / 2) ||
                    Math.abs(position.y - componentPosition.bottom) < 5) {
                    // x position constraint
                    if (
                        position.x + 5 >= componentPosition.x
                        && position.x <= componentPosition.right + 5
                    ) {
                        temporaryResult = { ...componentPosition, top: componentPosition.bottom - 1, height: 2 };
                        resultPosition = index + 1;
                    }
                }
            })

            // user is pointing to the top of the container
            if (position.y - metadata.top < 10) {
                temporaryResult = { ...metadata, height: 2 }
                resultPosition = 0;
            }

            // push to the bottom
            result = temporaryResult || metadata;
            resultContainer = key;
            margin = position.x - metadata.left;
        }
    })

    return { rect: result, container: resultContainer, position: resultPosition };
}

export default findTargetElement;
