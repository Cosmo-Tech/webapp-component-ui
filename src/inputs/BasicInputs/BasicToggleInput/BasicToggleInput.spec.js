/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicToggleInput } from './BasicToggleInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();
const toggleInputContainer = new StackContainerTesting({ dataCy: 'toggle-input-enabled' });
const defaultProps = {
  id: 'enabled',
  value: true,
  switchProps: {
    disabled: false,
  },
  changeSwitchType: mockOnValueChanged,
};

const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicToggleInput {...props} />);
};

describe('Checks toggle input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(toggleInputContainer.Stack).toBeInTheDocument();
    expect(toggleInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(toggleInputContainer.Stack).toHaveDirtyInputClass();
  });
});
