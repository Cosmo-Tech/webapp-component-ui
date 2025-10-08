// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { screen } from '@testing-library/react';
import React from 'react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicTextInput } from './BasicTextInput';

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
  test('Component is displayed in edit mode', () => {
    setUp(defaultProps);
    expect(textInputContainer.Container).toBeInTheDocument();
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
