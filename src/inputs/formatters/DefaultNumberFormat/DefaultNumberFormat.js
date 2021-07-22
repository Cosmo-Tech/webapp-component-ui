// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

function DefaultNumberFormat (props) {
  const { inputRef, onChange, max, min, ...other } = props;

  const valuesRange = (inputObj) => {
    const { value } = inputObj;
    if ((value === '-' && min < 0) || (min <= value && value <= max)) return inputObj;
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isAllowed={valuesRange}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      isNumericString
    />
  );
}

DefaultNumberFormat.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number
};

export default DefaultNumberFormat;
