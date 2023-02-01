// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { MenuItem, TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';
import React from 'react';

export const BasicEnumInput = (props) => {
  const {
    label,
    tooltipText,
    value,
    textFieldProps,
    enumValues,
    changeEnumField,
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
        data-cy="text_field"
        variant="standard"
        select
        value={value}
        {...textFieldProps}
        onChange={(event) => {
          return changeEnumField(event.target.value);
        }}
      >
        {enumValues.map((option) => (
          <MenuItem key={option.key} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </TextField>
    </BasicInputWrapper>
  );
};

BasicEnumInput.propTypes = {
  /**
   * BasicEnumInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicEnumInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Additional props that you can specify for the BasicEnumInput's textField that displays the enum value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Function used when the user changes the BasicEnumInput value
   */
  changeEnumField: PropTypes.func.isRequired,
  /**
   * List of all possible BasicEnumInput values. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Additional props that you can specify for the BasicEnumInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicEnumInput's label
   */
  labelProps: PropTypes.object,
};

BasicEnumInput.defaultProps = {
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
