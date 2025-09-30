// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Switch, FormControlLabel, FormHelperText, FormControl } from '@mui/material';
import { TooltipInfo } from '../../../misc';
import { getCommonInputSxProps } from '../../style';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';

export const BasicToggleInput = (props) => {
  const { id, label, tooltipText, value, switchProps, changeSwitchType, isDirty, error, ...otherProps } = props;

  if (switchProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`toggle-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value ? 'ON' : 'OFF'}
        {...otherProps}
      />
    );

  return (
    <FormControl data-cy={`toggle-form-control-${id}`} sx={getCommonInputSxProps(isDirty)}>
      <Stack data-cy={`toggle-input-${id}`} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
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
      <FormHelperText error={error?.message?.length > 0}>{error?.message ?? ''}</FormHelperText>
    </FormControl>
  );
};

BasicToggleInput.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
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
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
  /**
   * Error object that contains the type of error and its message
   */
  error: PropTypes.object,
};
