// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export const BasicDateInput = (props) => {
  const { id, label, format, value, dateProps, changeSelectedDate } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        margin="normal"
        format={format}
        label={label}
        id={id}
        data-cy={id + '-date-input'}
        onChange={changeSelectedDate}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        value={value}
        {...dateProps}
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
