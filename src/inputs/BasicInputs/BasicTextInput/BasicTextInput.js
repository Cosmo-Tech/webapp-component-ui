// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import { BasicInputWrapper } from '../BasicInputWrapper';
import PropTypes from 'prop-types';
import React from 'react';

export const BasicTextInput = (props) => {
  const { label, tooltipText, value, textFieldProps, changeTextField, ...otherProps } = props;

  const disabled = textFieldProps.disabled;

  return (
    <>
      {disabled ? (
        <BasicInputWrapper label={label} tooltipText={tooltipText} disabled={disabled} value={value} {...otherProps} />
      ) : (
        <Grid item xs={3}>
          <Stack direction="row" spacing={1} alignItems="center">
            <TextField
              {...textFieldProps}
              variant="outlined"
              label={label}
              size="small"
              value={value}
              sx={{ flexGrow: 1 }}
              onChange={(event) => changeTextField(event.target.value)}
            />
            <BasicInputWrapper
              label={label}
              tooltipText={tooltipText}
              disabled={disabled}
              value={value}
              {...otherProps}
            />
          </Stack>
        </Grid>
      )}
    </>
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
};
