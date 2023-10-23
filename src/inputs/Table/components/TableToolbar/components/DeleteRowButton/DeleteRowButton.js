// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../../../misc';

export const DeleteRowButton = (props) => {
  const { onDeleteRow, labels, disabled } = props;
  const spanProps = { style: { display: 'inline-block', height: '100%' } };

  return (
    <>
      <FadingTooltip title={labels} useSpan={true} spanProps={spanProps} disableInteractive={true}>
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
    </>
  );
};

DeleteRowButton.propTypes = {
  /*
   * Function used to delete selected lines
   */
  onDeleteRow: PropTypes.func.isRequired,
  /*
   * label of the button used for Tooltip
   */
  labels: PropTypes.string.isRequired,
  /*
   * Boolean to define if the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
};
