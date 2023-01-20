/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { render } from '@testing-library/react';
import { BasicSliderInput } from './BasicSliderInput';
import { TextFieldTesting } from '../../../../tests/MuiComponentsTesting/TextFieldTesting';
import { SliderTesting } from '../../../../tests/MuiComponentsTesting/SliderTesting';

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
const propsWithNullValueEditMode = {
  ...propsInEditMode,
  value: null,
};
const propsWithUndefinedValueEditMode = {
  ...propsInEditMode,
  value: undefined,
};
const propsWithNaNValueEditMode = {
  ...propsInEditMode,
  value: NaN,
};

const sliderDisabled = new TextFieldTesting({ dataCy: 'slider-input-textField' });
const sliderEditMode = new SliderTesting({ dataCy: 'slider-input' });

const setUp = (props) => {
  render(<BasicSliderInput {...props} />);
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

    test('Checks firing onChange function with right values while moving slider', async () => {
      await sliderEditMode.moveSliderToTheRight(mockOnValueChanged, 6);
      await sliderEditMode.moveSliderToTheLeft(mockOnValueChanged, 4);
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

    test('Checks slider value is 0 and handleChange function is working when null value is provided', async () => {
      setUp(propsWithNullValueEditMode);
      expect(sliderEditMode.SliderValue).toHaveValue('0');
      await sliderEditMode.moveSliderToTheRight(mockOnValueChanged, 1);
    });

    test('Checks slider value is 0 and handleChange function is working when undefined value is provided', async () => {
      setUp(propsWithUndefinedValueEditMode);
      expect(sliderEditMode.SliderValue).toHaveValue('0');
      await sliderEditMode.moveSliderToTheRight(mockOnValueChanged, 1);
    });

    test('Checks slider value is 0 and handleChange function is working when NaN value is provided', async () => {
      setUp(propsWithNaNValueEditMode);
      expect(sliderEditMode.SliderValue).toHaveValue('0');
      await sliderEditMode.moveSliderToTheRight(mockOnValueChanged, 1);
    });
  });
});
