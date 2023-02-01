// Copyright (c) Cosmo Tech.
// Licenced under the MIT licence.

import { Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FadingTooltip } from '../../../misc';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  label: {
    display: 'flex',
  },
  iconTooltip: {
    marginLeft: '2px',
    color: theme.palette.text.secondary,
  },
}));

export const BasicInputWrapper = ({ children, label, tooltipText, containerProps, labelProps, ...otherProps }) => {
  const classes = useStyles();

  return (
    <Grid container alignContent="flex-start" className={classes.root} {...containerProps} {...otherProps}>
      <Grid item className={classes.label}>
        <Typography {...labelProps}>{label}</Typography>
        {tooltipText && (
          <FadingTooltip title={tooltipText}>
            <InfoOutlinedIcon className={classes.iconTooltip} fontSize="inherit" />
          </FadingTooltip>
        )}
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};

BasicInputWrapper.propTypes = {
  /**
   * Component children
   */
  children: PropTypes.node,
  /**
   * Basic input's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Additional props that you can specify for the child component Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the the child component label
   */
  labelProps: PropTypes.object,
};

BasicInputWrapper.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2,
  },
  labelProps: {
    variant: 'subtitle2',
  },
};
