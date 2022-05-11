import React from 'react';

import { BacklinkIcon, Link as ELink, Pane, Text } from 'evergreen-ui';

export interface LinkProps {
    name: string;
    href: string;
    label: string;
    description?: string;
    isFirst?: boolean;
};

const Link: React.FC<LinkProps> = ({ href, label, description, isFirst }) => {
	return (
		<Pane maxWidth="340px" marginBottom={6} {...(isFirst && { marginTop: 12 })} >
			<ELink
				target="__blank"
				rel="noreferrer noopener"
				href={href}
				marginRight={6}
			>
				<BacklinkIcon marginRight={6} />
				{label}
			</ELink>
			<Text>
				{description}
			</Text>
		</Pane>
	);
};

export default Link;
