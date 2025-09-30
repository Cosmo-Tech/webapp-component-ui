// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Slider, Stack, Typography } from '@mui/material';
import { TooltipInfo } from '../../../misc';
import { getCommonInputSxProps } from '../../style';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';

const getValueText = (value) => {
  return value.toString();
};

export const BasicSliderInput = (props) => {
  const {
    id,
    label,
    tooltipText,
    value,
    handleSliderValueChange,
    valueLabelDisplay = 'auto',
    step = 1,
    marks,
    min: minValue = 0,
    max: maxValue = 100,
    orientation = 'horizontal',
    disabled = true,
    sliderStyle,
    color = 'secondary',
    isDirty,
    ...otherProps
  } = props;

  const min = typeof minValue === 'number' ? minValue : 0;
  const max = typeof maxValue === 'number' ? maxValue : 100;

  const getValue = (value) => {
    if (typeof value !== 'number' || isNaN(value)) {
      return min;
    }
    return value;
  };

  const getMarks = (marks) => {
    return marks !== undefined
      ? marks
      : [
          { value: min, label: min.toString() },
          { value: max, label: max.toString() },
        ];
  };

  if (disabled)
    return (
      <BasicInputPlaceholder
        id={`slider-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={getValue(value).toString()}
        {...otherProps}
      />
    );

  return (
    <Stack data-cy={`slider-input-${id}`} sx={getCommonInputSxProps(isDirty)}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Typography variant="subtitle2" id="slider-input-label" color="textSecondary" sx={{ fontWeight: 'bold' }}>
          {label}
        </Typography>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
      <Slider
        value={getValue(value)}
        sx={sliderStyle}
        color={color}
        size="small"
        onChange={(event, newValue) => handleSliderValueChange(parseFloat(newValue))}
        getAriaValueText={getValueText}
        valueLabelDisplay={valueLabelDisplay}
        step={step}
        marks={getMarks(marks)}
        min={min}
        max={max}
        orientation={orientation}
      />
    </Stack>
  );
};

BasicSliderInput.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * BasicSliderInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicSliderInput's value
   */
  value: PropTypes.number,
  /**
   * Function used when the user changes the BasicSliderInput value
   */
  handleSliderValueChange: PropTypes.func.isRequired,
  /**
   * Controls when the value label is displayed:
   * auto (when the thumb is hovered or focused) - default option
   * on (displayed persistently)
   * off (never displayed)
   */
  valueLabelDisplay: PropTypes.string,
  /**
   * Number with which slider can step through values (1 by default)
   */
  step: PropTypes.number,
  /**
   * Defines whether step marks are displayed on slider. Default marks are min and max values,
   * to set some specific marks to be displayed, you can provide an array of values.
   * Set to true, it creates a mark on each step of the slider.
   */
  marks: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
  /**
   * Minimal value for slider component (0 by default)
   */
  min: PropTypes.number,
  /**
   * Maximum value for slider component (100 by default)
   */
  max: PropTypes.number,
  /**
   * Defines orientation - horizontal (default) or vertical - of the slider
   */
  orientation: PropTypes.string,
  /**
   * Defines the possibility of changing value
   */
  disabled: PropTypes.bool,
  /**
   * Additional prop to override slider's css, e.g., width (200 px by default)
   */
  sliderStyle: PropTypes.object,
  /**
   * Color of the slider: primary (default color) or secondary
   */
  color: PropTypes.string,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};
