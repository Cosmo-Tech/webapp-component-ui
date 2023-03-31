/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicNumberInput } from './BasicNumberInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();

const defaultProps = {
  id: 'stock',
  value: 10,
  textFieldProps: {
    disabled: false,
  },
  changeNumberField: mockOnValueChanged,
};
const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const numberInputContainer = new StackContainerTesting({ dataCy: 'number-input-stock' });
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicNumberInput {...props} />);
};
describe('Checks numberInput in editMode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(numberInputContainer.Stack).toBeInTheDocument();
    expect(numberInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(numberInputContainer.Stack).toHaveDirtyInputClass();
  });
});
