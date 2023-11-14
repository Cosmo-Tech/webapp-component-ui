// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  dialogContent: {
    marginTop: '16px',
  },
  dialogActions: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));

export const ConfirmDeleteDialog = ({ open, closeDialog, confirmDelete, labels }) => {
  const classes = useStyles();

  return (
    <Dialog
      data-cy="confirm-scenario-delete-dialog"
      className={classes.root}
      open={open}
      onClose={closeDialog}
      aria-labelledby="confirm-scenario-delete"
      aria-describedby="confirm-scenario-delete-description"
    >
      <DialogTitle id="confirm-scenario-delete">{labels.title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText id="confirm-scenario-delete-description">{labels.description}</DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={closeDialog} color="primary" autoFocus>
          {labels.cancel}
        </Button>
        <Button onClick={confirmDelete} color="error">
          {labels.confirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    confirm: PropTypes.string.isRequired,
  }),
};

ConfirmDeleteDialog.defaultProps = {
  labels: {
    title: 'Confirm delete?',
    description:
      'The scenario will be deleted. If this scenario has children, ' +
      'then its parent will become the new parent of all these scenarios.',
    cancel: 'Cancel',
    confirm: 'Confirm',
  },
};
