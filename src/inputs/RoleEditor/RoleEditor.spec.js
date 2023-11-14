/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { RoleEditor } from '.';
import { TypographyTesting } from '../../../tests/MuiComponentsTesting';
import { ALL_ROLES, LABELS, SAMPLE_AGENTS } from '../../../tests/samples/RoleEditionSample';
import { renderInMuiThemeProvider } from '../../../tests/utils';

const mockOnOptionSelected = jest.fn();

const defaultProps = {
  agentName: SAMPLE_AGENTS.specificAccessByAgent[0].id,
  agentAccess: SAMPLE_AGENTS.specificAccessByAgent[0].role,
  allRoles: ALL_ROLES,
  isReadOnly: false,
  onOptionSelected: mockOnOptionSelected,
  helperText: LABELS.dialog.editor.helperText,
  actions: [
    {
      id: 'mock_action',
      label: 'mock_action_label',
    },
  ],
};

const propsWithReadOnly = {
  ...defaultProps,
  isReadOnly: true,
};

let mockSelectWithActionProps;
jest.mock('../SelectWithAction', () => ({
  __esModule: true,
  SelectWithAction: (props) => {
    mockSelectWithActionProps = props;
    return <div data-testid="select_with_action" />;
  },
}));

const TypographyAgentName = new TypographyTesting({ dataCy: 'role-editor-agent-name' });
const TypographyHelperText = new TypographyTesting({ dataCy: 'role-editor-helper-text' });

const setUp = (props) => {
  renderInMuiThemeProvider(<RoleEditor {...props} />);
};

describe('RoleEditor', () => {
  beforeEach(() => {
    mockSelectWithActionProps = undefined;
    mockOnOptionSelected.mockClear();
  });

  describe('Informations displayed', () => {
    beforeEach(() => {
      setUp(defaultProps);
    });

    test('Display agent name', () => {
      expect(TypographyAgentName.text).toEqual(defaultProps.agentName);
    });

    test('Display helper matching with agentAccess', () => {
      expect(TypographyHelperText.text).toEqual(defaultProps.helperText[defaultProps.agentAccess]);
    });
  });

  describe('SelectWithAction', () => {
    describe('Without readOnly', () => {
      beforeEach(() => {
        setUp(defaultProps);
      });

      test('Props of SelectWithAction contains allRole/AgentAcess/Actions', () => {
        const propsExpected = {
          isReadOnly: defaultProps.isReadOnly,
          options: defaultProps.allRoles,
          selectedOption: defaultProps.agentAccess,
          actions: defaultProps.actions,
        };

        expect(mockSelectWithActionProps).toEqual(expect.objectContaining(propsExpected));
      });

      test('Select one option call onOptionSelected', () => {
        const optionSelected = 'editor';

        mockSelectWithActionProps.onOptionSelected(optionSelected);
        expect(mockOnOptionSelected).toHaveBeenCalledWith(optionSelected);
      });
    });

    describe('With readOnly', () => {
      beforeEach(() => {
        setUp(propsWithReadOnly);
      });

      test('SelectWithAction is ReadOnly', () => {
        expect(mockSelectWithActionProps.isReadOnly).toBeTruthy();
      });
    });
  });
});
