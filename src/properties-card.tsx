import React, { useState } from 'react';
import { Pane, Heading, Tab, Tablist, Paragraph, Card } from 'evergreen-ui';

import useEditorState from './dnd/use-state';
import Properties from './editor-core/properties';
import componentMapper from './evergreen-component-mapper/component-mapper';

const PropertiesCard: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const state = useEditorState()

    if (!state.selectedComponent) {
        return <Pane padding={16} borderBottom="muted">
            <Heading size={600}>No component</Heading>
            <Paragraph size={400} color="muted">
                No component is selected
            </Paragraph>
        </Pane>
    }

    return <Pane>
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
            <Pane padding={16} borderBottom="muted">
                <Heading size={600}>
                    {state.selectedComponent}
                </Heading>
                <Paragraph size={400} color="muted">
                    Edit field properties.
                </Paragraph>
            </Pane>
            <Pane display="flex" padding={8}>
                <Tablist>
                    {['Props', 'Validators'].map((tab, index) => (
                        <Tab
                            key={tab}
                            isSelected={selectedIndex === index}
                            onSelect={() => setSelectedIndex(index)}
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tablist>
            </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={8}>
            <Card
                backgroundColor="white"
                elevation={0}
                height={240}
                padding={8}
                display="flex"
            >
                <Properties
                    componentMapper={componentMapper}
                />
            </Card>
        </Pane>
    </Pane>
}

export default PropertiesCard;
