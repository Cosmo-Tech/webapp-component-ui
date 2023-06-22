// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export const AddRowButton = (props) => {
  const { onAddRow, label, disabled } = props;
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          onClick={onAddRow}
          component="label"
          size="small"
          color="primary"
          data-cy="add-row-button"
          disabled={disabled}
          variant="text"
        >
          <AddIcon fontSize="inherit" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

AddRowButton.propTypes = {
  /*
   * Function use to export a file from Table
   */
  onAddRow: PropTypes.func.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
  /*
   * Boolean to define is the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
};
