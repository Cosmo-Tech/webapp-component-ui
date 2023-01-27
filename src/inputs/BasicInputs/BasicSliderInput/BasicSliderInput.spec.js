/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { render } from '@testing-library/react';
import { BasicSliderInput } from './BasicSliderInput';
import { TextFieldTesting } from '../../../../tests/MuiComponentsTesting/TextFieldTesting';
import { SliderTesting } from '../../../../tests/MuiComponentsTesting/SliderTesting';
import userEvent from '@testing-library/user-event';

const mockOnValueChanged = jest.fn();
const user = userEvent.setup();

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
const propsInEditMode = {
  ...defaultProps,
  disabled: false,
};
const propsWithInvalidValue = {
  ...defaultProps,
  value: undefined,
  disabled: false,
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
      await user.click(sliderEditMode.SliderTracker);
      await user.keyboard('[ArrowRight]');
      expect(mockOnValueChanged).toBeCalled();
      expect(mockOnValueChanged).toHaveBeenCalledWith(6);
      await user.keyboard('[ArrowLeft]');
      expect(mockOnValueChanged).toBeCalled();
      expect(mockOnValueChanged).toHaveBeenCalledWith(4);
    });
  });

  describe('Checks slider value if provided one is null or undefined', () => {
    beforeEach(() => {
      setUp(propsWithInvalidValue);
    });

    // this test's output will be a console.error about null value in required prop "value"
    // but the test passes correctly and checks component behaviour with null and undefined value
    test('Checks slider value is 0', async () => {
      expect(sliderEditMode.SliderValue).toHaveValue('0');
      await sliderEditMode.moveSliderToTheRight(mockOnValueChanged, 1);
      /*      await user.click(sliderEditMode.SliderTracker);
      await user.keyboard('[ArrowRight]');
      expect(mockOnValueChanged).toBeCalled();
      expect(mockOnValueChanged).toHaveBeenCalledWith(1); */
    });
  });
});
