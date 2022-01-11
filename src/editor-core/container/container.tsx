import React from "react";

import useContainer from "../../dnd/use-container";
import { AnyObject } from "@data-driven-forms/react-form-renderer";

export interface ContainerProps extends React.HTMLProps<HTMLDivElement> {
    id?: string;
    container?: string;
    isRoot?: boolean;
    HandleProps?: AnyObject;
    ListProps?: React.HTMLProps<HTMLDivElement>;
    Component: React.FC<{ id: string; container: string; }>;
    Handle?: string | React.FC<AnyObject>;
}

const Container: React.FC<ContainerProps> = ({ id, container: sourceContainer, isRoot, Handle = 'div', HandleProps, ListProps, Component, ...props }) => {
    const { ref, container, id: containerId } = useContainer({ id, isRoot })

    return <div ref={ref} {...props}>
        <div {...ListProps}>
            {container.children.map((key: string) =>
                <Component key={key} id={key} container={containerId} />
            )}
        </div>
    </div>
}

export default Container;
