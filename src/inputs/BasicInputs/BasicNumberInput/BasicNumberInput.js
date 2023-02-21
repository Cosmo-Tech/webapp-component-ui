// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';
import React from 'react';
import { NumberFormatCustom } from '../../../misc/formatters';

export const BasicNumberInput = (props) => {
  const { label, tooltipText, value, textFieldProps, inputProps, changeNumberField, ...otherProps } = props;

  const disabled = textFieldProps.disabled;

  return (
    <>
      {disabled ? (
        <BasicInputWrapper
          label={label}
          tooltipText={tooltipText}
          disabled={disabled}
          value={value.toString()}
          {...otherProps}
        />
      ) : (
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              {...textFieldProps}
              sx={{ flexGrow: 1 }}
              variant="outlined"
              label={label}
              size="small"
              value={value}
              onChange={(event) => changeNumberField(parseFloat(event.target.value))}
              inputProps={inputProps}
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
            />
            <BasicInputWrapper
              label={label}
              tooltipText={tooltipText}
              disabled={disabled}
              value={value.toString()}
              {...otherProps}
            />
          </Stack>
        </Grid>
      )}
    </>
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
};

BasicNumberInput.defaultProps = {
  inputProps: {
    min: -9999,
    max: 9999,
  },
};
