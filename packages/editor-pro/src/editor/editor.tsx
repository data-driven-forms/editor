import React from 'react';

import { Menu, Pane, majorScale } from 'evergreen-ui';

import MenuItem, { MenuItemProps } from '@data-driven-forms/editor-core/menu-item';
import CoreEditor from '@data-driven-forms/editor-core/editor';
import TopNav from './top-nav';
import EditorContent from './editor-content';
import PropertiesCard from './properties-card';
import { Field, FormRenderer, ComponentMapper, Schema, FormTemplateRenderProps } from '@data-driven-forms/react-form-renderer';
import ContainerWrapper from './container-wrapper';
import ComponentWrapper from './component-wrapper';
import Code from './code';
import { AnyObject } from '../types';

const MenuItemWrapper: React.FC<MenuItemProps> = (props) => <MenuItem Component={Menu.Item} {...props} data-cy={props.component}/>;

export interface EditorProps {
	componentMapper: ComponentMapper;
	componentInitialProps?: AnyObject;
	fields: Field[];
	initialSchema?: Schema;
	FormTemplate: React.ComponentType<FormTemplateRenderProps>;
}

const Editor = ({ componentMapper, componentInitialProps, fields, initialSchema, FormTemplate }: EditorProps) => {
	return (
		<Pane
			display="flex"
			flexDirection="column"
			height="100vh"
		>
			<CoreEditor
				DropCursorProps={{
					CursorProps: {
						className: 'drop-cursor'
					}
				}}
				initialSchema={initialSchema}
			>
				<TopNav />
				<Pane flex="1" width="100%" display="flex">
					<Pane
						display="flex"
						position="sticky"
						flexDirection="column"
						overflowY="auto"
						maxHeight="calc(100vh - 48px)"
						paddingX={majorScale(1)}
						top="48px"
					>
						<Menu>
							<Menu.Group title="Components">
								{Object.keys(componentMapper).map(key => <MenuItemWrapper key={key} component={key} componentInitialProps={componentInitialProps?.[key]}>
									{key.replaceAll('-', ' ')}
								</MenuItemWrapper>)}
							</Menu.Group>
						</Menu>
					</Pane>
					<Pane flex="1" display="flex" flexDirection="column">
						<FormRenderer
							schema={{ fields: [] }}
							onSubmit={() => undefined}
							componentMapper={componentMapper}
							FormTemplate={() => <ContainerWrapper isRoot Component={ComponentWrapper} />}
						/>
						<Code />
					</Pane>
					<PropertiesCard fields={fields} />
					<EditorContent fields={fields} componentMapper={componentMapper} FormTemplate={FormTemplate} />
				</Pane>
			</CoreEditor>
		</Pane>
	);
};

export default Editor;
