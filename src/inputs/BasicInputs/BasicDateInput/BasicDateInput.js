// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicDateInput = (props) => {
  const { id, label, tooltipText, format, value, dateProps, changeSelectedDate, isDirty, error, ...otherProps } = props;
  const classes = useStyles();
  if (dateProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`date-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value?.toLocaleDateString() ?? ''}
        {...otherProps}
      />
    );

  return (
    <Grid item id={dateProps.id} xs={3}>
      <Stack
        data-cy={`date-input-${id}`}
        direction="row"
        spacing={1}
        alignItems="center"
        className={isDirty ? classes.dirtyInput : classes.notDirtyInput}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={label}
            inputFormat={format}
            minDate={dateProps.minDate}
            maxDate={dateProps.maxDate}
            renderInput={({ error: _, ...params }) => (
              <TextField
                id={`date-text-field-${id}`}
                variant="outlined"
                sx={{ flexGrow: 1 }}
                size="small"
                error={error?.message?.length > 0}
                helperText={error?.message ?? ''}
                {...params}
              />
            )}
            id={`date-input-${id}`}
            onChange={changeSelectedDate}
            value={value ?? new Date(undefined)}
          />
        </LocalizationProvider>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
  );
};

BasicDateInput.propTypes = {
  /**
   * BasicDateInput's id
   */
  id: PropTypes.string.isRequired,
  /**
   * BasicDateInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicDateInput's value
   */
  value: PropTypes.object,
  /**
   * BasicDateInput's date format
   */
  format: PropTypes.string,
  /**
   * Function used when the user changes the BasicDateInput value
   */
  changeSelectedDate: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicDateInput's input
   */
  dateProps: PropTypes.object.isRequired,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
  /**
   * Error object that contains the type of error and its message
   */
  error: PropTypes.object,
};

BasicDateInput.defaultProps = {
  format: 'MM/dd/yyyy',
  isDirty: false,
};
