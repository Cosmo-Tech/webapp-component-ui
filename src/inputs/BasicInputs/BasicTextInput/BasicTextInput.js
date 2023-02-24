// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';

export const BasicTextInput = (props) => {
  const { label, tooltipText, value, textFieldProps, changeTextField, ...otherProps } = props;

  if (textFieldProps.disabled)
    return <BasicInputPlaceholder label={label} tooltipText={tooltipText} value={value} {...otherProps} />;

  return (
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
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
    </Grid>
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
