// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { NumberFormatCustom } from '../../../misc/formatters';
import { TooltipInfo } from '../../../misc/TooltipInfo';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicNumberInput = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, value, textFieldProps, inputProps, changeNumberField, isDirty, ...otherProps } =
    props;

  const [textInput, setTextInput] = useState(value.toString());
  useEffect(() => {
    if (textInput && parseFloat(textInput) !== value) setTextInput(value.toString());
  }, [value, textInput]);

  const handleChangeEvent = useCallback(
    (event) => {
      setTextInput(event.target.value);
      const inputValueAsNumber = parseFloat(event.target.value);
      if (inputValueAsNumber !== value) changeNumberField(inputValueAsNumber);
    },
    [value, changeNumberField]
  );

  const handleBlurEvent = useCallback(() => {
    const valueAsString = value.toString();
    if (valueAsString !== textInput) {
      setTextInput(valueAsString);
    }
  }, [value, textInput, setTextInput]);

  if (textFieldProps.disabled)
    return (
      <BasicInputPlaceholder
        id={`number-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={value.toString()}
        {...otherProps}
      />
    );

  return (
    <Grid item xs={3}>
      <Stack
        data-cy={`number-input-${id}`}
        direction="row"
        spacing={1}
        alignItems="center"
        className={isDirty ? classes.dirtyInput : classes.notDirtyInput}
      >
        <TextField
          sx={{ flexGrow: 1 }}
          variant="outlined"
          label={label}
          size="small"
          value={textInput}
          onChange={handleChangeEvent}
          onBlur={handleBlurEvent}
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
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
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
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};

BasicNumberInput.defaultProps = {
  inputProps: {
    min: -9999,
    max: 9999,
  },
  isDirty: false,
};
