// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';

import { SelectWithAction } from '.';
import { SelectTesting } from '../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../tests/utils';

const mockOnOptionSelected = jest.fn();
const mockActionClick = jest.fn();

const defaultProps = {
  options: [
    {
      value: 'option1_value',
      label: 'option1_label',
    },
    {
      value: 'option2_value',
      label: 'option2_label',
    },
    {
      value: 'option3_value',
      label: 'option3_label',
    },
  ],
  selectedOption: 'option1_value',
  onOptionSelected: mockOnOptionSelected,
  isReadOnly: false,
  actions: [
    {
      id: 'action1_id',
      label: 'action1_label',
      onClick: () => mockActionClick('action1_id'),
    },
    {
      id: 'action2_id',
      label: 'action2_label',
      onClick: () => mockActionClick('action2_id'),
    },
  ],
};

const propsWithReadOnly = {
  ...defaultProps,
  isReadOnly: true,
};

const SelectElement = new SelectTesting({ dataCy: 'select-with-action', dataCyMenu: 'select-with-action-menu' });

const getOptionIcon = (optionValue) => {
  return SelectElement.getMenuChild(`select-${optionValue}-checked-icon`);
};

const setUp = (props) => {
  renderInMuiThemeProvider(<SelectWithAction {...props} />);
};

describe('SelectWithAction', () => {
  beforeEach(() => {
    mockActionClick.mockClear();
    mockOnOptionSelected.mockClear();
  });

  describe('Options', () => {
    beforeEach(() => {
      setUp(defaultProps);
    });

    test('Selected option is displayed as value', () => {
      expect(SelectElement.text).toEqual('option1_label');
    });

    test('All options are displayed in Menu', async () => {
      await SelectElement.openMenu();

      defaultProps.options.forEach((option) => {
        expect(SelectElement.getMenuItem(option.label)).toBeVisible();
      });
    });

    test('Only option selected is checked', async () => {
      await SelectElement.openMenu();

      const unSelectedOptions = defaultProps.options.filter((option) => option.value !== defaultProps.selectedOption);

      unSelectedOptions.forEach((unSelectedOption) => {
        expect(getOptionIcon(unSelectedOption.value)).not.toBeVisible();
      });

      expect(getOptionIcon(defaultProps.selectedOption)).toBeVisible();
    });

    test('Select a option call onOptionSelected with new option', async () => {
      const optionToSelect = defaultProps.options[2];

      await SelectElement.openMenu();
      await SelectElement.selectMenuItem(optionToSelect.label);

      const expectedCall = {
        target: {
          value: optionToSelect.value,
        },
      };

      expect(mockOnOptionSelected).toHaveBeenCalledWith(expect.objectContaining(expectedCall), expect.anything());
    });
  });

  describe('Actions', () => {
    beforeEach(() => {
      setUp(defaultProps);
    });

    test('All actions are displayed in OptionsList', async () => {
      await SelectElement.openMenu();

      defaultProps.actions.forEach((action) => {
        expect(SelectElement.getMenuItem(action.label)).toBeVisible();
      });
    });

    test('Click on action call action callback', async () => {
      const actionToSelect = defaultProps.actions[1];

      await SelectElement.openMenu();
      await SelectElement.selectMenuItem(actionToSelect.label);

      expect(mockActionClick).toBeCalledWith(actionToSelect.id);
    });
  });

  describe('With ReadOnly', () => {
    beforeEach(() => {
      setUp(propsWithReadOnly);
    });

    test('Select is disabled', () => {
      expect(SelectElement.disabled).toBeTruthy();
    });
  });
});
