// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

export const DontAskAgainDialog = ({ id, open, onClose, labels, onConfirm }) => {
  const [isChecked, setIsChecked] = useState(false);

  const confirm = () => {
    onConfirm(isChecked);
    close();
  };
  const close = () => {
    setIsChecked(false);
    onClose();
  };
  const changeIsChecked = (event) => setIsChecked(event.target.checked);

  return (
    <Dialog open={open} aria-labelledby={id + '-confirm-dialog-title'} maxWidth={'xs'} fullWidth={true} onClose={close}>
      <DialogTitle data-cy={id + '-confirm-dialog-title'} id={id + '-confirm-dialog-title'}>
        {labels.title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">{labels.body}</Typography>
        <FormControlLabel
          control={
            <Checkbox
              data-cy={id + '-dontAskAgain-checkbox'}
              checked={isChecked}
              onChange={changeIsChecked}
              id={id + '-dontAskAgain-checkbox'}
              color="primary"
            />
          }
          label={labels.checkbox}
        />
      </DialogContent>
      <DialogActions>
        {/* TODO Use button1Props and button2Props to enable variants and colors */}
        <Button autoFocus data-cy={id + '-cancel-button'} id={id + '-cancel-button'} onClick={close} color="primary">
          {labels.cancel}
        </Button>
        <Button data-cy={id + '-confirm-button'} id={id + '-confirm-button'} onClick={confirm} color="primary">
          {labels.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DontAskAgainDialog.propTypes = {
  /**
   * Dialog's id
   */
  id: PropTypes.string,
  /**
   *  ## Define the DoNoAskAgainDialog's state:
   *  - true : the dialog is opened
   *  - false : the dialog is closed
   */
  open: PropTypes.bool,
  /**
   * ## Function used to close the dialog
   */
  onClose: PropTypes.func.isRequired,
  /**
   *  ## Function used when buttonConfirm is clicked
   */
  onConfirm: PropTypes.func.isRequired,
  /**
   *  ## Labels for dialog
   * Structure:
   * <pre>
   * {
   *  title: 'This is a title',
   *  body: 'This is a body',
   *  buttonCancel: 'Cancel',
   *  buttonConfirm: 'Confirm',
   *  checkboxDontAskAgain: 'Do not ask again"
   *}
   *</pre>
   */
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
    checkbox: PropTypes.string.isRequired,
  }),
};

DontAskAgainDialog.defaultProps = {
  id: 'dontAskAgain',
  open: false,
  labels: {
    title: 'Do not ask again dialog',
    body: `Are you sure ?`,
    cancel: 'Cancel',
    confirm: 'Confirm',
    checkbox: 'Do not ask again',
  },
};
