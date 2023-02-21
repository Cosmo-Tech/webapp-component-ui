// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Switch, FormControlLabel } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';

export const BasicToggleInput = (props) => {
  const { label, tooltipText, value, switchProps, changeSwitchType, ...otherProps } = props;

  const disabled = switchProps.disabled;

  return (
    <>
      {disabled ? (
        <BasicInputWrapper
          label={label}
          tooltipText={tooltipText}
          disabled={disabled}
          value={value ? 'ON' : 'OFF'}
          {...otherProps}
        />
      ) : (
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
            <BasicInputWrapper
              label={label}
              tooltipText={tooltipText}
              disabled={disabled}
              value={value ? 'ON' : 'OFF'}
              {...otherProps}
            />
          </Stack>
        </Grid>
      )}
    </>
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
