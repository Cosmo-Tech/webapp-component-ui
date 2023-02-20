/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicSliderInput } from './BasicSliderInput';
import { TextFieldTesting } from '../../../../tests/MuiComponentsTesting/TextFieldTesting';
import { SliderTesting } from '../../../../tests/MuiComponentsTesting/SliderTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';

const mockOnValueChanged = jest.fn();

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

const sliderDisabled = new TextFieldTesting({ dataCy: 'slider-input-textField' });
const sliderEditMode = new SliderTesting({ dataCy: 'slider-input' });

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicSliderInput {...props} />);
};

describe('BasicSliderInput tests in disabled and edit mode', () => {
  beforeEach(() => {
    mockOnValueChanged.mockClear();
  });

  describe('Shows textField input in disabled mode', () => {
    beforeEach(() => {
      setUp(defaultProps);
    });

    test('Checks value in textField in disabled mode', () => {
      expect(sliderDisabled.TextField).toBeInTheDocument();
      expect(sliderDisabled.TextFieldValue).toHaveValue(defaultProps.value.toString());
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
    // tests' output will be a console.error about null in required prop "value"
    // but they pass correctly and check component behaviour with null, undefined or NaN value
    test('Checks textField value is 0 when null is provided', () => {
      setUp(propsWithNullValue);
      expect(sliderDisabled.TextFieldValue).toHaveValue('0');
    });

    test('Checks textField value is 0 when undefined is provided', () => {
      setUp(propsWithUndefinedValue);
      expect(sliderDisabled.TextFieldValue).toHaveValue('0');
    });

    test('Checks textField value is 0 when NaN is provided', () => {
      setUp(propsWithNaNValue);
      expect(sliderDisabled.TextFieldValue).toHaveValue('0');
    });
  });
});
