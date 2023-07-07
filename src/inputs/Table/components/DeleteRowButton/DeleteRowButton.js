// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useCallback, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../misc';
import { DontAskAgainDialog } from '../../../../dialogs';

export const DeleteRowButton = (props) => {
  const { onDeleteRow, labels, disabled, gridApi } = props;
  const [isOpen, setOpen] = useState(false);
  const switchDontAskAgainToDeleteRow = useCallback((isChecked) => {
    localStorage.setItem('dontAskAgainToDeleteRow', isChecked);
  }, []);
  const switchOpenValue = useCallback(() => {
    localStorage.getItem('dontAskAgainToDeleteRow') === 'true' ? onDeleteRow(gridApi) : setOpen(!isOpen);
  }, [gridApi, isOpen, onDeleteRow]);
  return (
    <>
      <FadingTooltip title={labels?.deleteRows} useSpan={true}>
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
          onDeleteRow(gridApi);
        }}
        open={isOpen}
        labels={labels?.dialog}
        confirmColor="error"
      ></DontAskAgainDialog>
    </>
  );
};

DeleteRowButton.propTypes = {
  /*
   * Function use to delete selected lines
   */
  onDeleteRow: PropTypes.func.isRequired,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      deleteRows: 'string',
      dialog: {
        title: 'string',
        body: 'string',
        cancel: 'string',
        confirm: 'string',
        checkbox: 'string',
      },
    }
   </pre>
   */
  labels: PropTypes.shape({
    deleteRows: PropTypes.string,
    dialog: {
      title: PropTypes.string,
      body: PropTypes.string,
      cancel: PropTypes.string,
      confirm: PropTypes.string,
      checkbox: PropTypes.string,
    },
  }),
  /*
   * Boolean to define if the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * AgGrid API, regroup all function to get and set data
   */
  gridApi: PropTypes.object,
};
