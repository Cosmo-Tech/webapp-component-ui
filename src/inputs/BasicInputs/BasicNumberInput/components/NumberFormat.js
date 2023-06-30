// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import PropTypes from 'prop-types';
import React from 'react';
import { NumericFormat } from 'react-number-format';

export const NumberFormat = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, max, min, ...other } = props;

  const valuesRange = ({ floatValue }) => {
    const isBelowMin = min != null && floatValue != null && floatValue < min;
    const isAboveMax = max != null && floatValue != null && floatValue > max;
    return !isBelowMin && !isAboveMax;
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

NumberFormat.propTypes = {
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};
