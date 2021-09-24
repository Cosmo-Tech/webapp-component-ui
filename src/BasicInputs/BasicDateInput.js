// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

export const BasicDateInput = (props) => {
  const { label, format, value, dateProps, changeSelectedDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        margin="normal"
        format={format}
        label={label}
        onChange={changeSelectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
        value={value}
        {...dateProps}
      />
    </MuiPickersUtilsProvider>
  );
};

BasicDateInput.propTypes = {
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
  format: PropTypes.string.isRequired,
  /**
   * Function used when the user changes the BasicDateInput value
   */
  changeSelectedDate: PropTypes.func.isRequired,
  /**
   * Additional props that you can specified for the BasicDateInput's input
   */
  dateProps: PropTypes.object.isRequired
};
