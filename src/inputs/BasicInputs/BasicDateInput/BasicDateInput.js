// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateUtils } from '@cosmotech/core';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

const _computeInternalDate = (value, reverseTimezoneOffset) => {
  if (value == null) return value;
  return reverseTimezoneOffset ? DateUtils.addLocalDateToUTCOffset(value) : value;
};

const _getInternalDateToReturnToParent = (value, reverseTimezoneOffset) => {
  if (value == null) return value;
  return reverseTimezoneOffset ? DateUtils.addUTCToLocalDateOffset(value) : value;
};

export const BasicDateInput = (props) => {
  const {
    id,
    label,
    tooltipText,
    format,
    value,
    dateProps,
    changeSelectedDate,
    isDirty,
    error,
    reverseTimezoneOffset,
    size,
    ...otherProps
  } = props;
  const classes = useStyles();

  // DesktopDatePicker always work in users' local time, meaning that dates provided as UTC may be displayed as a
  // different day based on users' timezeone offset. For uses cases that only need tha "date" part withtout "time", we
  // should ignore timezones and must thus add an internal state to reverse the timezone offset (this behavior is
  // enabled only if reverseTimezoneOffset is set to true)
  const [internalDate, setInternalDate] = useState(_computeInternalDate(value, reverseTimezoneOffset));
  const minDate = useMemo(
    () => _computeInternalDate(dateProps.minDate, reverseTimezoneOffset),
    [dateProps, reverseTimezoneOffset]
  );
  const maxDate = useMemo(
    () => _computeInternalDate(dateProps.maxDate, reverseTimezoneOffset),
    [dateProps, reverseTimezoneOffset]
  );

  useEffect(() => {
    setInternalDate(_computeInternalDate(value, reverseTimezoneOffset));
  }, [reverseTimezoneOffset, value]);

  const onChange = useCallback(
    (newValue) => {
      setInternalDate(newValue);
      changeSelectedDate(_getInternalDateToReturnToParent(newValue, reverseTimezoneOffset));
    },
    [reverseTimezoneOffset, changeSelectedDate]
  );

  if (dateProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`date-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={internalDate?.toLocaleDateString() ?? ''}
        {...otherProps}
      />
    );

  return (
    <Stack
      data-cy={`date-input-${id}`}
      direction="row"
      spacing={1}
      alignItems="center"
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat={format}
          minDate={minDate}
          maxDate={maxDate}
          renderInput={({ error: _, ...params }) => (
            <TextField
              id={`date-text-field-${id}`}
              variant="outlined"
              sx={{ flexGrow: 1 }}
              size={size}
              error={error?.message?.length > 0}
              helperText={error?.message ?? ''}
              {...params}
            />
          )}
          id={`date-input-${id}`}
          onChange={onChange}
          value={internalDate ?? new Date(undefined)}
        />
      </LocalizationProvider>
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
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
  /**
   * Size of the TextField: small (default value), medium or large
   */
  size: PropTypes.string,
  /**
   * Boolean value that defines whether the component should prevent the date picker component to convert dates in local
   * time by adding a "reverse offset" to the input value and store it in an internal state. If the input of value prop
   * is a UTC date, and you want to work only with UTC dates, then you should set reverseTimezoneOffset to true to have
   * a consistent behavior in all timezones.
   */
  reverseTimezoneOffset: PropTypes.bool,
};

BasicDateInput.defaultProps = {
  format: 'MM/dd/yyyy',
  reverseTimezoneOffset: false,
  size: 'small',
};
