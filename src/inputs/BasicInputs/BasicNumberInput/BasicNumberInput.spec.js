/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicNumberInput } from './BasicNumberInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { screen } from '@testing-library/react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting';

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
const propsWithRequiredError = {
  ...propsWithDirtyState,
  error: {
    type: 'required',
    message: 'This field is required',
  },
};

const numberInputContainer = new ContainerTesting({ dataCy: 'number-input-stock' });
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicNumberInput {...props} />);
};
describe('Checks numberInput in editMode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(numberInputContainer.Container).toBeInTheDocument();
    expect(numberInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(numberInputContainer.Container).toHaveDirtyInputClass();
  });
  test("helperText isn't displayed when error is undefined", () => {
    setUp(defaultProps);
    expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
  });
  test('helperTest displays error message when error type is required', () => {
    setUp(propsWithRequiredError);
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });
});
