// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  datePicker: {
    maxWidth: '200px',
  },
}));

export const BasicDateInput = (props) => {
  const classes = useStyles();
  const { id, label, format, value, dateProps, changeSelectedDate, ...otherProps } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        className={classes.datePicker}
        disableToolbar
        variant="inline"
        margin="normal"
        format={format}
        label={label}
        id={id}
        onChange={changeSelectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        value={value}
        {...dateProps}
        {...otherProps}
      />
    </MuiPickersUtilsProvider>
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
