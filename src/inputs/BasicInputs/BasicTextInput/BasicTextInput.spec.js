/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicTextInput } from './BasicTextInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { screen } from '@testing-library/react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();
const textInputContainer = new ContainerTesting({ dataCy: 'text-input-comment' });
const defaultProps = {
  id: 'comment',
  value: 'short comment',
  textFieldProps: {
    disabled: false,
  },
  changeTextField: mockOnValueChanged,
};

const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};

const propsWithMinLengthError = {
  ...propsWithDirtyState,
  error: {
    type: 'minLength',
    message: 'Minimal length for this field is 2 characters',
  },
};

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicTextInput {...props} />);
};

describe('Checks text input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(textInputContainer.Container).toBeInTheDocument();
    expect(textInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(textInputContainer.Container).toHaveDirtyInputClass();
  });
  test("helperText isn't displayed when error is undefined", () => {
    setUp(defaultProps);
    expect(screen.queryByText(/Minimal length for this field is 2 characters/i)).not.toBeInTheDocument();
  });
  test('helperTest displays error message when error type is minLength', () => {
    setUp(propsWithMinLengthError);
    expect(screen.getByText(/Minimal length for this field is 2 characters/i)).toBeInTheDocument();
  });
});
