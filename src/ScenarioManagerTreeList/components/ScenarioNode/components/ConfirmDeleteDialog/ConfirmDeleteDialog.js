// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  dialogContent: {
    marginTop: '16px'
  },
  dialogActions: {
    marginRight: '4px',
    marginBottom: '4px'
  }
}));

const ConfirmDeleteDialog = ({
  open,
  closeDialog,
  confirmDelete
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={closeDialog}
      aria-labelledby="confirm-scenario-delete"
      aria-describedby="confirm-scenario-delete-description"
    >
      <DialogTitle id="confirm-scenario-delete">
        {t('commoncomponents.dialog.confirm.delete.title', 'Confirm delete?')}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <DialogContentText id="confirm-scenario-delete-description">
          {
            t('commoncomponents.dialog.confirm.delete.description',
              'The scenario will be deleted. If this scenario has children, ' +
              'then its parent will become the new parent of all these scenarios.'
            )
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button onClick={closeDialog} color="primary" autoFocus>
          {t('commoncomponents.dialog.confirm.delete.button.cancel', 'Cancel')}
        </Button>
        <Button onClick={confirmDelete} color="primary">
          {t('commoncomponents.dialog.confirm.delete.button.confirm', 'Confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired
};

export default ConfirmDeleteDialog;
