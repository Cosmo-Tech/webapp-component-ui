// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import {
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  Typography,
  FormControlLabel,
  Divider,
  Chip,
  makeStyles,
  RadioGroup,
  Radio,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';

const useStyle = makeStyles((theme) => ({
  chip: {
    margin: '3px',
  },
}));

const _sortGrantedPermissionsForRole = (rolesPermissionsMapping, allPermissions, selectedRole) => {
  const permissions = { granted: [], denied: [] };
  for (const permission of allPermissions) {
    rolesPermissionsMapping[selectedRole]?.includes(permission)
      ? permissions.granted.push(permission)
      : permissions.denied.push(permission);
  }
  return permissions;
};

export const RolesAddingDialog = ({
  selectedAgent,
  labels,
  allRoles,
  allPermissions,
  defaultRole,
  rolesPermissionsMapping,
  onCancel,
  onConfirm,
}) => {
  const classes = useStyle();
  const [selectedRole, setSelectedRole] = useState(defaultRole);
  const sortedPermissions = _sortGrantedPermissionsForRole(
    rolesPermissionsMapping,
    Object.keys(allPermissions),
    selectedRole
  );
  return (
    <>
      <DialogContent>
        <Autocomplete
          disabled={true}
          data-cy="share-scenario-dialog-disabled-agents-select"
          options={[selectedAgent]}
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
            {!selectedRole && (
              <Typography variant="body2" color="textSecondary">
                {labels.rolesHelperText}
              </Typography>
            )}
            <Typography variant="body1">{labels.rolesTitle}</Typography>
            <RadioGroup value={selectedRole} onChange={(event) => setSelectedRole(event.target.value)}>
              {allRoles.map((role) => (
                <FormControlLabel
                  key={role.value}
                  control={
                    <Radio
                      data-cy={`share-scenario-dialog-roles-checkbox-${role.value}`}
                      color="secondary"
                      value={role.value}
                      checkedIcon={<CheckIcon />}
                      icon={<CheckIcon style={{ visibility: 'hidden' }} />}
                    />
                  }
                  label={allRoles.find((option) => option.value === role.value).label ?? role.value}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item xs={1}>
            <Divider orientation="vertical" variant="middle" />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle2">{labels.grantedPermissions}</Typography>
            {sortedPermissions.granted.map((permission) => (
              <Chip
                data-cy={`share-scenario-dialog-granted-permission-chip-${permission}`}
                key={permission}
                color="secondary"
                label={allPermissions[permission] ?? permission}
                className={classes.chip}
              />
            ))}
            <Typography variant="subtitle2">{labels.deniedPermissions}</Typography>
            {sortedPermissions.denied.map((permission) => (
              <Chip
                data-cy={`share-scenario-dialog-not-granted-permission-chip-${permission}`}
                key={permission}
                disabled
                label={allPermissions[permission] ?? permission}
                className={classes.chip}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button data-cy="share-scenario-dialog-second-cancel-button" onClick={onCancel} color="primary">
          {labels.cancel}
        </Button>
        <Button
          id="share"
          data-cy="share-scenario-dialog-confirm-add-access-button"
          onClick={() => onConfirm({ id: selectedAgent.id, role: selectedRole })}
          color="primary"
          variant="contained"
          disabled={!selectedRole}
        >
          {labels.done}
        </Button>
      </DialogActions>
    </>
  );
};

RolesAddingDialog.propTypes = {
  /**
   * Object value describing the selected agent.
   */
  selectedAgent: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  /**
   *  Labels.
   *
   *  Structure:
   * <pre>
   *  {
        cancel: 'string',
        deniedPermissions: 'string',
        done: 'string',
        grantedPermissions: 'string',
        permissions:: dict by permission
        rolesTitle: 'string',
        roles: dict by role,
        userSelected: 'string',
   *  }
   * </pre>
   */
  labels: PropTypes.shape({
    cancel: PropTypes.string,
    deniedPermissions: PropTypes.string,
    done: PropTypes.string,
    grantedPermissions: PropTypes.string,
    rolesTitle: PropTypes.string,
    rolesHelperText: PropTypes.string,
    userSelected: PropTypes.string,
  }),
  allRoles: PropTypes.array.isRequired,
  allPermissions: PropTypes.object.isRequired,
  defaultRole: PropTypes.string.isRequired,
  rolesPermissionsMapping: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};
RolesAddingDialog.defaultProps = {
  labels: {
    cancel: 'Cancel',
    deniedPermissions: 'Permissions not granted',
    done: 'Done',
    grantedPermissions: 'Permissions granted',
    rolesTitle: 'Roles',
    userSelected: 'User selected',
    rolesHelperText: 'Select one role',
  },
};
