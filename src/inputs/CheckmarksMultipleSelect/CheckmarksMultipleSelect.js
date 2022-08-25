// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useState } from 'react';
import {
  FormControl,
  Select,
  Divider,
  Checkbox,
  Button,
  makeStyles,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  multipleSelect: {
    width: '100%',
  },
  removeButton: {
    color: theme.palette.error.main,
    textTransform: 'none',
    fontSize: theme.typography.body1.fontSize,
    display: 'flex',
    justifyContent: 'left',
  },
  menuList: {
    paddingRight: 0,
  },
  menuItem: {
    marginLeft: 0,
    marginRight: 0,
  },
}));
export const CheckmarksMultipleSelect = ({
  labels,
  roles,
  agentRoles,
  onRoleChecked,
  isRemoveAccessAvailable,
  removeAccessLabel,
  onRemoveAccess,
  isReadOnly,
}) => {
  const classes = useStyles();
  const [grantedRoles, setGrantedRoles] = useState(agentRoles);
  useEffect(() => {
    setGrantedRoles(agentRoles);
  }, [agentRoles]);

  return (
    <div className={classes.multipleSelect}>
      <FormControl variant="outlined" fullWidth={true}>
        <Select
          multiple
          disabled={isReadOnly}
          renderValue={(selected) => selected.map((role) => labels[role]).join(', ')}
          value={grantedRoles}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            getContentAnchorEl: null,
          }}
        >
          <FormGroup className={classes.menuList}>
            {roles.map((role) => (
              <FormControlLabel
                key={role}
                className={classes.menuItem}
                control={<Checkbox checked={grantedRoles.includes(role)} value={role} onChange={onRoleChecked} />}
                label={labels[role]}
              />
            ))}
          </FormGroup>
          {isRemoveAccessAvailable && (
            <div>
              <Divider />
              <Button
                size="large"
                className={classes.removeButton}
                fullWidth={true}
                startIcon={<DeleteForeverIcon />}
                onClick={onRemoveAccess}
              >
                {removeAccessLabel}
              </Button>
            </div>
          )}
        </Select>
      </FormControl>
    </div>
  );
};
CheckmarksMultipleSelect.propTypes = {
  roles: PropTypes.array.isRequired,
  agentRoles: PropTypes.array.isRequired,
  onRoleChecked: PropTypes.func.isRequired,
  isRemoveAccessAvailable: PropTypes.bool.isRequired,
  removeAccessLabel: PropTypes.string,
  onRemoveAccess: PropTypes.func,
  labels: PropTypes.object.isRequired,
  isReadOnly: PropTypes.bool.isRequired,
};
