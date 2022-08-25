// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Grid, Typography, Avatar, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { CheckmarksMultipleSelect } from '../CheckmarksMultipleSelect';

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.textSecondary,
  },
  userGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginLeft: 0,
  },
  rolesEditor: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
    marginBottom: '15px',
  },
}));
export const RoleEditor = ({
  agent,
  agentRoles,
  allRoles,
  icon,
  onRoleChecked,
  removeAccessLabel,
  isRemoveAccessAvailable,
  onRemoveAccess,
  labels,
  isReadOnly,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} className={classes.rolesEditor}>
      <Grid item xs={7} className={classes.userGroup}>
        <Avatar className={classes.avatar}>{icon}</Avatar>
        <Typography data-cy="role-editor-agent-name" variant="body2">
          {agent}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <CheckmarksMultipleSelect
          isReadOnly={isReadOnly}
          roles={allRoles}
          agentRoles={agentRoles}
          onRoleChecked={onRoleChecked}
          removeAccessLabel={removeAccessLabel}
          isRemoveAccessAvailable={isRemoveAccessAvailable}
          onRemoveAccess={onRemoveAccess}
          labels={labels}
        />
      </Grid>
    </Grid>
  );
};
RoleEditor.propTypes = {
  agent: PropTypes.string.isRequired,
  agentRoles: PropTypes.array.isRequired,
  onRoleChecked: PropTypes.func.isRequired,
  allRoles: PropTypes.array.isRequired,
  icon: PropTypes.any.isRequired,
  isRemoveAccessAvailable: PropTypes.bool.isRequired,
  onRemoveAccess: PropTypes.func,
  labels: PropTypes.object.isRequired,
  removeAccessLabel: PropTypes.string,
  isReadOnly: PropTypes.bool.isRequired,
};
