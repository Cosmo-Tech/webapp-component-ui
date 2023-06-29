// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../misc';

export const DeleteRowButton = (props) => {
  const { onDeleteRow, label, disabled } = props;
  return (
    <FadingTooltip title={label} useSpan={true}>
      <IconButton
        onClick={onDeleteRow}
        component="label"
        size="small"
        color="primary"
        data-cy="delete-rows-button"
        disabled={disabled}
        variant="text"
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </FadingTooltip>
  );
};

DeleteRowButton.propTypes = {
  /*
   * Function use to export a file from Table
   */
  onDeleteRow: PropTypes.func.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
  /*
   * Boolean to define is the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
};
