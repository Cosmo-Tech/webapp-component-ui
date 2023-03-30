// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import { RolesEditionDialog } from './components';
import { FadingTooltip } from '../../misc/FadingTooltip';

export const RolesEditionButton = ({
  labels,
  isIconButton,
  agents,
  resourceRolesPermissionsMapping,
  preventNoneRoleForAgents,
  isReadOnly,
  disabled,
  onConfirmChanges,
  specificAccessByAgent,
  defaultRole,
  allRoles,
  allPermissions,
  defaultAccessScope,
}) => {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const buttonTitle = labels.button?.title ?? 'Share';
  const buttonContent = isIconButton ? (
    <IconButton data-cy="share-scenario-button" size="medium" variant="outlined" onClick={openDialog} color="primary">
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
      <FadingTooltip title={labels.button?.tooltip ?? 'Modify access'}>{buttonContent}</FadingTooltip>
      <RolesEditionDialog
        open={open}
        resourceRolesPermissionsMapping={resourceRolesPermissionsMapping}
        preventNoneRoleForAgents={preventNoneRoleForAgents}
        accessControlList={specificAccessByAgent}
        defaultRole={defaultRole}
        agents={agents}
        labels={labels.dialog}
        isReadOnly={isReadOnly}
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
   *  Defines whether user can edit or only see the resource's permissions; false by default
   */
  isReadOnly: PropTypes.bool,
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
RolesEditionButton.defaultProps = {
  isIconButton: false,
  isReadOnly: false,
  disabled: false,
  preventNoneRoleForAgents: false,
  defaultRole: '',
  labels: {
    button: {
      title: 'Share',
      tooltip: 'Modify access',
    },
  },
};
