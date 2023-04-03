/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicRadioInput } from './BasicRadioInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();
const radioInputContainer = new StackContainerTesting({ dataCy: 'radio-input-unit' });
const defaultProps = {
  id: 'unit',
  value: 'LITRE',
  textFieldProps: {
    disabled: false,
  },
  enumValues: [
    {
      key: 'LITRE',
      value: 'L',
    },
    {
      key: 'BARREL',
      value: 'bl',
    },
    {
      key: 'CUBIC_METRE',
      value: 'm³',
    },
  ],
  changeRadioOption: mockOnValueChanged,
};

const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicRadioInput {...props} />);
};

describe('Checks radio input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(radioInputContainer.Stack).toBeInTheDocument();
    expect(radioInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(radioInputContainer.Stack).toHaveDirtyInputClass();
  });
});
