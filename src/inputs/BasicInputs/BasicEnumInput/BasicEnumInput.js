// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { MenuItem, Grid, Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicEnumInput = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, value, textFieldProps, enumValues, changeEnumField, isDirty, ...otherProps } = props;

  if (textFieldProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`enum-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value}
        {...otherProps}
      />
    );

  return (
    <Grid item xs={3}>
      <Stack
        data-cy={`enum-input-${id}`}
        direction="row"
        spacing={1}
        alignItems="center"
        className={isDirty ? classes.dirtyInput : classes.notDirtyInput}
      >
        <TextField
          variant="outlined"
          label={label}
          size="small"
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
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
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
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};
BasicEnumInput.defaultProps = {
  isDirty: false,
};
