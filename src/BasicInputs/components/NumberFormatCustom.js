// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, max, min, ...other } = props;

  const valuesRange = (inputObj) => {
    const { value } = inputObj;
    if (min <= value && value <= max) return inputObj;
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
          },
        });
      }}
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NumberFormatCustom;
