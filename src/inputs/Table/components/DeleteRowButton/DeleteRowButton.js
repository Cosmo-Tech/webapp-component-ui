// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../misc';
import { DontAskAgainDialog } from '../../../../dialogs';

export const DeleteRowButton = (props) => {
  const { onDeleteRow, label, disabled } = props;
  const [isOpen, setOpen] = useState(false);
  const switchDontAskAgainToDeleteRow = useCallback((isChecked) => {
    localStorage.setItem('dontAskAgainToDeleteRow', isChecked);
  }, []);
  const switchOpenValue = useCallback(() => {
    localStorage.getItem('dontAskAgainToDeleteRow') === 'true' ? onDeleteRow() : setOpen(!isOpen);
  }, [isOpen, onDeleteRow]);

  return (
    <>
      <FadingTooltip title={label} useSpan={true}>
        <IconButton
          onClick={switchOpenValue}
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
      <DontAskAgainDialog
        id="dontAskAgainDeleteRow"
        onClose={switchOpenValue}
        onConfirm={(isChecked) => {
          switchOpenValue();
          switchDontAskAgainToDeleteRow(isChecked);
          onDeleteRow();
        }}
        open={isOpen}
      ></DontAskAgainDialog>
    </>
  );
};

DeleteRowButton.propTypes = {
  /*
   * Function use to delete selected lines
   */
  onDeleteRow: PropTypes.func.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
  /*
   * Boolean to define if the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
};
