// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { FormControl, Select, Divider, MenuItem, ListItemText, ListItemIcon } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CheckIcon from '@mui/icons-material/Check';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  selectWithAction: {
    width: '100%',
  },
  listItemIcon: {
    minWidth: '44px',
  },
}));

export const SelectWithAction = ({ options, selectedOption, onOptionSelected, isReadOnly, actions }) => {
  const classes = useStyles();

  return (
    <div className={classes.selectWithAction}>
      <FormControl variant="outlined" fullWidth={true}>
        <Select
          data-cy="select-with-action"
          variant="outlined"
          size="small"
          disabled={isReadOnly}
          value={selectedOption}
          onChange={onOptionSelected}
          renderValue={(value) => options.find((option) => option.value === value)?.label || value}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
            'data-cy': 'select-with-action-menu',
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              <ListItemIcon
                data-cy={`select-${option.value}-checked-icon`}
                className={classes.listItemIcon}
                style={selectedOption === option.value ? { visibility: 'visible' } : { visibility: 'hidden' }}
              >
                <CheckIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                data-cy={`select-option-${option.value}`}
                primary={options.find((optionFromList) => optionFromList.value === option.value).label ?? option.value}
              />
            </MenuItem>
          ))}
          {actions.length > 0 && <Divider />}
          <ul>
            {actions.map((action) => (
              <MenuItem key={action.id} className={action.classes} value={action.id} onClick={action.onClick}>
                <ListItemIcon className={classes.listItemIcon} style={{ color: 'inherit' }}>
                  {action.icon}
                </ListItemIcon>
                <ListItemText data-cy="select-action-name" primary={action.label} />
              </MenuItem>
            ))}
          </ul>
        </Select>
      </FormControl>
    </div>
  );
};
SelectWithAction.propTypes = {
  /**
   *  List of available options with corresponding labels
   */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string,
    })
  ),
  /**
   *  Preselected option (null by default)
   */
  selectedOption: PropTypes.string,
  /**
   *  Function that handles change of selected option
   */
  onOptionSelected: PropTypes.func,
  /**
   *  Defines whether user can edit or only see the resource's permissions (false by default)
   */
  isReadOnly: PropTypes.bool,
  /**
   *  Additional actions to perform on the options (e.g., remove)
   *  Each action object contains:
   *  - a label to display in the list
   *  - an action icon
   *  - a function to handle onClick event
   *  - classes with additional css
   */
  actions: PropTypes.array,
};
SelectWithAction.defaultProps = {
  selectedOption: null,
  actions: [],
  onOptionSelected: () => null,
  isReadOnly: false,
  labels: {},
};
