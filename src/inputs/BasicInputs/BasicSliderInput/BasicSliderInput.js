// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Grid, Slider, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';
import { TooltipInfo } from '../../../misc';

const getValueText = (value) => {
  return value.toString();
};

export const BasicSliderInput = (props) => {
  const {
    label,
    tooltipText,
    value,
    handleSliderValueChange,
    valueLabelDisplay,
    step,
    marks,
    min,
    max,
    orientation,
    disabled,
    sliderStyle,
    color,
    ...otherProps
  } = props;

  const getValue = (value) => {
    if (value == null || isNaN(value)) {
      return 0;
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
        label={label}
        tooltipText={tooltipText}
        value={getValue(value).toString()}
        {...otherProps}
      />
    );

  return (
    <Grid item xs={3}>
      <Stack>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color="textSecondary" id="slider-input-label">
            {label}
          </Typography>
          <TooltipInfo title={tooltipText} variant="small" />
        </Stack>
        <Slider
          value={getValue(value)}
          id="slider-root"
          data-cy="slider-input"
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
    </Grid>
  );
};

BasicSliderInput.propTypes = {
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
};

BasicSliderInput.defaultProps = {
  valueLabelDisplay: 'auto',
  step: 1,
  min: 0,
  max: 100,
  orientation: 'horizontal',
  disabled: true,
  color: 'secondary',
};
