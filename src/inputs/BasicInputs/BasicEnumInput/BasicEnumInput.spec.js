/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { BasicEnumInput } from './BasicEnumInput';
import userEvent from '@testing-library/user-event';
import { getByDataCy, renderInMuiThemeProvider } from '../../../../tests/utils';
import { SelectTesting, ContainerTesting } from '../../../../tests/MuiComponentsTesting';

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

const propsWithTooltips = {
  ...defaultProps,
  enumValues: defaultProps.enumValues.map((enumValue) => ({ ...enumValue, tooltipText: `tooltip_${enumValue.key}` })),
};

const enumInputContainer = new ContainerTesting({ dataCy: 'enum-input-currency' });
const enumSelect = new SelectTesting({ dataCy: 'enum-input-select-currency', dataCyMenu: 'enum-input-menu-currency' });
const setUp = (props) => {
  renderInMuiThemeProvider(<BasicEnumInput {...props} />);
};

describe('Checks enumInput in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(enumInputContainer.Container).toBeInTheDocument();
    expect(enumInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(enumInputContainer.Container).toHaveDirtyInputClass();
  });
});

describe('Check enum options tooltips', () => {
  test('Tooltip is displayed correctly with matching string', async () => {
    setUp(propsWithTooltips);
    await enumSelect.openMenu();
    userEvent.hover(enumSelect.getMenuChild('USD'));
    expect(getByDataCy('enum-input-value-tooltip-USD')).toBeVisible();
  });
});
