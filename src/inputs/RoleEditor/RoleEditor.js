// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Avatar, Tooltip } from '@mui/material';
import { DefaultAvatar } from '../../misc';
import { getIdentifierFromUserEmail } from '../../utils';
import { SelectWithAction } from '../SelectWithAction';

export const RoleEditor = ({
  agentName,
  agentAccess = null,
  allRoles,
  icon,
  onOptionSelected,
  isReadOnly = false,
  actions = [],
  helperText = null,
}) => {
  const avatar = icon ? <Avatar>{icon}</Avatar> : <DefaultAvatar userName={agentName} />;
  return (
    <Grid
      data-cy={`role-editor-${getIdentifierFromUserEmail(agentName)}`}
      size={12}
      sx={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}
    >
      <Grid size={7} sx={{ display: 'flex', alignItems: 'center', gap: '15px', marginLeft: 0 }}>
        {avatar}
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '80%' }}>
          <Tooltip title={agentName} arrow>
            <Typography
              data-cy="role-editor-agent-name"
              variant="body1"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textWrap: 'nowrap',
              }}
            >
              {agentName}
            </Typography>
          </Tooltip>
          {helperText != null && (
            <Typography data-cy="role-editor-helper-text" variant="body2" color="textSecondary">
              {helperText[agentAccess]}
            </Typography>
          )}
        </div>
      </Grid>
      <Grid size={5}>
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
