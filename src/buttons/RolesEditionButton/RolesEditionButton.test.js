// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { render } from '@testing-library/react';
import {
  ALL_PERMISSIONS,
  ALL_ROLES,
  LABELS,
  RESOURCE_ROLES_PERMISSIONS_MAPPING,
  SAMPLE_AGENTS,
} from '../../../tests/samples/RoleEditionSample';

import { RolesEditionButton } from '..';
import { ButtonTesting } from '../../../tests/MuiComponentsTesting';
let mockRolesAddingDialogProps;
jest.mock('./components', () => ({
  __esModule: true,
  RolesEditionDialog: (props) => {
    mockRolesAddingDialogProps = props;
    return <div data-testid="role_adding_dialog" />;
  },
}));

const defaultProps = {
  labels: LABELS,
  isIconButton: false,
  agents: SAMPLE_AGENTS.agents,
  specificAccessByAgent: SAMPLE_AGENTS.specificAccessByAgent,
  resourceRolesPermissionsMapping: RESOURCE_ROLES_PERMISSIONS_MAPPING,
  preventNoneRoleForAgents: true,
  isReadOnly: false,
  defaultRole: 'viewer',
  allRoles: ALL_ROLES,
  allPermissions: ALL_PERMISSIONS,
  defaultAccessScope: 'workspace',
  onConfirmChanges: () => {},
};

const ShareButton = new ButtonTesting({ dataCy: 'share-scenario-button' });

const openRoleEditionDialog = async () => {
  await ShareButton.click();
};

const setUp = (props) => {
  render(<RolesEditionButton {...props} />);
};

describe('RoleEditionButton', () => {
  beforeEach(() => {
    mockRolesAddingDialogProps = undefined;
  });

  test('RoleEditionDialog is not opened on load', () => {
    setUp(defaultProps);
    expect(mockRolesAddingDialogProps.open).toBeFalsy();
  });

  test('RoleEditionDialog is open when click on share', async () => {
    setUp(defaultProps);
    await openRoleEditionDialog();
    expect(mockRolesAddingDialogProps.open).toBeTruthy();
  });

  test('RoleEditionDialog is opened with good props', async () => {
    setUp(defaultProps);
    await openRoleEditionDialog();

    const propsExpected = {
      resourceRolesPermissionsMapping: defaultProps.resourceRolesPermissionsMapping,
      preventNoneRoleForAgents: defaultProps.preventNoneRoleForAgents,
      accessControlList: defaultProps.specificAccessByAgent,
      defaultRole: defaultProps.defaultRole,
      agents: defaultProps.agents,
      labels: defaultProps.labels.dialog,
      isReadOnly: defaultProps.isReadOnly,
      allRoles: defaultProps.allRoles,
      allPermissions: defaultProps.allPermissions,
      defaultAccessScope: defaultProps.defaultAccessScope,
    };

    expect(mockRolesAddingDialogProps).toEqual(expect.objectContaining(propsExpected));
  });
});
