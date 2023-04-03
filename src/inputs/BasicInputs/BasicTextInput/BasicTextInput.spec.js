/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicTextInput } from './BasicTextInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();
const textInputContainer = new StackContainerTesting({ dataCy: 'text-input-comment' });
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
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicTextInput {...props} />);
};

describe('Checks text input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(textInputContainer.Stack).toBeInTheDocument();
    expect(textInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(textInputContainer.Stack).toHaveDirtyInputClass();
  });
});
