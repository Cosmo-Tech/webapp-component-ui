// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';
import React from 'react';
import { NumberFormatCustom } from '../../../misc/formatters';

export const BasicNumberInput = (props) => {
  const {
    label,
    tooltipText,
    value,
    textFieldProps,
    inputProps,
    changeNumberField,
    containerProps,
    labelProps,
    ...otherProps
  } = props;

  return (
    <BasicInputWrapper
      label={label}
      tooltipText={tooltipText}
      containerProps={containerProps}
      labelProps={labelProps}
      {...otherProps}
    >
      <TextField
        {...textFieldProps}
        value={value}
        onChange={(event) => changeNumberField(parseFloat(event.target.value))}
        inputProps={inputProps}
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
      />
    </BasicInputWrapper>
  );
};

BasicNumberInput.propTypes = {
  /**
   * BasicNumberInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicNumberInput's value
   */
  value: PropTypes.number.isRequired,
  /**
   * Function used when the user changes the BasicNumberInput value
   */
  changeNumberField: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicNumberInput's textField that displays the number value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's Grid container that displays both label and input
   */
  inputProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicNumberInput's label
   */
  labelProps: PropTypes.object,
};

BasicNumberInput.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2,
  },
  labelProps: {
    variant: 'subtitle2',
  },
  inputProps: {
    min: -9999,
    max: 9999,
  },
};
