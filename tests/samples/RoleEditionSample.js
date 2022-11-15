// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const LABELS = {
  dialog: {
    title: 'ut_title',
    addPeople: 'ut_addPeople',
    cancel: 'ut_cancel',
    share: 'ut_share',
    noAdminError: 'ut_noAdminError',
    userSelected: 'ut_userSelected',
    usersAccess: 'ut_usersAccess',
    generalAccess: 'ut_generalAccess',
    removeAccess: 'ut_removeAccess',
    editor: {
      helperText: {
        admin: 'ut_helper_admin',
        viewer: 'ut_helper_viewer',
        validator: 'ut_helper_validator',
        editor: 'ut_helper_editor',
        none: 'ut_helper_none',
      },
    },
    add: {
      cancel: 'ut_add_cancel',
      deniedPermissions: 'ut_add_deniedPermission',
      done: 'ut_add_done',
      grantedPermissions: 'ut_add_grantedPermissions',
      rolesTitle: 'ut_add_rolesTitle',
      userSelected: 'ut_add_userSelected',
      rolesHelperText: 'ut_add_rolesHelperText',
    },
  },
};

export const RESOURCE_ROLES_PERMISSIONS_MAPPING = {
  viewer: ['read', 'read_security'],
  editor: ['read', 'read_security', 'launch', 'write'],
  validator: ['read', 'read_security', 'launch', 'write', 'validate'],
  admin: ['read', 'read_security', 'launch', 'write', 'validate', 'write_security', 'delete'],
  none: [],
};

export const ALL_ROLES = [
  {
    value: 'none',
    label: 'ut_role_none',
  },
  {
    value: 'viewer',
    label: 'ut_role_viewer',
  },
  {
    value: 'editor',
    label: 'ut_role_editor',
  },
  {
    value: 'validator',
    label: 'ut_role_validator',
  },
  {
    value: 'admin',
    label: 'ut_role_admin',
  },
];

export const ALL_PERMISSIONS = [
  {
    value: 'read',
    label: 'ut_permission_read',
  },
  {
    value: 'read_security',
    label: 'ut_permission_read_security',
  },
  {
    value: 'launch',
    label: 'ut_permission_launch',
  },
  {
    value: 'write',
    label: 'ut_permission_write',
  },
  {
    value: 'validate',
    label: 'ut_permission_validate',
  },
  {
    value: 'write_security',
    label: 'ut_permission_write_security',
  },
  {
    value: 'delete',
    label: 'ut_permission_delete',
  },
];

export const SAMPLE_AGENTS = {
  agents: [
    {
      id: 'user1',
    },
    {
      id: 'user2',
    },
    {
      id: 'user3',
    },
  ],
  specificAccessByAgent: [
    {
      id: 'user1',
      role: 'admin',
    },
    {
      id: 'user3',
      role: 'viewer',
    },
  ],
};
