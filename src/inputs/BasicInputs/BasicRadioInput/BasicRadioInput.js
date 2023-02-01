// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';

export const BasicRadioInput = (props) => {
  const {
    label,
    tooltipText,
    value,
    textFieldProps,
    changeRadioOption,
    enumValues,
    row,
    disabled,
    containerProps,
    labelProps,
    radioStyle,
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
      {disabled ? (
        <TextField
          data-cy="text-field"
          value={enumValues.find((valueOption) => valueOption.key === value).value}
          disabled
          {...textFieldProps}
        />
      ) : (
        <FormControl>
          <RadioGroup
            row={row}
            data-cy="radio-group"
            value={value}
            onChange={(event) => changeRadioOption(event.target.value)}
          >
            {enumValues.map((option) => {
              return (
                <FormControlLabel
                  key={option.key}
                  value={option.key}
                  control={
                    <Radio data-cy={'radio-button-' + option.value} style={radioStyle} size="small" color="primary" />
                  }
                  label={option.value}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      )}
    </BasicInputWrapper>
  );
};

BasicRadioInput.propTypes = {
  /**
   * BasicRadioInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicRadioInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Additional props that you can specify for the BasicRadioInput's textField that displays the enum value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Function used when the user changes the BasicRadioInput value
   */
  changeRadioOption: PropTypes.func.isRequired,
  /**
   * List of all possible BasicRadioInput values. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Defines if the radio group is displayed as a row or as a column.
   *  - true : the group is displayed as a compact row
   *  - false : the button is displayed as a column
   */
  row: PropTypes.bool,
  /**
   * Defines the possibility of changing value
   */
  disabled: PropTypes.bool,
  /**
   * Additional props that you can specify for the BasicRadioInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicRadioInput's label
   */
  labelProps: PropTypes.object,
  /**
   * Additional prop to override radio's css
   */
  radioStyle: PropTypes.object,
};

BasicRadioInput.defaultProps = {
  row: true,
  disabled: true,
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2,
  },
  labelProps: {
    variant: 'subtitle2',
  },
};
