// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Switch, FormControlLabel } from '@mui/material';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';

export const BasicToggleInput = (props) => {
  const { label, tooltipText, value, switchProps, changeSwitchType, ...otherProps } = props;

  if (switchProps.disabled)
    return (
      <BasicInputPlaceholder label={label} tooltipText={tooltipText} value={value ? 'ON' : 'OFF'} {...otherProps} />
    );

  return (
    <Grid item xs={3}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          value="value"
          control={
            <Switch
              color="secondary"
              onChange={(event) => changeSwitchType(event.target.checked)}
              checked={value}
              {...switchProps}
            />
          }
          label={label}
          labelPlacement="end"
        />
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
  );
};

BasicToggleInput.propTypes = {
  /**
   * BasicToggleInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
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
};
