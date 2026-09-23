// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DesktopMacOutlinedIcon from '@mui/icons-material/DesktopMacOutlined';
import GroupIcon from '@mui/icons-material/Group';
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
  Autocomplete,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { RoleEditor } from '../../../../inputs';
import { FadingTooltip } from '../../../../misc';
import { getIdentifierFromUserEmail } from '../../../../utils';
import { RolesAddingDialog } from './components';

const PREFIX = 'RolesEditionDialog';

const classes = { removeButton: `${PREFIX}-removeButton` };

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.removeButton}`]: {
    color: theme.palette.error.main,
  },
}));

const DEFAULT_LABELS = {
  title: 'Share ',
  readOnlyTitle: 'Permissions for ',
  addPeople: 'Add people',
  cancel: 'Cancel',
  close: 'Close',
  share: 'Share',
  noAdminError: 'The scenario must have at least one administrator',
  userSelected: 'Selected user',
  usersAccess: 'Users access',
  generalAccess: 'General access',
  removeAccess: 'Remove access',
  editor: {
    helperText: null,
  },
};

const ADMIN_ROLE = 'admin';
const sortById = (agentA, agentB) => (agentA.id < agentB.id ? -1 : 1);

export const RolesEditionDialog = ({
  labels: tmpLabels,
  hasWriteSecurityPermission = true,
  specificSharingRestriction,
  canBeSharedWithAgent = () => null,
  resourceRolesPermissionsMapping,
  preventNoneRoleForAgents = false,
  onConfirmChanges,
  agents,
  accessControlList,
  defaultRole = '',
  open,
  closeDialog,
  allRoles,
  allPermissions,
  defaultAccessScope,
}) => {
  const [isFirstScreenShown, setIsFirstScreenShown] = useState(true);
  const [selectedAgentForRoleAddition, setSelectedAgentForRoleAddition] = useState(null);
  const [newAccessControlList, setNewAccessControlList] = useState([...accessControlList].sort(sortById));
  const [newDefaultRole, setNewDefaultRole] = useState(defaultRole || '');
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  const hasGroups = useMemo(() => agents.some((agent) => agent.isGroup), [agents]);

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
  const defaultRoleForNewEntries =
    preventNoneRoleForAgents && newDefaultRole === 'none' ? allRolesWithoutNone?.[0]?.value : newDefaultRole;
  const hasNoAdmin = newAccessControlList.filter((access) => access.role === ADMIN_ROLE).length === 0;
  const workspaceIcon = <DesktopMacOutlinedIcon />;

  let dialogContent = (
    <RolesAddingDialog
      selectedAgent={selectedAgentForRoleAddition}
      allRoles={preventNoneRoleForAgents ? allRolesWithoutNone : allRoles}
      allPermissions={allPermissions}
      defaultRole={defaultRoleForNewEntries}
      rolesPermissionsMapping={resourceRolesPermissionsMapping}
      onCancel={cancelAccessAddition}
      onConfirm={confirmAccessAddition}
      labels={labels.add}
    />
  );

  if (isFirstScreenShown) {
    const isAutocompleteDisabled = specificSharingRestriction != null;
    const autocomplete = (
      <Autocomplete
        data-cy="share-scenario-dialog-agents-select"
        ListboxProps={{ 'data-cy': 'share-scenario-dialog-agents-select-options' }}
        getOptionDisabled={(option) => canBeSharedWithAgent(option) != null}
        autoComplete
        disabled={isAutocompleteDisabled}
        disableClearable={true}
        options={agentsWithoutSpecificAccess}
        value={selectedAgentForRoleAddition?.id}
        onChange={(event, agent) => startAccessAddition(agent)}
        getOptionLabel={(option) => (option.id ? option.id : '')}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField {...params} placeholder={labels.addPeople} label={labels.addPeople} variant="filled" />
        )}
        renderOption={(props, option) => {
          // eslint-disable-next-line react/prop-types
          const { key, ...optionProps } = props;
          const tooltip = canBeSharedWithAgent(option);
          const isDisabled = tooltip != null;
          // Restore pointerEvents for mouse hovering on disabled elements, but prevent click propagation
          const disabledHoverSx = isDisabled ? { pointerEvents: 'auto' } : undefined;
          const stopPropagationIfDisabled = isDisabled ? (event) => event.stopPropagation() : undefined;
          return (
            <Box
              key={key}
              component="li"
              {...optionProps}
              data-cy={`share-scenario-dialog-agents-select-${getIdentifierFromUserEmail(option.id)}`}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {hasGroups && (
                <FadingTooltip
                  title={option.isGroup ? (option.users ?? []).join('\n') : undefined}
                  disableInteractive
                  placement="right"
                  useSpan
                  spanProps={{ style: { display: 'flex', alignItems: 'center' } }}
                  slotProps={{ tooltip: { sx: { whiteSpace: 'pre-line' } } }}
                >
                  <Box
                    component="span"
                    sx={{
                      display: 'inline-flex',
                      flexShrink: 0,
                      width: 20,
                      mr: 1,
                      ...disabledHoverSx,
                    }}
                    onClick={stopPropagationIfDisabled}
                  >
                    {option.isGroup && <GroupIcon fontSize="small" />}
                  </Box>
                </FadingTooltip>
              )}
              <FadingTooltip title={tooltip} placement="right" useSpan>
                <Box
                  component="span"
                  sx={{
                    flexGrow: 1,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    ...disabledHoverSx,
                  }}
                  onClick={stopPropagationIfDisabled}
                >
                  {option.id}
                </Box>
              </FadingTooltip>
            </Box>
          );
        }}
      />
    );

    const autocompleteWithOptionalTooltip = isAutocompleteDisabled ? (
      <FadingTooltip title={specificSharingRestriction}>{autocomplete}</FadingTooltip>
    ) : (
      autocomplete
    );

    dialogContent = (
      <>
        <DialogContent>
          <Grid container spacing={2}>
            {hasWriteSecurityPermission && <Grid size={12}>{autocompleteWithOptionalTooltip}</Grid>}
            <Grid sx={{ maxHeight: '300px', overflow: 'auto' }} size={12}>
              {' '}
              <Typography variant="subtitle1">{labels.usersAccess}</Typography>
              {newAccessControlList.length > 0 &&
                newAccessControlList.map((aclEntry) => {
                  const agent = agents.find((agent) => agent.id === aclEntry.id);
                  const groupMembers = agent?.isGroup ? (agent?.users ?? []) : null;
                  return (
                    <RoleEditor
                      key={aclEntry.id}
                      agentName={aclEntry.id}
                      agentAccess={aclEntry.role}
                      groupMembers={groupMembers}
                      allRoles={preventNoneRoleForAgents ? allRolesWithoutNone : allRoles}
                      onOptionSelected={(event) => editSpecificAccess(event, aclEntry)}
                      isReadOnly={!hasWriteSecurityPermission || specificSharingRestriction != null}
                      actions={[
                        {
                          id: 'remove_specific_access',
                          label: labels.removeAccess,
                          classes: classes.removeButton,
                          icon: <DeleteForeverIcon />,
                          onClick: (event) => removeSpecificAccess(event, aclEntry),
                        },
                      ]}
                    />
                  );
                })}
            </Grid>
            <Grid container>
              {hasNoAdmin && (
                <Typography data-cy="no-admin-error-message" variant="caption" color="error" sx={{ mb: 2 }}>
                  {labels.noAdminError}
                </Typography>
              )}
            </Grid>
            <Grid sx={{ maxHeight: '300px', overflow: 'auto' }} size={12}>
              <Typography variant="subtitle1">{labels.generalAccess}</Typography>
              <RoleEditor
                agentName={defaultAccessScope}
                agentAccess={newDefaultRole}
                helperText={labels.editor.helperText}
                allRoles={allRoles}
                icon={workspaceIcon}
                isReadOnly={!hasWriteSecurityPermission || specificSharingRestriction != null}
                onOptionSelected={(event) => setNewDefaultRole(event.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button data-cy="share-scenario-dialog-first-cancel-button" onClick={closeDialog} color="primary">
            {hasWriteSecurityPermission ? labels.cancel : labels.close}
          </Button>
          {hasWriteSecurityPermission && (
            <FadingTooltip title={specificSharingRestriction}>
              <Button
                data-cy="share-scenario-dialog-submit-button"
                onClick={confirmAndCloseDialog}
                color="primary"
                variant="contained"
                disabled={hasNoAdmin || specificSharingRestriction != null}
              >
                {labels.share}
              </Button>
            </FadingTooltip>
          )}
        </DialogActions>
      </>
    );
  }

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closeDialog();
    }
  };

  return (
    <StyledDialog
      data-cy="share-scenario-dialog"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle data-cy="share-scenario-dialog-title">
        {!isFirstScreenShown && (
          <IconButton onClick={cancelAccessAddition} size="large">
            <ArrowBackIcon />
          </IconButton>
        )}
        {hasWriteSecurityPermission ? labels.title : labels.readOnlyTitle}
      </DialogTitle>
      {dialogContent}
    </StyledDialog>
  );
};

RolesEditionDialog.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string,
    readOnlyTitle: PropTypes.string,
    addPeople: PropTypes.string,
    cancel: PropTypes.string,
    close: PropTypes.string,
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
  hasWriteSecurityPermission: PropTypes.bool,
  specificSharingRestriction: PropTypes.string,
  resourceRolesPermissionsMapping: PropTypes.object.isRequired,
  preventNoneRoleForAgents: PropTypes.bool,
  onConfirmChanges: PropTypes.func.isRequired,
  accessControlList: PropTypes.array.isRequired,
  agents: PropTypes.array.isRequired,
  canBeSharedWithAgent: PropTypes.func,
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
