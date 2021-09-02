// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

const SimpleTwoActionsDialog = ({
  open,
  dialogTitleKey,
  dialogBodyKey,
  cancelLabelKey,
  handleClickOnCancel,
  validateLabelKey,
  handleClickOnValidate
}) => {
  const { t } = useTranslation();

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClickOnCancel();
    }
  };

  return (
    <Dialog open={open} aria-labelledby="discard-changes-dialog"
      maxWidth={'xs'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle id="discard-changes-dialog-title">
        {t(dialogTitleKey, 'Dialog title')}
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>{t(dialogBodyKey, 'Dialog Body')}</Typography>
      </DialogContent>
      <DialogActions >
        <Button
          id="ButtonCancel"
          onClick={handleClickOnCancel}
          color="primary">
          {t(cancelLabelKey, 'Cancel label')}
        </Button>
        <Button
          data-cy='dialog-discard-button'
          id="ButtonDiscard"
          onClick={handleClickOnValidate}
          color="primary"
        >
          {t(validateLabelKey, 'Validate label')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SimpleTwoActionsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  dialogTitleKey: PropTypes.string.isRequired,
  dialogBodyKey: PropTypes.string.isRequired,
  cancelLabelKey: PropTypes.string.isRequired,
  handleClickOnCancel: PropTypes.func.isRequired,
  validateLabelKey: PropTypes.string.isRequired,
  handleClickOnValidate: PropTypes.func.isRequired
};

export default SimpleTwoActionsDialog;
