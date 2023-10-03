// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../../../misc';

export const AddRowButton = (props) => {
  const { onAddRow, label, disabled } = props;
  return (
    <FadingTooltip title={label} useSpan={true}>
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
    </FadingTooltip>
  );
};

AddRowButton.propTypes = {
  /*
   * Function used to add a line after the last selected line
   */
  onAddRow: PropTypes.func.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
  /*
   * Boolean to define if the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
};
