// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import userEvent from '@testing-library/user-event';
import { SelectTesting, ContainerTesting } from '../../../../tests/MuiComponentsTesting';
import { getByDataCy, renderInMuiThemeProvider } from '../../../../tests/utils';
import { BasicEnumInput } from './BasicEnumInput';

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
  test('Component is displayed in edit mode', async () => {
    setUp(defaultProps);
    expect(enumInputContainer.Container).toBeInTheDocument();
    expect(enumInputContainer.Container).toHaveTextContent('€');
    expect(enumInputContainer.Container).not.toHaveTextContent('EUR');
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

describe('Wrong enum values', () => {
  test.each`
    enumValues
    ${null}
    ${undefined}
    ${{}}
    ${'value'}
  `('Component is mount with empty select list if enum values are not acceptable', async ({ enumValues }) => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});
    setUp({ ...defaultProps, enumValues });
    await enumSelect.openMenu();
    expect(document.getElementsByClassName('MuiMenuItem-root').length).toEqual(0);
    warn.mockReset();
    error.mockReset();
  });
});
