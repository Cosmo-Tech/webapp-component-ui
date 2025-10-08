// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { screen } from '@testing-library/react';
import React from 'react';
import { ContainerTesting, TextFieldTesting } from '../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicNumberInput } from './BasicNumberInput';

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
const textField = new TextFieldTesting({ dataCy: 'number-input-stock', id: 'number-input-stock' });
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicNumberInput {...props} />);
};

describe('Checks numberInput in editMode', () => {
  test('Component is displayed in edit mode', () => {
    setUp(defaultProps);
    expect(numberInputContainer.Container).toBeInTheDocument();
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

describe('Checks value edition', () => {
  test('can type positive and negative integers', async () => {
    setUp(defaultProps);
    expect(textField.TextFieldValue).toHaveValue('10');
    // TODO: add textField.clear() and make it work
    await textField.type('{backspace}', '1');
    await textField.type('{backspace}', '');

    await textField.type('0');
    expect(textField.TextFieldValue).toHaveValue('0');
    await textField.type('{backspace}', '');

    await textField.type('-2');
    expect(textField.TextFieldValue).toHaveValue('-2');
    await textField.type('{backspace}', '-');
    await textField.type('{backspace}', '');

    await textField.type('50');
    expect(textField.TextFieldValue).toHaveValue('50');
    await textField.type('{backspace}', '5');
    await textField.type('{backspace}', '');

    await textField.type('999999999');
    expect(textField.TextFieldValue).toHaveValue('999999999');
  });

  test('can type positive and negative floats', async () => {
    setUp(defaultProps);
    expect(textField.TextFieldValue).toHaveValue('10');
    await textField.type('{backspace}', '1');
    await textField.type('{backspace}', '');

    await textField.type('0.1');
    expect(textField.TextFieldValue).toHaveValue('0.1');
    await textField.type('{backspace}', '0.');
    await textField.type('{backspace}', '0');
    await textField.type('{backspace}', '');

    await textField.type('-2.3');
    expect(textField.TextFieldValue).toHaveValue('-2.3');
  });

  test('cannot type invalid characters', async () => {
    setUp(defaultProps);
    expect(textField.TextFieldValue).toHaveValue('10');
    await textField.type('{backspace}', '1');
    await textField.type('{backspace}', '');

    await textField.type('1az');
    expect(textField.TextFieldValue).toHaveValue('1');
    await textField.type('{backspace}', '');

    await textField.type('2,3');
    expect(textField.TextFieldValue).toHaveValue('23');
    await textField.type('{backspace}', '2');
    await textField.type('{backspace}', '');

    await textField.type('*/+-123:.4a5b6c');
    expect(textField.TextFieldValue).toHaveValue('-123.456');
  });
});
