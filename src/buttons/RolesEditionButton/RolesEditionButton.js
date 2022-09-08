// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip, Fade } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import { RolesEditionDialog } from './components';

export const RolesEditionButton = ({
  labels,
  isIconButton,
  agents,
  resourceRolesPermissionsMapping,
  isReadOnly,
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
    <Button data-cy="share-scenario-button" size="medium" variant="outlined" onClick={openDialog} color="primary">
      {buttonTitle}
    </Button>
  );
  return (
    <div>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title={labels.button?.tooltip ?? 'Modify access'}
      >
        {buttonContent}
      </Tooltip>
      <RolesEditionDialog
        open={open}
        resourceRolesPermissionsMapping={resourceRolesPermissionsMapping}
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
    })
  ),
  /**
   * List of all permissions with corresponding labels
   */
  allPermissions: PropTypes.object.isRequired,
  /**
   * List of all permissions with corresponding roles
   */
  resourceRolesPermissionsMapping: PropTypes.object.isRequired,
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
              userSelected: 'string',
              workspace: 'string',
              roles: 'object',
              usersAccess: 'string',
              defaultRole: 'string',
              removeAccess: 'string',
              editor: {
                helperText: 'object'
              },
              add: 'object',
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
  defaultRole: '',
  labels: {
    button: {
      title: 'Share',
      tooltip: 'Modify access',
    },
  },
};
