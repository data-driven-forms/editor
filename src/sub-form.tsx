import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Grid } from '@mui/material';

import { AnyObject, useFormApi } from '@data-driven-forms/react-form-renderer';

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
      <Grid item xs={12} container rowSpacing={2} {...ItemsGridProps}>
        <div style={{background: 'red', height: 500, width: 200}} />
      </Grid>
    </StyledGrid>
  );
};

export default SubForm;
