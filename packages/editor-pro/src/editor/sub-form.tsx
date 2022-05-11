import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

import { AnyObject } from '@data-driven-forms/react-form-renderer';
import ContainerWrapper from './container-wrapper';
import ComponentWrapper from './component-wrapper';

const PREFIX = 'SubForm';

const classes = {
	grid: `${PREFIX}-grid`,
};

const StyledGrid = styled(Grid)(() => ({
	[`&.${classes.grid}`]: {
		paddingRight: 0,
		paddingLeft: 0,
	},
}));

interface SubformProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    component?: string;
    TitleGridProps?: AnyObject;
    TitleProps?: AnyObject;
    DescriptionProps?: AnyObject;
    DescriptionGridProps?: AnyObject;
    ItemsGridProps?: AnyObject;
    name: string;
}

const SubForm: React.FC<SubformProps> = ({
	title,
	description,
	component,
	TitleGridProps,
	TitleProps,
	DescriptionProps,
	DescriptionGridProps,
	ItemsGridProps,
	...rest
}) => {
	return (
		<StyledGrid item xs={12} container className={classes.grid} {...rest}>
			{title && (
				<Grid item xs={12} {...TitleGridProps}>
					<Typography variant="h5" {...TitleProps}>
						{title}
					</Typography>
				</Grid>
			)}
			{description && (
				<Grid item xs={12} {...DescriptionGridProps}>
					<Typography paragraph {...DescriptionProps}>
						{description}
					</Typography>
				</Grid>
			)}
			<Grid item xs={12} container rowSpacing={2} {...ItemsGridProps} sx={{paddingTop: 2}}>
				<ContainerWrapper Component={ComponentWrapper} id={rest.name} />
			</Grid>
		</StyledGrid>
	);
};

export default SubForm;
