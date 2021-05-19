// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import PropTypes from 'prop-types';
import React from 'react';
import NumberFormat from 'react-number-format';

function NumberFormatCustom(props) {
  const { inputRef, onChange, max, min, ...other } = props;

  const withValueLimit = (inputObj) => {
    const { value } = inputObj;
    if (min <= value && value <= max) return inputObj;
  };

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      isAllowed={withValueLimit}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default NumberFormatCustom;
