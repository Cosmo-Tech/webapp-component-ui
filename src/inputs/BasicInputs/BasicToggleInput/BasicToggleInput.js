// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { Grid, Switch, Typography } from '@mui/material';

const PREFIX = 'BasicToggleInput';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },
}));

export const BasicToggleInput = (props) => {
  const { label, value, switchProps, changeSwitchType, containerProps, labelProps } = props;

  return (
    <StyledGrid container className={classes.root} {...containerProps}>
      <Grid item>
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item>
        <Switch
          color="secondary"
          onChange={(event) => changeSwitchType(event.target.checked)}
          checked={value}
          {...switchProps}
        />
      </Grid>
    </StyledGrid>
  );
};

BasicToggleInput.propTypes = {
  /**
   * BasicToggleInput's label
   */
  label: PropTypes.string,
  /**
   * BasicToggleInput's checked
   */
  value: PropTypes.bool.isRequired,
  /**
   * Function used when the user changes the BasicToggleInput value
   */
  changeSwitchType: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicToggleInput's toggle
   */
  switchProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicToggleInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicToggleInput's label
   */
  labelProps: PropTypes.object,
};

BasicToggleInput.defaultProps = {
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
