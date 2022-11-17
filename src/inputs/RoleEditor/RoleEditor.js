// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Grid, Typography, Avatar, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { SelectWithAction } from '../SelectWithAction';
import { DefaultAvatar } from '../../misc';

const useStyles = makeStyles((theme) => ({
  agentGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginLeft: 0,
  },
  rolesEditor: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  nameGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
export const RoleEditor = ({
  agentName,
  agentAccess,
  allRoles,
  icon,
  onOptionSelected,
  isReadOnly,
  actions,
  helperText,
}) => {
  const classes = useStyles();
  const avatar = icon ? <Avatar>{icon}</Avatar> : <DefaultAvatar userName={agentName} />;
  return (
    <Grid data-cy={`role-editor-${agentName.replace(/[@.]/g, '')}`} item xs={12} className={classes.rolesEditor}>
      <Grid item xs={7} className={classes.agentGroup}>
        {avatar}
        <div className={classes.nameGroup}>
          <Typography data-cy="role-editor-agent-name" variant="body1">
            {agentName}
          </Typography>
          {helperText != null && (
            <Typography data-cy="role-editor-helper-text" variant="body2" color="textSecondary">
              {helperText[agentAccess]}
            </Typography>
          )}
        </div>
      </Grid>
      <Grid item xs={5}>
        <SelectWithAction
          isReadOnly={isReadOnly}
          options={allRoles}
          selectedOption={agentAccess}
          onOptionSelected={onOptionSelected}
          actions={actions}
        />
      </Grid>
    </Grid>
  );
};
RoleEditor.propTypes = {
  /**
   *  User's ou workspace's name or identifier
   */
  agentName: PropTypes.string.isRequired,
  /**
   *  Role already granted to user or workspace
   */
  agentAccess: PropTypes.string,
  /**
   *  Function that handles change of user's access
   */
  onOptionSelected: PropTypes.func.isRequired,
  /**
   * List of all roles and corresponding labels
   */
  allRoles: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ),
  /**
   * An icon to display for workspaces or users' groups; individual users are represented by DefaultAvatar component
   */
  icon: PropTypes.any,
  /**
   *  Defines whether user can edit or only see granted role
   */
  isReadOnly: PropTypes.bool,
  /**
   *  Additional actions to perform in the editor (e.g., remove specific access)
   */
  actions: PropTypes.array,
  /**
   *  List of detailed description of each role to display when changing access
   */
  helperText: PropTypes.object,
};

RoleEditor.defaultProps = {
  actions: [],
  isReadOnly: false,
  agentAccess: null,
  helperText: null,
};
