// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';

const useStyles = makeStyles(getCommonInputStyles);
dayjs.extend(utc);
dayjs.extend(timezone);

const TIME_ZONE = 'UTC';

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

  const onChange = useCallback(
    (newValue) => {
      changeSelectedDate(newValue == null ? newValue : new Date(newValue?.format()));
    },
    [changeSelectedDate]
  );

  if (dateProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`date-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value?.toLocaleDateString('en-US', { timeZone: TIME_ZONE }) ?? ''}
        {...otherProps}
      />
    );

  return (
    <Stack
      data-cy={`date-input-${id}`}
      direction="row"
      spacing={1}
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
      sx={{ alignItems: 'center' }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label={label}
          inputFormat={format}
          minDate={dayjs(dateProps.minDate)}
          maxDate={dayjs(dateProps.maxDate)}
          timezone={TIME_ZONE}
          slotProps={{
            textField: {
              id: `date-text-field-${id}`,
              variant: 'outlined',
              sx: { flexGrow: 1 },
              size: 'small',
              error: error?.message?.length > 0,
              helperText: error?.message ?? '',
            },
          }}
          id={`date-input-${id}`}
          onChange={onChange}
          value={dayjs(value)}
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
