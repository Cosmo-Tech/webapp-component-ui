// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RoleEditor } from '../../../../inputs';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { RolesAddingDialog } from './components';

const useStyles = makeStyles((theme) => ({
  rolesEditorContainer: {
    maxHeight: '300px',
    overflow: 'auto',
  },
  removeButton: {
    color: theme.palette.error.main,
  },
}));

const ADMIN_ROLE = 'admin';
const sortById = (agentA, agentB) => (agentA.id < agentB.id ? -1 : 1);

export const RolesEditionDialog = ({
  labels,
  isReadOnly,
  resourceRolesPermissionsMapping,
  preventNoneRoleForAgents,
  onConfirmChanges,
  agents,
  accessControlList,
  defaultRole,
  open,
  closeDialog,
  allRoles,
  allPermissions,
  defaultAccessScope,
}) => {
  const classes = useStyles();
  const [isFirstScreenShown, setIsFirstScreenShown] = useState(true);
  const [selectedAgentForRoleAddition, setSelectedAgentForRoleAddition] = useState(null);
  const [newAccessControlList, setNewAccessControlList] = useState([...accessControlList].sort(sortById));
  const [newDefaultRole, setNewDefaultRole] = useState(defaultRole || '');

  useEffect(() => {
    if (open) {
      setIsFirstScreenShown(true);
      setSelectedAgentForRoleAddition(null);
      setNewAccessControlList([...accessControlList].sort(sortById));
      setNewDefaultRole(defaultRole);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const agentsWithoutSpecificAccess = agents
    .filter((agent) => !newAccessControlList.some((aclAgent) => aclAgent.id === agent.id))
    .sort(sortById);

  const startAccessAddition = (newAgent) => {
    if (agents.find((agent) => agent.id === newAgent.id) === undefined) return;
    setSelectedAgentForRoleAddition(newAgent);
    setIsFirstScreenShown(false);
  };
  const cancelAccessAddition = () => {
    setIsFirstScreenShown(true);
    setSelectedAgentForRoleAddition(null);
  };
  const confirmAccessAddition = (newSpecificAccess) => {
    if (newSpecificAccess.role !== '') {
      setNewAccessControlList((newAccessControlList) => [...newAccessControlList, newSpecificAccess].sort(sortById));
    }
    setIsFirstScreenShown(true);
    setSelectedAgentForRoleAddition(null);
  };
  const removeSpecificAccess = (event, agentToRemove) => {
    event.stopPropagation();
    setNewAccessControlList((newAccessControlList) =>
      newAccessControlList.filter((agent) => agent.id !== agentToRemove.id)
    );
  };
  const editSpecificAccess = (event, agentToEdit) => {
    setNewAccessControlList(
      newAccessControlList.map((agent) =>
        agent.id === agentToEdit.id ? { id: agentToEdit.id, role: event.target.value } : agent
      )
    );
  };
  const confirmAndCloseDialog = () => {
    const scenarioSecurity = {
      accessControlList: newAccessControlList,
      default: newDefaultRole,
    };
    onConfirmChanges(scenarioSecurity);
    closeDialog();
  };

  const allRolesWithoutNone = allRoles.filter((role) => role.value.toLowerCase() !== 'none');
  const hasNoAdmin = newAccessControlList.filter((access) => access.role === ADMIN_ROLE).length === 0;
  const workspaceIcon = <DesktopMacIcon />;
  const dialogContent = isFirstScreenShown ? (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          {!isReadOnly && (
            <Grid item xs={12}>
              <Autocomplete
                data-cy="share-scenario-dialog-agents-select"
                ListboxProps={{ 'data-cy': 'share-scenario-dialog-agents-select-options' }}
                autoComplete
                disableClearable={true}
                options={agentsWithoutSpecificAccess}
                value={selectedAgentForRoleAddition?.id}
                onChange={(event, agent) => startAccessAddition(agent)}
                getOptionLabel={(option) => (option.id ? option.id : '')}
                getOptionSelected={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} placeholder={labels.addPeople} label={labels.addPeople} variant="filled" />
                )}
              />
            </Grid>
          )}
          <Grid item xs={12} className={classes.rolesEditorContainer}>
            <Typography variant="subtitle1">{labels.usersAccess}</Typography>
            {newAccessControlList.length > 0 &&
              newAccessControlList.map((agent) => (
                <RoleEditor
                  key={agent.id}
                  agentName={agent.id}
                  agentAccess={agent.role}
                  allRoles={preventNoneRoleForAgents ? allRolesWithoutNone : allRoles}
                  onOptionSelected={(event) => editSpecificAccess(event, agent)}
                  isReadOnly={isReadOnly}
                  actions={[
                    {
                      id: 'remove_specific_access',
                      label: labels.removeAccess,
                      classes: classes.removeButton,
                      icon: <DeleteForeverIcon />,
                      onClick: (event) => removeSpecificAccess(event, agent),
                    },
                  ]}
                />
              ))}
          </Grid>
          <Grid container>
            {hasNoAdmin && (
              <Typography data-cy="no-admin-error-message" variant="caption" color="error" paragraph={true}>
                {labels.noAdminError}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} className={classes.rolesEditorContainer}>
            <Typography variant="subtitle1">{labels.generalAccess}</Typography>
            <RoleEditor
              agentName={defaultAccessScope}
              agentAccess={newDefaultRole}
              helperText={labels.editor.helperText}
              allRoles={allRoles}
              icon={workspaceIcon}
              isReadOnly={isReadOnly}
              onOptionSelected={(event) => setNewDefaultRole(event.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button data-cy="share-scenario-dialog-first-cancel-button" onClick={closeDialog} color="primary">
          {labels.cancel}
        </Button>
        {!isReadOnly && (
          <Button
            data-cy="share-scenario-dialog-submit-button"
            onClick={confirmAndCloseDialog}
            color="primary"
            variant="contained"
            disabled={hasNoAdmin}
          >
            {labels.share}
          </Button>
        )}
      </DialogActions>
    </>
  ) : (
    <RolesAddingDialog
      selectedAgent={selectedAgentForRoleAddition}
      allRoles={preventNoneRoleForAgents ? allRolesWithoutNone : allRoles}
      allPermissions={allPermissions}
      defaultRole={newDefaultRole}
      rolesPermissionsMapping={resourceRolesPermissionsMapping}
      onCancel={cancelAccessAddition}
      onConfirm={confirmAccessAddition}
      labels={labels.add}
    />
  );

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closeDialog();
    }
  };
  return (
    <Dialog
      data-cy="share-scenario-dialog"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle data-cy="share-scenario-dialog-title">
        {!isFirstScreenShown && (
          <IconButton onClick={cancelAccessAddition}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {labels.title}
      </DialogTitle>
      {dialogContent}
    </Dialog>
  );
};
RolesEditionDialog.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string,
    addPeople: PropTypes.string,
    cancel: PropTypes.string,
    share: PropTypes.string,
    noAdminError: PropTypes.string,
    userSelected: PropTypes.string,
    usersAccess: PropTypes.string,
    generalAccess: PropTypes.string,
    removeAccess: PropTypes.string,
    add: PropTypes.object,
    editor: PropTypes.shape({
      helperText: PropTypes.object,
    }),
  }),
  isReadOnly: PropTypes.bool,
  resourceRolesPermissionsMapping: PropTypes.object.isRequired,
  preventNoneRoleForAgents: PropTypes.bool,
  onConfirmChanges: PropTypes.func.isRequired,
  accessControlList: PropTypes.array.isRequired,
  agents: PropTypes.array.isRequired,
  defaultRole: PropTypes.string,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  allRoles: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    }).isRequired
  ),
  allPermissions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    }).isRequired
  ),
  defaultAccessScope: PropTypes.string.isRequired,
};
RolesEditionDialog.defaultProps = {
  labels: {
    title: 'Share ',
    addPeople: 'Add people',
    cancel: 'Cancel',
    share: 'Share',
    noAdminError: 'The scenario must have at least one administrator',
    userSelected: 'Selected user',
    usersAccess: 'Users access',
    generalAccess: 'General access',
    removeAccess: 'Remove access',
    editor: {
      helperText: null,
    },
  },
  isReadOnly: false,
  preventNoneRoleForAgents: false,
  defaultRole: '',
};
