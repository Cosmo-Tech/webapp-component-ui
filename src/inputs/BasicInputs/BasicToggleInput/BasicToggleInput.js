// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, Switch, FormControlLabel } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicToggleInput = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, value, switchProps, changeSwitchType, isDirty, ...otherProps } = props;

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
    <Grid item xs={3}>
      <Stack
        data-cy={`toggle-input-${id}`}
        direction="row"
        spacing={1}
        alignItems="center"
        className={isDirty ? classes.dirtyInput : classes.notDirtyInput}
      >
        <FormControlLabel
          value="value"
          control={
            <Switch
              color="primary"
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
};
BasicToggleInput.defaultProps = {
  isDirty: false,
};
