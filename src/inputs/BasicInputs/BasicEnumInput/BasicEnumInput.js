// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, MenuItem, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';

const PREFIX = 'BasicEnumInput';

const classes = {
  root: `${PREFIX}-root`,
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
  },
}));

export const BasicEnumInput = (props) => {
  const { label, value, textFieldProps, enumValues, changeEnumField } = props;
  const { containerProps, labelProps } = props;

  return (
    <StyledGrid container className={classes.root} {...containerProps}>
      <Grid item>
        <Typography {...labelProps}>{label}</Typography>
      </Grid>
      <Grid item>
        <TextField
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
      </Grid>
    </StyledGrid>
  );
};

BasicEnumInput.propTypes = {
  /**
   * BasicEnumInput's label
   */
  label: PropTypes.string,
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
