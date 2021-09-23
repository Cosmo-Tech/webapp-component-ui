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

export const SimpleTwoActionsDialog = ({
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
  /**
   *  ## Define the SimpleTwoActionsDialog's state:
   *  - true : the dialog is opened
   *  - false : the dialog is closed
   */
  open: PropTypes.bool.isRequired,
  /**
   *  ## The translation key for dialog title
   *  We used **react-i18next** for translation.
   *  You can referred to desired sentence by specifing the json path of translation files.
   *
   *  **e.g**: 'commoncomponents.dialog.mywonderfuldialog.title'
   */
  dialogTitleKey: PropTypes.string.isRequired,
  /**
   *  ## The translation key for dialog body:
   *  We used react-i18next for translation.
   *  You can referred to desired sentence by specifing the json path of translation files.
   *
   *  **e.g**: 'commoncomponents.dialog.mywonderfuldialog.body'
   */
  dialogBodyKey: PropTypes.string.isRequired,
  /**
   *  ## The translation key for cancel button:
   *  We used react-i18next for translation.
   *  You can referred to desired sentence by specifing the json path of translation files.
   *
   *  **e.g**: 'commoncomponents.dialog.mywonderfuldialog.button.cancel'
   */
  cancelLabelKey: PropTypes.string.isRequired,
  /**
   *  ## Function used when cancel button is clicked
   */
  handleClickOnCancel: PropTypes.func.isRequired,
  /**
   *  ## The translation key for validate button:
   *  We used react-i18next for translation.
   *  You can referred to desired sentence by specifing the json path of translation files.
   *
   *  **e.g**: 'commoncomponents.dialog.mywonderfuldialog.button.validate'
   */
  validateLabelKey: PropTypes.string.isRequired,
  /**
   *  ## Function used when validate button is clicked
   */
  handleClickOnValidate: PropTypes.func.isRequired
};
