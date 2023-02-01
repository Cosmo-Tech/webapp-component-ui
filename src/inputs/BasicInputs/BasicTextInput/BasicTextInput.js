// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';
import React from 'react';

export const BasicTextInput = (props) => {
  const { label, tooltipText, value, textFieldProps, changeTextField, containerProps, labelProps, ...otherProps } =
    props;

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
        variant="standard"
        value={value}
        onChange={(event) => changeTextField(event.target.value)}
      />
    </BasicInputWrapper>
  );
};

BasicTextInput.propTypes = {
  /**
   * BasicTextInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicTextInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Function used when the user changes the BasicTextInput value
   */
  changeTextField: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicTextInput's textField that displays the text value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicTextInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicTextInput's label
   */
  labelProps: PropTypes.object,
};

BasicTextInput.defaultProps = {
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
