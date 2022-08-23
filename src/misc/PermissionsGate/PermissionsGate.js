// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';

const hasGateNoNecessaryPermissions = (necessaryPermissions) => {
  return Array.isArray(necessaryPermissions) && necessaryPermissions.length === 0;
};

const hasUserSufficientPermissions = (userPermissions, sufficientPermissions) => {
  return (
    sufficientPermissions.length > 0 &&
    sufficientPermissions.some((sufficientPermission) => userPermissions.includes(sufficientPermission))
  );
};

const hasUserAllNecessaryPermissions = (userPermissions, necessaryPermissions) => {
  return necessaryPermissions.every((necessaryPermission) => userPermissions.includes(necessaryPermission));
};

export const PermissionsGate = ({
  children,
  RenderNoPermissionComponent,
  noPermissionProps,
  necessaryPermissions,
  sufficientPermissions,
  userPermissions,
}) => {
  const permissionGranted =
    hasGateNoNecessaryPermissions(necessaryPermissions) ||
    hasUserSufficientPermissions(userPermissions, sufficientPermissions) ||
    hasUserAllNecessaryPermissions(userPermissions, necessaryPermissions);

  if (!permissionGranted) {
    if (noPermissionProps) return cloneElement(children, { ...noPermissionProps });
    else return <RenderNoPermissionComponent />;
  }

  return <>{children}</>;
};

PermissionsGate.propTypes = {
  /**
   * Children components protected by the PermissionsGate
   */
  children: PropTypes.node,
  /**
   * Fallback component to render if expected permissions are not respected
   */
  RenderNoPermissionComponent: PropTypes.func,
  /**
   * Props forwarded to child component if expected permissions are not respected
   */
  noPermissionProps: PropTypes.object,
  /**
   * Required permissions to render children component:
   *   - if current user has ALL of the required permissions, children component will be displayed
   *   - leave this list empty to ignore necessary permissions and automatically grant access to all users
   */
  necessaryPermissions: PropTypes.array,
  /**
   * Sufficient permissions to render children component:
   *   - if current user has ANY of the required permissions, children component will be displayed
   *   - leave this list empty to ignore sufficient permissions and only check necessary permissions
   */
  sufficientPermissions: PropTypes.array,
  /**
   * List of permissions granted to the current user
   */
  userPermissions: PropTypes.array,
};

PermissionsGate.defaultProps = {
  RenderNoPermissionComponent: () => <></>,
  noPermissionProps: null,
  necessaryPermissions: [],
  sufficientPermissions: [],
  userPermissions: [],
};
