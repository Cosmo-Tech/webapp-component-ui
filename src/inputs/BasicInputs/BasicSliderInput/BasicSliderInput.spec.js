/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicSliderInput } from './BasicSliderInput';
import { SliderTesting, TypographyTesting, ContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';

const mockOnValueChanged = jest.fn();

const defaultProps = {
  id: 'average_consumption',
  label: 'Average consumption',
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
const propsWithDirtyState = {
  ...propsInEditMode,
  isDirty: true,
};

const disabledSliderLabel = new TypographyTesting({ dataCy: 'disabled-input-label' });
const disabledSliderValue = new TypographyTesting({ dataCy: 'disabled-input-value' });
const sliderEditMode = new SliderTesting({ dataCy: 'slider-input-average_consumption' });
const sliderEditModeContainer = new ContainerTesting({ dataCy: 'slider-input-average_consumption' });

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

    test('Checks dirtyInput class is not applied when isDirty is false', () => {
      expect(sliderEditModeContainer.Container).not.toHaveDirtyInputClass();
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
  describe('Checks dirtyInput style is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(sliderEditModeContainer.Container).toHaveDirtyInputClass();
  });
});
