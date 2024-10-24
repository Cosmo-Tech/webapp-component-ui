// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { screen } from '@testing-library/react';
import React from 'react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting/ContainerTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicToggleInput } from './BasicToggleInput';

const mockOnValueChanged = jest.fn();
const toggleInputContainer = new ContainerTesting({ dataCy: 'toggle-form-control-enabled' });

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

const propsWithError = {
  ...propsWithDirtyState,
  error: {
    type: 'constraint',
    message: 'This field must be equal to the field comment',
  },
};
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicToggleInput {...props} />);
};

describe('Checks toggle input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(toggleInputContainer.Container).toBeInTheDocument();
    expect(toggleInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(toggleInputContainer.Container).toHaveDirtyInputClass();
  });
  test("helperText isn't displayed when error is undefined", () => {
    setUp(defaultProps);
    expect(screen.queryByText(/This field must be equal to the field comment/i)).not.toBeInTheDocument();
  });
  test("helperText isn't displayed when error is undefined", () => {
    setUp(propsWithError);
    expect(screen.queryByText(/This field must be equal to the field comment/i)).toBeInTheDocument();
  });
});
