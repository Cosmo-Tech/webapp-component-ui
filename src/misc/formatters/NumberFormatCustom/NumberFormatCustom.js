// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import PropTypes from 'prop-types';
import React from 'react';
import { NumericFormat } from 'react-number-format';

export const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, max, min, ...other } = props;

  const valuesRange = (inputObj) => {
    const { value } = inputObj;
    if ((value === '-' && min < 0) || (min <= value && value <= max)) return inputObj;
  };

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      isAllowed={valuesRange}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      valueIsNumericString
    />
  );
});

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
