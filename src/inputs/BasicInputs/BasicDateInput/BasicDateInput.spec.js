// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { screen } from '@testing-library/react';
import React from 'react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicDateInput } from './BasicDateInput';

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

const dateInputContainer = new ContainerTesting({ dataCy: 'date-input-start-date' });

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicDateInput {...props} />);
};

describe('Checks date input in edit mode', () => {
  test('Component is displayed in edit mode', () => {
    setUp(defaultProps);
    expect(dateInputContainer.Container).toBeInTheDocument();
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
