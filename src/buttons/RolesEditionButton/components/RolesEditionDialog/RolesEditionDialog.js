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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { RoleEditor } from '../../../../inputs';
import PersonIcon from '@material-ui/icons/Person';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    marginRight: '4px',
    marginBottom: '4px',
  },
  chip: {
    margin: '3px',
  },
  textDisabled: {
    color: theme.palette.text.disabled,
  },
  rolesEditorContainer: {
    maxHeight: '300px',
    overflow: 'auto',
  },
}));
const RolesEditionDialog = ({
  labels,
  isReadOnly,
  scenarioRolesPermissionsMapping,
  onConfirmChanges,
  users,
  specificRolesByAgent,
  defaultAccess,
  open,
  closeDialog,
  scenarioId,
}) => {
  const classes = useStyles();
  const allRoles = Object.keys(scenarioRolesPermissionsMapping);
  const [isFirstScreenShown, setIsFirstScreenShown] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);

  const [grantedRoles, setGrantedRoles] = useState([]);
  const defaultAccessRoles = [{ id: 'default', roles: defaultAccess }];
  useEffect(() => {
    setGrantedRoles(specificRolesByAgent.concat(defaultAccessRoles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioId]);

  const [agentsWithoutRoles, setAgentsWithoutRoles] = useState([]);
  const getAgentsWithoutRoles = (accessList) => {
    return users.filter((user) => !accessList.some((access) => access.id === user.id));
  };
  useEffect(() => {
    setAgentsWithoutRoles(getAgentsWithoutRoles(grantedRoles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grantedRoles]);

  const handleChangeAgent = (newAgent) => {
    if (!isReadOnly) {
      setSelectedAgent(newAgent);
      setIsFirstScreenShown(false);
    }
  };

  const cancelAddNewSpecificAccess = () => {
    setIsFirstScreenShown(true);
    setGrantedRoles(grantedRoles.filter((agent) => agent.id !== selectedAgent.id));
    setSelectedAgent(null);
  };
  const confirmAddNewSpecificAccess = () => {
    setIsFirstScreenShown(true);
    setSelectedAgent(null);
  };
  const cancelShareScenario = () => {
    setGrantedRoles(specificRolesByAgent.concat(defaultAccessRoles));
    closeDialog();
  };

  const [grantedPermissions, setGrantedPermissions] = useState([]);
  const [notGrantedPermissions, setNotGrantedPermissions] = useState([]);
  const getGrantedOrNotGrantedPermissions = (isRoleGranted) => {
    const agentsGrantedRoles = grantedRoles.find((agent) => agent.id === selectedAgent.id)?.roles ?? defaultAccess;
    const agentsNotGrantedRoles = allRoles.filter((role) => !agentsGrantedRoles.includes(role));

    const filteredPermissions = new Set(
      (isRoleGranted ? agentsGrantedRoles : agentsNotGrantedRoles)
        .map((role) => scenarioRolesPermissionsMapping[role])
        .flatMap((permission) => permission)
    );
    return Array.from(filteredPermissions);
  };
  useEffect(() => {
    if (!isFirstScreenShown) {
      setGrantedPermissions(getGrantedOrNotGrantedPermissions(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAgent, grantedRoles]);

  useEffect(() => {
    if (grantedPermissions && !isFirstScreenShown)
      setNotGrantedPermissions(
        getGrantedOrNotGrantedPermissions(false).filter((permission) => !grantedPermissions.includes(permission))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grantedPermissions]);

  const addRoleInList = (agent, value) => {
    return grantedRoles.map((user) =>
      user.id === agent.id
        ? {
            id: user.id,
            roles: [...user.roles, value],
          }
        : user
    );
  };
  const removeRoleFromList = (agent, value) => {
    return grantedRoles.map((user) =>
      user.id === agent.id
        ? {
            id: user.id,
            roles: user.roles.filter((role) => role !== value),
          }
        : user
    );
  };
  const addNewAgentToAccessControlList = (agent, value) => {
    return [
      ...grantedRoles,
      {
        id: agent.id,
        roles: value,
      },
    ];
  };
  const removeSpecificAccess = (agent) => {
    setGrantedRoles(grantedRoles.filter((user) => user.id !== agent.id));
  };
  const handleCheckRole = (event, agent) => {
    const hasAgentGrantedRoles = grantedRoles.some((user) => user.id === agent.id);
    if (event.target.checked) {
      setGrantedRoles(
        hasAgentGrantedRoles
          ? addRoleInList(agent, event.target.value)
          : addNewAgentToAccessControlList(agent, [event.target.value])
      );
    } else {
      agent.roles.length !== 1
        ? setGrantedRoles(removeRoleFromList(agent, event.target.value))
        : removeSpecificAccess(agent);
    }
  };

  const confirmChangeAccessList = () => {
    const scenarioSecurity = {
      accessControlList: grantedRoles.filter((agent) => agent.id !== 'default'),
      default: grantedRoles.find((agent) => agent.id === 'default').roles,
    };
    onConfirmChanges(scenarioSecurity);
    closeDialog();
  };
  const personIcon = <PersonIcon className={classes.textDisabled} />;
  const workspaceIcon = <DesktopMacIcon className={classes.textDisabled} />;
  const dialogContent = isFirstScreenShown ? (
    <DialogContent>
      <Grid container spacing={2}>
        {!isReadOnly && (
          <Grid item xs={12}>
            <Autocomplete
              data-cy="share-scenario-dialog-agents-select"
              ListboxProps={{ 'data-cy': 'share-scenario-dialog-agents-select-options' }}
              freeSolo
              disableClearable={true}
              options={agentsWithoutRoles}
              value={selectedAgent?.id}
              onChange={(event, agent) => handleChangeAgent(agent)}
              getOptionLabel={(option) => (option.id ? option.id : '')}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} placeholder={labels.addPeople} label={labels.addPeople} variant="filled" />
              )}
            />
          </Grid>
        )}
        {grantedRoles.length > 0 && (
          <Grid item xs={12} className={classes.rolesEditorContainer}>
            <Typography variant="subtitle1">{labels.editor.usersAccess}</Typography>
            {grantedRoles.map(
              (agent) =>
                agent.id !== 'default' && (
                  <RoleEditor
                    key={agent.id}
                    agent={agent.id}
                    agentRoles={agent.roles}
                    allRoles={allRoles}
                    icon={personIcon}
                    isRemoveAccessAvailable={true}
                    removeAccessLabel={labels.editor.removeAccess}
                    onRoleChecked={(event) => handleCheckRole(event, agent)}
                    onRemoveAccess={() => removeSpecificAccess(agent)}
                    labels={labels.roles}
                    isReadOnly={isReadOnly}
                  />
                )
            )}
          </Grid>
        )}
        <Grid item xs={12} className={classes.rolesEditorContainer}>
          <Typography variant="subtitle1">{labels.editor.defaultAccess}</Typography>
          <RoleEditor
            agent={labels.workspace}
            agentRoles={grantedRoles.find((agent) => agent.id === 'default')?.roles || []}
            allRoles={allRoles}
            icon={workspaceIcon}
            labels={labels.roles}
            isReadOnly={isReadOnly}
            onRoleChecked={(event) =>
              handleCheckRole(
                event,
                grantedRoles.find((agent) => agent?.id === 'default')
              )
            }
            isRemoveAccessAvailable={false}
          />
        </Grid>
      </Grid>
      <DialogActions className={classes.dialogActions}>
        <Button data-cy="share-scenario-dialog-first-cancel-button" onClick={cancelShareScenario} color="primary">
          {labels.cancel}
        </Button>
        {!isReadOnly && (
          <Button
            data-cy="share-scenario-dialog-submit-button"
            onClick={confirmChangeAccessList}
            color="primary"
            variant="contained"
          >
            {labels.done}
          </Button>
        )}
      </DialogActions>
    </DialogContent>
  ) : (
    <DialogContent>
      <Divider />
      <Autocomplete
        disabled={true}
        data-cy="share-scenario-dialog-disabled-agents-select"
        options={users}
        getOptionLabel={(option) => (option.id ? option.id : '')}
        value={selectedAgent}
        getOptionSelected={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selectedAgent.id}
            label={labels.userSelected}
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{labels.roles.label}</Typography>
          <FormGroup>
            {allRoles.map((role) => (
              <FormControlLabel
                style={{ marginLeft: '0px' }}
                key={role}
                control={
                  <Checkbox
                    data-cy={`share-scenario-dialog-roles-checkbox-${role}`}
                    value={role}
                    checked={
                      grantedRoles.find((agent) => agent.id === selectedAgent.id)?.roles.includes(role) ||
                      grantedRoles.find((agent) => agent.id === 'default')?.roles.includes(role)
                    }
                    disabled={grantedRoles.find((agent) => agent.id === 'default')?.roles.includes(role)}
                    onChange={(event) =>
                      handleCheckRole(
                        event,
                        grantedRoles.find((agent) => agent.id === selectedAgent.id) || selectedAgent
                      )
                    }
                    color="secondary"
                  />
                }
                label={labels.roles[role]}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" variant="middle" />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle2">{labels.permissions.granted}</Typography>
          {grantedPermissions.map((permission) => (
            <Chip
              data-cy={`share-scenario-dialog-granted-permission-chip-${permission}`}
              key={permission}
              color="secondary"
              label={labels.permissions[permission]}
              className={classes.chip}
            />
          ))}
          <Typography variant="subtitle2">{labels.permissions.notGranted}</Typography>
          {notGrantedPermissions.map((permission) => (
            <Chip
              data-cy={`share-scenario-dialog-not-granted-permission-chip-${permission}`}
              key={permission}
              disabled
              label={labels.permissions[permission]}
              className={classes.chip}
            />
          ))}
        </Grid>
      </Grid>
      <DialogActions>
        <Button
          data-cy="share-scenario-dialog-second-cancel-button"
          onClick={cancelAddNewSpecificAccess}
          color="primary"
        >
          {labels.cancel}
        </Button>
        <Button
          id="share"
          data-cy="share-scenario-dialog-confirm-add-access-button"
          onClick={confirmAddNewSpecificAccess}
          color="primary"
          variant="contained"
        >
          {labels.done}
        </Button>
      </DialogActions>
    </DialogContent>
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
          <IconButton onClick={cancelAddNewSpecificAccess}>
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
    title: PropTypes.string.isRequired,
    addPeople: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    done: PropTypes.string.isRequired,
    userSelected: PropTypes.string.isRequired,
    workspace: PropTypes.string.isRequired,
    roles: PropTypes.shape({
      label: PropTypes.string.isRequired,
      commonroleadmin: PropTypes.string.isRequired,
      commonrolecreator: PropTypes.string.isRequired,
      commonrolereader: PropTypes.string.isRequired,
      scenariorolevalidator: PropTypes.string.isRequired,
      commonrolewriter: PropTypes.string.isRequired,
    }),
    editor: PropTypes.shape({
      usersAccess: PropTypes.string.isRequired,
      defaultAccess: PropTypes.string.isRequired,
      removeAccess: PropTypes.string.isRequired,
    }),
    permissions: PropTypes.shape({
      granted: PropTypes.string.isRequired,
      notGranted: PropTypes.string.isRequired,
      'acl.scenario.delete': PropTypes.string.isRequired,
      'acl.scenario.editParameters': PropTypes.string.isRequired,
      'acl.scenario.editPermissions': PropTypes.string.isRequired,
      'acl.scenario.editValidationStatus': PropTypes.string.isRequired,
      'acl.scenario.launch': PropTypes.string.isRequired,
      'acl.scenario.rename': PropTypes.string.isRequired,
      'acl.scenario.view': PropTypes.string.isRequired,
      'acl.scenario.viewPermissions': PropTypes.string.isRequired,
      'acl.scenario.viewResults': PropTypes.string.isRequired,
    }),
  }),
  isReadOnly: PropTypes.bool.isRequired,
  scenarioRolesPermissionsMapping: PropTypes.object.isRequired,
  onConfirmChanges: PropTypes.func.isRequired,
  specificRolesByAgent: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  defaultAccess: PropTypes.array.isRequired,
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  scenarioId: PropTypes.string.isRequired,
};
export default RolesEditionDialog;
