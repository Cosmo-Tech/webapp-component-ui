// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { Grid, Stack, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { NumberFormat } from './components/NumberFormat';
import { TooltipInfo } from '../../../misc/TooltipInfo';
import { getCommonInputStyles } from '../../style';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicNumberInput = (props) => {
  const classes = useStyles();
  const {
    id,
    label,
    tooltipText,
    value,
    textFieldProps,
    inputProps,
    changeNumberField,
    isDirty,
    error,
    ...otherProps
  } = props;

  const convToStringValue = useCallback((numValue) => {
    if (isNaN(numValue)) return '';

    const wideFormattedStr = numValue?.toLocaleString('fullwide', { useGrouping: false, maximumFractionDigits: 15 });
    return wideFormattedStr.replace(',', '.'); // Replace first comma decimal separator by dot
  }, []);

  const [textInput, setTextInput] = useState(convToStringValue(value));

  const setTextInputByValue = useCallback(() => {
    const stringValue = convToStringValue(value);
    if (textInput !== stringValue) {
      setTextInput(stringValue);
    }
  }, [convToStringValue, textInput, value]);

  const isFocused = useRef(false);
  useEffect(() => {
    if (!isFocused.current) setTextInputByValue();
  }, [setTextInputByValue]);

  const handleFocusEvent = useCallback(() => {
    isFocused.current = true;
  }, []);

  const handleChangeEvent = useCallback(
    (event) => {
      const textValue = event.target.value;
      const numValue = parseFloat(textValue);
      if (!isNaN(numValue)) {
        changeNumberField(numValue);
      } else {
        changeNumberField(null);
      }
      setTextInput(textValue);
    },
    [changeNumberField]
  );

  const handleBlurEvent = useCallback(() => {
    isFocused.current = false;
    setTextInputByValue();
  }, [setTextInputByValue]);

  if (textFieldProps?.disabled) {
    isFocused.current = false;
    return (
      <BasicInputPlaceholder
        id={`number-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={convToStringValue(value)}
        {...otherProps}
      />
    );
  }

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
          id={`number-input-${id}`}
          sx={{ flexGrow: 1 }}
          variant="outlined"
          label={label}
          size="small"
          value={textInput}
          onChange={handleChangeEvent}
          onBlur={handleBlurEvent}
          onFocus={handleFocusEvent}
          inputProps={inputProps}
          InputProps={{
            inputComponent: NumberFormat,
          }}
          error={!!error}
          helperText={error?.message ?? ''}
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
  /**
   * Error object that contains the type of error and its message
   */
  error: PropTypes.object,
};

BasicNumberInput.defaultProps = {
  isDirty: false,
};
