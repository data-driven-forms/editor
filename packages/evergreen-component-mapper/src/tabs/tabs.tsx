import React, { useState } from 'react';
import { Pane, Tab, Tablist, Card } from 'evergreen-ui';

import { useFormApi, Field } from '@data-driven-forms/react-form-renderer';

export interface TabField {
    name: string;
    title: string;
    fields: Field[];
}

export interface TabsProps {
    fields: TabField[];
}

const Tabs: React.FC<TabsProps> = ({ fields }) => {
    const formOptions = useFormApi();
    const [selectedIndex, setSelectedIndex] = useState(0)

    return <Pane>
        <Pane display="flex" padding={8}>
            <Tablist>
                {fields.map((tab, index) => (
                    <Tab
                        key={tab.title}
                        isSelected={selectedIndex === index}
                        onSelect={() => setSelectedIndex(index)}
                    >
                        {tab.title}
                    </Tab>
                ))}
            </Tablist>
        </Pane>
        <Pane flex="1" background="tint1" padding={8}>
            <Card
                backgroundColor="white"
                elevation={0}
                padding={8}
                display="flex"
            >
                {fields.map((tab, index) => (
                    <Pane hidden={index !== selectedIndex} width="100%" key={index}>
                        {formOptions.renderForm(tab.fields)}
                    </Pane>
                ))}
            </Card>
        </Pane>
    </Pane>
};

export default Tabs;