// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';

export const BasicDateInput = (props) => {
  const { id, label, format, value, dateProps, changeSelectedDate } = props;

  return (
    <DatePicker
      id={id}
      data-cy={id + '-date-input'}
      label={label}
      value={value}
      onChange={changeSelectedDate}
      inputFormat={format}
      renderInput={(params) => <TextField label="Change date" {...params} />}
      {...dateProps}
    />
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
