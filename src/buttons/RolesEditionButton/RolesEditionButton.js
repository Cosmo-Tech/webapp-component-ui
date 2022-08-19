import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, Tooltip } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import RolesEditionDialog from './components/RolesEditionDialog/RolesEditionDialog';

export const RolesEditionButton = ({
  labels,
  isIconButton,
  users,
  scenarioRolesPermissionsMapping,
  isReadOnly,
  onConfirmChanges,
  specificRolesByAgent,
  defaultAccess,
}) => {
  const [open, setOpen] = useState(false);
  const openDialog = () => {
    setOpen(true);
  };
  const closeDialog = () => setOpen(false);
  const buttonContent = isIconButton ? (
    <IconButton data-cy="share-scenario-button" size="medium" variant="outlined" onClick={openDialog} color="primary">
      <ShareIcon />
    </IconButton>
  ) : (
    <Button data-cy="share-scenario-button" size="medium" variant="outlined" onClick={openDialog} color="primary">
      {labels.button.title}
    </Button>
  );
  return (
    <div>
      <Tooltip arrow title={labels.button.tooltip}>
        <div>{buttonContent}</div>
      </Tooltip>
      <RolesEditionDialog
        open={open}
        scenarioRolesPermissionsMapping={scenarioRolesPermissionsMapping}
        specificRolesByAgent={specificRolesByAgent}
        users={users}
        labels={labels.dialog}
        isReadOnly={isReadOnly}
        onConfirmChanges={onConfirmChanges}
        closeDialog={closeDialog}
        defaultAccess={defaultAccess}
      />
    </div>
  );
};
RolesEditionButton.propTypes = {
  labels: PropTypes.shape({
    button: PropTypes.shape({
      title: PropTypes.string.isRequired,
      tooltip: PropTypes.string.isRequired,
    }),
    dialog: PropTypes.object.isRequired,
  }),
  isIconButton: PropTypes.bool.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
  specificRolesByAgent: PropTypes.array,
  users: PropTypes.array,
  defaultAccess: PropTypes.object,
  scenarioRolesPermissionsMapping: PropTypes.object,
  onConfirmChanges: PropTypes.func,
};
