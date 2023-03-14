// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  dirtyInput: {
    '& input': {
      fontWeight: 'bold',
    },
  },
}));
export const BasicTextInput = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, value, textFieldProps, changeTextField, isDirty, ...otherProps } = props;

  if (textFieldProps.disabled)
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
    <Grid item xs={3}>
      <Stack data-cy={`text-input-${id}`} direction="row" spacing={1} alignItems="center">
        <TextField
          className={isDirty ? classes.dirtyInput : ''}
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
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};
BasicTextInput.defaultProps = {
  isDirty: false,
};
