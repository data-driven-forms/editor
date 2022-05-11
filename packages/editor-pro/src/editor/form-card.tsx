import React from 'react';
import { Pane, Heading, Paragraph, Card } from 'evergreen-ui';
import { FormSpy, useFormApi } from '@data-driven-forms/react-form-renderer';

const FormCard = () => {
	const formOptions = useFormApi();

	return <Pane position="sticky" top="40px" maxHeight="calc(100vh - 40px)" width="400px" display="flex" flexDirection="column">
		<Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
			<Pane padding={16} borderBottom="muted">
				<Pane display="flex">
					<Pane flex="1">
						<Heading size={600}>
                            Form state
						</Heading>
					</Pane>
				</Pane>
				<Paragraph size={400} color="muted">
                    Current form state.
				</Paragraph>
			</Pane>
		</Pane>
		<Pane flex="1" background="tint1" padding={8}>
			<Card
				backgroundColor="white"
				elevation={0}
				padding={8}
				display="flex"
			>
				<pre>
					{JSON.stringify(formOptions.getState(), null, 2)}
				</pre>
			</Card>
		</Pane>
	</Pane>;
};

const FormCardWrapper = () => <FormSpy>{() => <FormCard />}</FormSpy>;

export default FormCardWrapper;
