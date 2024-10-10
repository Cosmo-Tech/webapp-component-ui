// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicTextInput = (props) => {
  const classes = useStyles();

  const { id, label, tooltipText, value, textFieldProps, changeTextField, isDirty, error, size, ...otherProps } = props;

  if (textFieldProps?.disabled)
    return (
      <BasicInputPlaceholder
        id={`text-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value}
        {...otherProps}
      />
    );

  return (
    <Stack
      data-cy={`text-input-${id}`}
      direction="row"
      spacing={1}
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
      sx={{ alignItems: 'center' }}
    >
      <TextField
        {...textFieldProps}
        variant="outlined"
        label={label}
        size={size}
        value={value}
        sx={{ flexGrow: 1 }}
        onChange={(event) => changeTextField(event.target.value)}
        error={!!error}
        helperText={error?.message ?? ''}
      />
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
  );
};

BasicTextInput.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
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
   * Size of the TextField: small (default value), medium or large
   */
  size: PropTypes.string,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
  /**
   * Error object that contains the type of error and its message
   */
  error: PropTypes.object,
};
BasicTextInput.defaultProps = {
  size: 'small',
};
