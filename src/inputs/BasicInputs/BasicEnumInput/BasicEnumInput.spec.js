/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicEnumInput } from './BasicEnumInput';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { StackContainerTesting } from '../../../../tests/MuiComponentsTesting';

const mockOnValueChanged = jest.fn();
const defaultProps = {
  id: 'currency',
  value: 'EUR',
  enumValues: [
    {
      key: 'USD',
      value: '$',
    },
    {
      key: 'EUR',
      value: '€',
    },
    {
      key: 'BTC',
      value: '฿',
    },
    {
      key: 'JPY',
      value: '¥',
    },
  ],
  textFieldProps: {
    disabled: false,
  },
  changeEnumField: mockOnValueChanged,
};
const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const enumInputContainer = new StackContainerTesting({ dataCy: 'enum-input-currency' });
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicEnumInput {...props} />);
};

describe('Checks enumInput in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(enumInputContainer.Stack).toBeInTheDocument();
    expect(enumInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(enumInputContainer.Stack).toHaveDirtyInputClass();
  });
});
