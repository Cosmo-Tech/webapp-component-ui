// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { MenuItem, Grid, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';

export const BasicEnumInput = (props) => {
  const { label, tooltipText, value, textFieldProps, enumValues, changeEnumField, ...otherProps } = props;

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
          data-cy={`${otherProps.dataCy}-textField`}
          sx={{ flexGrow: 1 }}
          select
          value={value}
          onChange={(event) => {
            return changeEnumField(event.target.value);
          }}
        >
          {enumValues.map((option) => (
            <MenuItem key={option.key} value={option.key} data-cy={option.key}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TooltipInfo title={tooltipText} size="small" />
      </Stack>
    </Grid>
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
};
