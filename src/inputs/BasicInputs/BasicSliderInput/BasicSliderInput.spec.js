/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicSliderInput } from './BasicSliderInput';
import { SliderTesting } from '../../../../tests/MuiComponentsTesting/SliderTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { TypographyTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();

const otherProps = {
  dataCy: 'stock',
};
const defaultProps = {
  label: 'Stock',
  value: 5,
  valueLabelDisplay: 'auto',
  step: 1,
  min: 0,
  max: 10,
  orientation: 'horizontal',
  disabled: true,
  handleSliderValueChange: mockOnValueChanged,
  ...otherProps,
};
const propsWithNullValue = {
  ...defaultProps,
  value: null,
};
const propsWithUndefinedValue = {
  ...defaultProps,
  value: undefined,
};
const propsWithNaNValue = {
  ...defaultProps,
  value: NaN,
};
const propsInEditMode = {
  ...defaultProps,
  disabled: false,
};

const disabledSliderLabel = new TypographyTesting({ dataCy: 'label-disabled-input' });
const disabledSliderValue = new TypographyTesting({ dataCy: 'stock-value-disabled-input' });
const sliderEditMode = new SliderTesting({ dataCy: 'slider-input' });

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicSliderInput {...props} />);
};

describe('BasicSliderInput tests in disabled and edit mode', () => {
  beforeEach(() => {
    mockOnValueChanged.mockClear();
  });

  describe('Shows label and value as a text in disabled mode', () => {
    beforeEach(() => {
      setUp(defaultProps);
    });

    test('Checks label and value in disabled mode', () => {
      expect(disabledSliderLabel.Typography).toBeInTheDocument();
      expect(disabledSliderValue.Typography).toBeInTheDocument();
      expect(disabledSliderValue.text).toEqual(defaultProps.value.toString());
    });
  });

  describe('Shows slider input in edit mode', () => {
    beforeEach(() => {
      setUp(propsInEditMode);
    });

    test('Checks value of slider in edit mode', () => {
      expect(sliderEditMode.Slider).toBeInTheDocument();
      expect(sliderEditMode.SliderValue).toHaveValue(propsInEditMode.value.toString());
    });

    test('Checks marks of slider in edit mode', () => {
      expect(sliderEditMode.SliderMarks[0]).toBeInTheDocument();
      expect(sliderEditMode.SliderMarks[1]).toBeInTheDocument();
      expect(sliderEditMode.SliderMarksValue[0]).toEqual(propsInEditMode.min.toString());
      expect(sliderEditMode.SliderMarksValue[1]).toEqual(propsInEditMode.max.toString());
    });
  });

  describe('Checks slider value if provided one is null, undefined or NaN', () => {
    test('Checks textField value is 0 when null is provided', () => {
      setUp(propsWithNullValue);
      expect(disabledSliderValue.text).toEqual('0');
    });

    test('Checks textField value is 0 when undefined is provided', () => {
      setUp(propsWithUndefinedValue);
      expect(disabledSliderValue.text).toEqual('0');
    });

    test('Checks textField value is 0 when NaN is provided', () => {
      setUp(propsWithNaNValue);
      expect(disabledSliderValue.text).toEqual('0');
    });
  });
});
