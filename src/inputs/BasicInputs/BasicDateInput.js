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

const BasicDateInput = (props) => {
  const { label, dateProps, changeSelectedDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        onChange={changeSelectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
        {...dateProps}
      />
    </MuiPickersUtilsProvider>
  );
};

BasicDateInput.propTypes = {
  label: PropTypes.string.isRequired,
  changeSelectedDate: PropTypes.func.isRequired,
  dateProps: PropTypes.object.isRequired
};

export default BasicDateInput;
