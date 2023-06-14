/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicDateInput } from './BasicDateInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { screen } from '@testing-library/react';

const mockOnValueChanged = jest.fn();

const defaultProps = {
  id: 'start-date',
  value: new Date('03/30/2023'),
  changeSelectedDate: mockOnValueChanged,
  dateProps: {
    disabled: false,
  },
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

const dateInputContainer = new StackContainerTesting({ dataCy: 'date-input-start-date' });

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicDateInput {...props} />);
};

describe('Checks date input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(dateInputContainer.Stack).toBeInTheDocument();
    expect(dateInputContainer.Stack).not.toHaveDirtyInputClass();
  });

  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(dateInputContainer.Stack).toHaveDirtyInputClass();
  });
  test("helperText isn't displayed when error is undefined", () => {
    setUp(defaultProps);
    expect(screen.queryByText(/This field is required/i)).not.toBeInTheDocument();
  });
  test('helperText displays error message when error type is required', () => {
    setUp(propsWithRequiredError);
    expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });
});
