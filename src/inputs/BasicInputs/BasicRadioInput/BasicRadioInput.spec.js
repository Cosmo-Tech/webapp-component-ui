// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { ContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicRadioInput } from './BasicRadioInput';

const mockOnValueChanged = jest.fn();
const radioInputContainer = new ContainerTesting({ dataCy: 'radio-input-unit' });
const defaultProps = {
  id: 'unit',
  value: 'LITRE',
  textFieldProps: {
    disabled: false,
  },
  enumValues: [
    {
      key: 'LITRE',
      value: 'L',
    },
    {
      key: 'BARREL',
      value: 'bl',
    },
    {
      key: 'CUBIC_METRE',
      value: 'm³',
    },
  ],
  changeRadioOption: mockOnValueChanged,
};

const setUp = (props) => {
  renderInMuiThemeProvider(<BasicRadioInput {...props} />);
};

describe('Checks radio input in edit mode', () => {
  test('Component is displayed in edit mode', () => {
    setUp(defaultProps);
    expect(radioInputContainer.Container).toBeInTheDocument();
  });
});
