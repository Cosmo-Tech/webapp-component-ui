// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import { TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers//LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { BasicInputWrapper } from '../BasicInputWrapper';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    maxWidth: '200px',
  },
}));

export const BasicDateInput = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, format, value, dateProps, changeSelectedDate, ...otherProps } = props;

  return (
    <BasicInputWrapper label={label} tooltipText={tooltipText} {...otherProps}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          className={classes.datePicker}
          inputFormat={format}
          disabled={dateProps.disabled}
          minDate={dateProps.minDate}
          maxDate={dateProps.maxDate}
          renderInput={(params) => <TextField variant="standard" {...params} />}
          id={id}
          onChange={changeSelectedDate}
          value={value}
        />
      </LocalizationProvider>
    </BasicInputWrapper>
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
  value: PropTypes.object.isRequired,
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
};

BasicDateInput.defaultProps = {
  format: 'MM/dd/yyyy',
};
