// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '@mui/icons-material/Share';
import { Button, IconButton } from '@mui/material';
import { FadingTooltip } from '../../misc';
import { RolesEditionDialog } from './components';

const DEFAULT_LABELS = {
  button: {
    title: 'Share',
    tooltip: 'Modify access',
  },
};

export const RolesEditionButton = ({
  labels: tmpLabels,
  isIconButton = false,
  agents,
  hasWriteSecurityPermission,
  specificSharingRestriction,
  canBeSharedWithAgent,
  resourceRolesPermissionsMapping,
  preventNoneRoleForAgents = false,
  disabled = false,
  onConfirmChanges,
  specificAccessByAgent,
  defaultRole = '',
  allRoles,
  allPermissions,
  defaultAccessScope,
}) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const buttonTitle = labels.button?.title ?? 'Share';
  const buttonContent = isIconButton ? (
    <IconButton
      data-cy="share-scenario-button"
      size="medium"
      variant="outlined"
      onClick={openDialog}
      color="primary"
      disabled={disabled}
    >
      <ShareIcon />
    </IconButton>
  ) : (
    <Button
      disabled={disabled}
      data-cy="share-scenario-button"
      size="medium"
      variant="outlined"
      onClick={openDialog}
      color="primary"
    >
      {buttonTitle}
    </Button>
  );
  return (
    <div>
      <FadingTooltip title={labels.button?.tooltip ?? 'Share'} disableHoverListener={!isIconButton && !disabled}>
        {buttonContent}
      </FadingTooltip>
      <RolesEditionDialog
        open={open}
        resourceRolesPermissionsMapping={resourceRolesPermissionsMapping}
        preventNoneRoleForAgents={preventNoneRoleForAgents}
        accessControlList={specificAccessByAgent}
        defaultRole={defaultRole}
        agents={agents}
        canBeSharedWithAgent={canBeSharedWithAgent}
        labels={labels.dialog}
        hasWriteSecurityPermission={hasWriteSecurityPermission}
        specificSharingRestriction={specificSharingRestriction}
        onConfirmChanges={onConfirmChanges}
        closeDialog={closeDialog}
        allRoles={allRoles}
        allPermissions={allPermissions}
        defaultAccessScope={defaultAccessScope}
      />
    </div>
  );
};
RolesEditionButton.propTypes = {
  /**
   *  Defines the RolesEditionButton's form:
   *  - true : the button is round shaped and has a share icon instead of title
   *  - false (default value): the button is contained and has a title
   */
  isIconButton: PropTypes.bool,
  /**
   *  Defines if current user has write security permission on the resource
   * - true : selectors are enabled and share button is visible
   * - false : selectors and share button are hidden
   */
  hasWriteSecurityPermission: PropTypes.bool,
  /**
   * *  Defines restriction for sharing the resource
   */
  specificSharingRestriction: PropTypes.string,
  /**
   *  Defines the RolesEditionButton's state:
   *  - true : the button is disabled (the tooltip will guide users on how to enable the button)
   *  - false : the button is enabled
   */
  disabled: PropTypes.bool,
  /**
   * List of all users or users groups in the workspace
   */
  agents: PropTypes.array.isRequired,
  /**
   * Function that checks if the resource can be shared with the user
   * - returns null if the resource can be shared with the user
   * - returns a string (reason) if the resource cannot be shared with the user
   */
  canBeSharedWithAgent: PropTypes.func,
  /**
   * List of users or users groups having specific access to the resource
   */
  specificAccessByAgent: PropTypes.array.isRequired,
  /**
   * List of all roles with corresponding labels
   */
  allRoles: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    }).isRequired
  ),
  /**
   * List of all permissions with corresponding labels
   */
  allPermissions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    }).isRequired
  ),
  /**
   * Object representing the mapping between roles (as keys) and permissions (as values)
   */
  resourceRolesPermissionsMapping: PropTypes.object.isRequired,
  /**
   * If enabled, do not display role "none" in the roles lists for agents
   */
  preventNoneRoleForAgents: PropTypes.bool,
  /**
   * Role granted to all users by default
   */
  defaultRole: PropTypes.string,
  /**
   * Name of general access scope (e.g., name of chosen workspace)
   */
  defaultAccessScope: PropTypes.string.isRequired,
  /**
   * Function that change specific user's access to the resource
   */
  onConfirmChanges: PropTypes.func.isRequired,
  /**
   * Structure:
   * <pre>
   *   {
          button : {
              title: 'string',
              tooltip: 'string'
          },
          dialog: {
              title: 'string',
              addPeople: 'string',
              cancel: 'string',
              done: 'string',
              share: 'string',
              noAdminError: 'string',
              userSelected: 'string',
              usersAccess: 'string',
              disabledUserTooltip: 'function',
              generalAccess: 'string',
              removeAccess: 'string',
              add: 'object',
              editor: {
                helperText: 'object'
              },
              roles: 'object',
              permissions: 'object',
          },
      }
   * </pre>
   */
  labels: PropTypes.shape({
    button: PropTypes.shape({
      title: PropTypes.string,
      tooltip: PropTypes.string,
    }),
    dialog: PropTypes.object.isRequired,
  }),
};
