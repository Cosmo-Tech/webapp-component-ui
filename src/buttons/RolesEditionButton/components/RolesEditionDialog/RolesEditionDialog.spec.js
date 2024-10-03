/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { screen } from '@testing-library/react';
import React, { act } from 'react';
import { RolesEditionDialog } from '.';
import { AutoCompleteTesting, ButtonTesting, TypographyTesting } from '../../../../../tests/MuiComponentsTesting';
import {
  ALL_PERMISSIONS,
  ALL_ROLES,
  LABELS,
  RESOURCE_ROLES_PERMISSIONS_MAPPING,
  SAMPLE_AGENTS,
} from '../../../../../tests/samples/RoleEditionSample';
import { renderInMuiThemeProvider } from '../../../../../tests/utils';

const mockCloseDialog = jest.fn();
const mockOnConfirmChanges = jest.fn();

let mockRolesAddingDialogProps;
jest.mock('./components', () => ({
  __esModule: true,
  RolesAddingDialog: (props) => {
    mockRolesAddingDialogProps = props;
    return <div data-testid="role_adding_dialog" />;
  },
}));
const getNewAccessView = () => screen.queryByTestId('role_adding_dialog');

let mockRoleEditorsProps = {};
jest.mock('../../../../inputs', () => ({
  __esModule: true,
  RoleEditor: (props) => {
    const key = props.agentName;
    mockRoleEditorsProps[key] = props;
    return <div data-testid={`role_editor_${key}`} />;
  },
}));
const getRoleEditor = (agentId) => screen.queryByTestId(`role_editor_${agentId}`);
const getCurrentRoleForAgent = (agentId) => {
  return mockRoleEditorsProps[agentId].agentAccess;
};

const selectRoleForAgent = (agentId, newRole) => {
  act(() => {
    mockRoleEditorsProps[agentId].onOptionSelected({
      target: {
        value: newRole,
      },
    });
  });
};

const propsWithoutUsers = {
  labels: LABELS.dialog,
  isReadOnly: false,
  resourceRolesPermissionsMapping: RESOURCE_ROLES_PERMISSIONS_MAPPING,
  allRoles: ALL_ROLES,
  allPermissions: ALL_PERMISSIONS,
  open: true,
  closeDialog: mockCloseDialog,
  onConfirmChanges: mockOnConfirmChanges,
  accessControlList: [],
  agents: [],
  defaultRole: 'viewer',
  defaultAccessScope: 'Workspace',
  preventNoneRoleForAgents: false,
};

const propsWithUsers = {
  ...propsWithoutUsers,
  agents: SAMPLE_AGENTS.agents,
  accessControlList: SAMPLE_AGENTS.specificAccessByAgent,
};

const propsWithPreventNoneRole = {
  ...propsWithUsers,
  preventNoneRoleForAgents: true,
};

const propsWithReadOnly = {
  ...propsWithUsers,
  isReadOnly: true,
};

const allRolesWithoutNone = ALL_ROLES.filter((role) => role.value.toLowerCase() !== 'none');
const agentsNotInSpecificAccess = SAMPLE_AGENTS.agents.filter(
  (agent) => !SAMPLE_AGENTS.specificAccessByAgent.some((specificAgent) => specificAgent.id === agent.id)
);

const setUp = (props) => {
  renderInMuiThemeProvider(<RolesEditionDialog {...props} />);
};

const AddPeopleSelect = new AutoCompleteTesting({
  dataCy: 'share-scenario-dialog-agents-select',
  dataCyList: 'share-scenario-dialog-agents-select-options',
});

const ShareButton = new ButtonTesting({ dataCy: 'share-scenario-dialog-submit-button' });
const CancelButton = new ButtonTesting({ dataCy: 'share-scenario-dialog-first-cancel-button' });
const NoAdminErrorMessage = new TypographyTesting({ dataCy: 'no-admin-error-message' });

const openNewAccessView = async (userId) => {
  await AddPeopleSelect.openList();
  await AddPeopleSelect.selectOption(userId);
};

const workspaceId = propsWithUsers.defaultAccessScope;
const getWorkspaceRoleEditor = () => getRoleEditor(workspaceId);
const getCurrentDefaultRole = () => {
  return getCurrentRoleForAgent(workspaceId);
};
const selectDefaultRole = (newRole) => {
  selectRoleForAgent(workspaceId, newRole);
};

const removeAgent = (agentId) => {
  const removeAgentCallback = mockRoleEditorsProps[agentId].actions.find(
    (action) => action.id === 'remove_specific_access'
  ).onClick;

  act(() => {
    removeAgentCallback({
      stopPropagation: () => {},
    });
  });
};

describe('RolesEditionDialog', () => {
  beforeEach(() => {
    mockRolesAddingDialogProps = undefined;
    mockRoleEditorsProps = {};
    mockCloseDialog.mockClear();
    mockOnConfirmChanges.mockClear();
  });

  describe('Add people list', () => {
    test('when agents list is empty, "Add people" list is empty', async () => {
      setUp(propsWithoutUsers);
      await AddPeopleSelect.openList();
      expect(AddPeopleSelect.List).not.toBeInTheDocument();
    });

    test('agents that are in specificAccessByAgent are not displayed in "Add people" list', async () => {
      setUp(propsWithUsers);
      await AddPeopleSelect.openList();

      SAMPLE_AGENTS.specificAccessByAgent.forEach((agent) => {
        expect(AddPeopleSelect.getOption(agent.id)).not.toBeInTheDocument();
      });
    });

    test('agents that are not in specificAccessByAgent are displayed in the “Add people” list', async () => {
      setUp(propsWithUsers);
      await AddPeopleSelect.openList();
      agentsNotInSpecificAccess.forEach((agent) => {
        expect(AddPeopleSelect.getOption(agent.id)).toBeInTheDocument();
      });
    });

    test('selecting an agent in the “Add people” list opens the “New access” view in the dialog', async () => {
      setUp(propsWithUsers);

      expect(getNewAccessView()).not.toBeInTheDocument();
      await openNewAccessView('user2');
      expect(getNewAccessView()).toBeInTheDocument();
    });
  });

  describe('"New Access" view', () => {
    test('"new Access" view opened with good user', async () => {
      setUp(propsWithUsers);
      await openNewAccessView('user2');

      const expectedProps = {
        selectedAgent: {
          id: 'user2',
        },
      };

      expect(mockRolesAddingDialogProps).toEqual(expect.objectContaining(expectedProps));
    });

    test('"new Access" view opened with all roles', async () => {
      setUp(propsWithUsers);
      await openNewAccessView('user2');

      const expectedProps = {
        allRoles: ALL_ROLES,
      };

      expect(mockRolesAddingDialogProps).toEqual(expect.objectContaining(expectedProps));
    });

    test('if preventNoneRoleForAgent, "new Access" view opened without none role', async () => {
      setUp(propsWithPreventNoneRole);
      await openNewAccessView('user2');

      const expectedProps = {
        allRoles: allRolesWithoutNone,
      };

      expect(mockRolesAddingDialogProps).toEqual(expect.objectContaining(expectedProps));
    });
  });

  describe('Access control list', () => {
    describe('Agents', () => {
      describe('Agents displayed', () => {
        beforeEach(() => {
          setUp(propsWithUsers);
        });

        test('agents in specificAccessByAgent are displayed with current role', () => {
          SAMPLE_AGENTS.specificAccessByAgent.forEach((agent) => {
            expect(getRoleEditor(agent.id)).toBeInTheDocument();
            expect(getCurrentRoleForAgent(agent.id)).toEqual(agent.role);
          });
        });

        test('agents not in specificAccessByAgent are not displayed', () => {
          agentsNotInSpecificAccess.forEach((agent) => {
            expect(getRoleEditor(agent.id)).not.toBeInTheDocument();
          });
        });
      });

      describe('Roles passed to RoleEditor', () => {
        test('without preventNoneRoleForAgent AllRoles are passed to RoleEditor', () => {
          setUp(propsWithUsers);
          const agentId = SAMPLE_AGENTS.specificAccessByAgent[0].id;
          expect(mockRoleEditorsProps[agentId].allRoles).toEqual(ALL_ROLES);
        });

        test('with preventNoneRoleForAgent all roles without none is passed to RoleEditor', () => {
          setUp(propsWithPreventNoneRole);
          const agentId = SAMPLE_AGENTS.specificAccessByAgent[0].id;
          expect(mockRoleEditorsProps[agentId].allRoles).toEqual(allRolesWithoutNone);
        });
      });

      describe('Agents RoleEditor interactions', () => {
        beforeEach(() => {
          setUp(propsWithUsers);
        });

        describe('Select new role', () => {
          test('select new role set role to agent', async () => {
            expect(getCurrentRoleForAgent('user3')).toEqual('viewer');
            selectRoleForAgent('user3', 'editor');
            expect(getCurrentRoleForAgent('user3')).toEqual('editor');
          });

          test('remove all admin role disable share button', async () => {
            expect(ShareButton.Button).toBeEnabled();
            const adminsAgents = SAMPLE_AGENTS.specificAccessByAgent.filter((agent) => agent.role === 'admin');

            adminsAgents.forEach((agent) => {
              selectRoleForAgent(agent.id, 'viewer');
            });

            expect(ShareButton.Button).toBeDisabled();
          });
        });

        describe('Remove agent', () => {
          test('remove RoleEditor of agent in view', () => {
            expect(getRoleEditor('user3')).toBeInTheDocument();
            removeAgent('user3');
            expect(getRoleEditor('user3')).not.toBeInTheDocument();
          });
        });
      });
    });
    describe('Workspace', () => {
      beforeEach(() => {
        setUp(propsWithUsers);
      });

      test('Workspace RoleEditor is displayed with defaultRole', () => {
        expect(getWorkspaceRoleEditor()).toBeInTheDocument();
        expect(getCurrentDefaultRole()).toEqual(propsWithUsers.defaultRole);
      });

      test('Select Workspace Role set new defaultRole', () => {
        expect(getCurrentDefaultRole()).toEqual('viewer');
        selectDefaultRole('editor');
        expect(getCurrentDefaultRole()).toEqual('editor');
      });
    });
  });

  describe('Buttons', () => {
    beforeEach(() => {
      setUp(propsWithUsers);
    });

    describe('Share button', () => {
      test('Share button is enable if one Admin', () => {
        expect(ShareButton.Button).toBeEnabled();
      });

      test('Click on share button call onConfirmChanges with new security', async () => {
        await openNewAccessView('user2');
        act(() => {
          mockRolesAddingDialogProps.onConfirm({
            id: 'user2',
            role: 'editor',
          });
        });

        await ShareButton.click();

        const expectedNewSpecificAccess = [
          ...SAMPLE_AGENTS.specificAccessByAgent,
          {
            id: 'user2',
            role: 'editor',
          },
        ];
        expect(mockOnConfirmChanges).toHaveBeenCalledWith(
          expect.objectContaining({
            accessControlList: expect.arrayContaining(expectedNewSpecificAccess),
          })
        );
      });

      test('Click on share button call onConfirmChanges, with new defaultRole', async () => {
        selectDefaultRole('editor');
        await ShareButton.click();

        const expectedNewDefault = 'editor';
        expect(mockOnConfirmChanges).toHaveBeenCalledWith(
          expect.objectContaining({
            default: expectedNewDefault,
          })
        );
      });

      test('Click on share button call closeDialog', async () => {
        await ShareButton.click();
        expect(mockCloseDialog).toHaveBeenCalled();
      });
    });

    describe('Cancel button', () => {
      test('Cancel button is enabled', () => {
        expect(CancelButton.Button).toBeEnabled();
      });

      test('Click on cancel call closeDialog', async () => {
        await CancelButton.click();
        expect(mockCloseDialog).toHaveBeenCalled();
      });
    });
  });

  describe('Admin count verification', () => {
    beforeEach(() => {
      setUp(propsWithUsers);
    });

    test('remove all admin disable share button and show error message', () => {
      expect(ShareButton.Button).toBeEnabled();
      expect(NoAdminErrorMessage.Typography).not.toBeInTheDocument();
      const adminsAgents = SAMPLE_AGENTS.specificAccessByAgent.filter((agent) => agent.role === 'admin');
      adminsAgents.forEach((agent) => {
        removeAgent(agent.id);
      });
      expect(ShareButton.Button).toBeDisabled();
      expect(NoAdminErrorMessage.Typography).toBeVisible();
    });

    test('change all admin role disable share button and show error message', () => {
      expect(ShareButton.Button).toBeEnabled();
      expect(NoAdminErrorMessage.Typography).not.toBeInTheDocument();
      const adminsAgents = SAMPLE_AGENTS.specificAccessByAgent.filter((agent) => agent.role === 'admin');
      adminsAgents.forEach((agent) => {
        selectRoleForAgent(agent.id, 'viewer');
      });
      expect(ShareButton.Button).toBeDisabled();
      expect(NoAdminErrorMessage.Typography).toBeVisible();
    });
  });

  describe('Read-only', () => {
    beforeEach(() => {
      setUp(propsWithReadOnly);
    });

    test('New user cannot be added', () => {
      expect(AddPeopleSelect.Select).not.toBeInTheDocument();
    });

    test('Share button is not visible', () => {
      expect(ShareButton.Button).not.toBeInTheDocument();
    });

    test('All RoleEditor are readOnly', () => {
      for (const agentId in mockRoleEditorsProps) {
        expect(mockRoleEditorsProps[agentId].isReadOnly).toBeTruthy();
      }
    });
  });
});
