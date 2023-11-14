// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { RolesAddingDialog } from '.';
import {
  AutoCompleteTesting,
  ButtonTesting,
  RadioGroupTesting,
  ChipTesting,
} from '../../../../../../tests/MuiComponentsTesting';
import {
  ALL_PERMISSIONS,
  ALL_ROLES,
  LABELS,
  RESOURCE_ROLES_PERMISSIONS_MAPPING,
  SAMPLE_AGENTS,
} from '../../../../../../tests/samples/RoleEditionSample';
import { renderInMuiThemeProvider } from '../../../../../../tests/utils';

const mockOnCancel = jest.fn();
const mockOnConfirm = jest.fn();

const propsWithoutDefaultRole = {
  selectedAgent: SAMPLE_AGENTS.agents[0],
  labels: LABELS.dialog.add,
  allRoles: ALL_ROLES,
  allPermissions: ALL_PERMISSIONS,
  rolesPermissionsMapping: RESOURCE_ROLES_PERMISSIONS_MAPPING,
  defaultRole: '',
  onCancel: mockOnCancel,
  onConfirm: mockOnConfirm,
};

const propsWithDefaultRole = {
  ...propsWithoutDefaultRole,
  defaultRole: 'viewer',
};

const SelectedAgent = new AutoCompleteTesting({ dataCy: 'share-scenario-dialog-disabled-agents-select' });
const ShareButton = new ButtonTesting({ dataCy: 'share-scenario-dialog-confirm-add-access-button' });
const CancelButton = new ButtonTesting({ dataCy: 'share-scenario-dialog-second-cancel-button' });
const RolesRadioGroup = new RadioGroupTesting({ dataCy: 'share-scenario-dialog-roles-checkboxes' });

const setUp = (props) => {
  renderInMuiThemeProvider(<RolesAddingDialog {...props} />);
};

const getSelectedRole = () => {
  return RolesRadioGroup.CheckedRadio.value;
};

describe('RoleAddingDialog', () => {
  beforeEach(() => {
    mockOnCancel.mockClear();
    mockOnConfirm.mockClear();
  });

  describe('Selected user', () => {
    test('The selected userId is displayed and disabled', () => {
      setUp(propsWithoutDefaultRole);
      expect(SelectedAgent.Input).toHaveValue(propsWithoutDefaultRole.selectedAgent.id);
      expect(SelectedAgent.Input).toBeDisabled();
    });
  });

  describe('List of roles', () => {
    beforeEach(() => {
      setUp(propsWithDefaultRole);
    });

    test('All roles are displayed', () => {
      expect(RolesRadioGroup.Radios.length).toEqual(ALL_ROLES.length);
    });

    test('DefaultRole is selected', () => {
      expect(getSelectedRole()).toEqual(propsWithDefaultRole.defaultRole);
    });

    test('Only one role can be selected', async () => {
      const ViewerRadio = RolesRadioGroup.getRadio('viewer');
      const EditorRadio = RolesRadioGroup.getRadio('editor');

      expect(ViewerRadio).toBeChecked();
      expect(EditorRadio).not.toBeChecked();
      await RolesRadioGroup.check('editor');
      expect(ViewerRadio).not.toBeChecked();
      expect(EditorRadio).toBeChecked();
    });
  });

  describe('List of permissions', () => {
    const getPermissionChip = (permissionId, granted) => {
      const dataCyPrefix = granted
        ? 'share-scenario-dialog-granted-permission-chip-'
        : 'share-scenario-dialog-not-granted-permission-chip-';
      return new ChipTesting({ dataCy: `${dataCyPrefix}${permissionId}` });
    };

    const testGrantedPermissionMatchingToSelectedRole = () => {
      const selectedRole = getSelectedRole();
      const permissionsGranted = RESOURCE_ROLES_PERMISSIONS_MAPPING[selectedRole];

      permissionsGranted.forEach((permissionGranted) => {
        expect(getPermissionChip(permissionGranted, true).disabled).toBeFalsy();
      });
    };

    const testNotGrantedPermissionMatchingToSelectedRole = () => {
      const selectedRole = getSelectedRole();
      const permissionsGranted = RESOURCE_ROLES_PERMISSIONS_MAPPING[selectedRole];
      const notGrantedPermissions = ALL_PERMISSIONS.filter(
        (permission) => !permissionsGranted.includes(permission.value)
      ).map((p) => p.value);

      notGrantedPermissions.forEach((notGrantedPermission) => {
        expect(getPermissionChip(notGrantedPermission, false).disabled).toBeTruthy();
      });
    };

    beforeEach(() => {
      setUp(propsWithDefaultRole);
    });

    test('Granted permission match to selected role', () => {
      testGrantedPermissionMatchingToSelectedRole();
    });

    test('Not granted permission match to selected role', () => {
      testNotGrantedPermissionMatchingToSelectedRole();
    });

    test('Permissions match with new role selected', async () => {
      await RolesRadioGroup.check('editor');
      testGrantedPermissionMatchingToSelectedRole();
      testNotGrantedPermissionMatchingToSelectedRole();
    });
  });

  describe('Buttons', () => {
    describe('Without defaultRole', () => {
      beforeEach(() => {
        setUp(propsWithoutDefaultRole);
      });

      test('Share button is disabled', () => {
        expect(ShareButton.Button).toBeDisabled();
      });

      test('Cancel button is enabled', () => {
        expect(CancelButton.Button).toBeEnabled();
      });
    });

    describe('With defaultRole', () => {
      beforeEach(() => {
        setUp(propsWithDefaultRole);
      });

      test('Share button is enabled', () => {
        expect(ShareButton.Button).toBeEnabled();
      });

      test('Cancel button is enabled', () => {
        expect(CancelButton.Button).toBeEnabled();
      });

      test('Cancel click call onCancel', async () => {
        await CancelButton.click();
        expect(mockOnCancel).toHaveBeenCalled();
      });

      test('Share click call onConfirm with good params', async () => {
        await RolesRadioGroup.check('editor');
        await ShareButton.click();

        const expectedConfirmData = {
          id: propsWithDefaultRole.selectedAgent.id,
          role: 'editor',
        };

        expect(mockOnConfirm).toHaveBeenCalledWith(expect.objectContaining(expectedConfirmData));
      });
    });
  });
});
