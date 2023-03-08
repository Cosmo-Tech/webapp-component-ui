// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Radio, RadioGroup, FormControl, FormControlLabel, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';

export const BasicRadioInput = (props) => {
  const {
    id,
    label,
    tooltipText,
    value,
    textFieldProps,
    changeRadioOption,
    enumValues,
    row,
    radioStyle,
    isDirty,
    ...otherProps
  } = props;

  if (textFieldProps.disabled) {
    const valueString = enumValues.find((valueOption) => valueOption.key === value).value;
    return (
      <BasicInputPlaceholder
        id={`radio-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={valueString}
        {...otherProps}
      />
    );
  }

  return (
    <Grid item xs={3}>
      <Stack data-cy={`radio-input-${id}`}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" color="textSecondary" id="slider-input-label">
            {label}
          </Typography>
          <TooltipInfo title={tooltipText} variant="small" />
        </Stack>
        <FormControl>
          <RadioGroup
            sx={{ ml: 1 }}
            row={row}
            data-cy="radio-group"
            value={value}
            onChange={(event) => changeRadioOption(event.target.value)}
          >
            {enumValues.map((option) => {
              return (
                <FormControlLabel
                  key={option.key}
                  value={option.key}
                  control={
                    <Radio data-cy={`radio-button-${option.value}`} style={radioStyle} size="small" color="primary" />
                  }
                  label={option.value}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      </Stack>
    </Grid>
  );
};

BasicRadioInput.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * BasicRadioInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicRadioInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Additional props that you can specify for the BasicRadioInput's textField that displays the enum value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Function used when the user changes the BasicRadioInput value
   */
  changeRadioOption: PropTypes.func.isRequired,
  /**
   * List of all possible BasicRadioInput values. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Defines if the radio group is displayed as a row or as a column.
   *  - true : the group is displayed as a compact row
   *  - false : the button is displayed as a column
   */
  row: PropTypes.bool,
  /**
   * Additional prop to override radio's css
   */
  radioStyle: PropTypes.object,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};

BasicRadioInput.defaultProps = {
  row: true,
  isDirty: false,
};
