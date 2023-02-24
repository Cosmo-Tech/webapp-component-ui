// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { NumberFormatCustom } from '../../../misc/formatters';
import { TooltipInfo } from '../../../misc/TooltipInfo';

export const BasicNumberInput = (props) => {
  const { label, tooltipText, value, textFieldProps, inputProps, changeNumberField, ...otherProps } = props;

  if (textFieldProps.disabled)
    return <BasicInputPlaceholder label={label} tooltipText={tooltipText} value={value.toString()} {...otherProps} />;

  return (
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
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
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
