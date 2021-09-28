// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@material-ui/core';

export const SimpleTwoActionsDialog = ({
  id,
  open,
  labels,
  handleClickOnButton1,
  handleClickOnButton2
}) => {
  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClickOnButton1();
    }
  };

  return (
    <Dialog open={open} aria-labelledby={labels.ariaLabelledby}
      maxWidth={'xs'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle id={id + '-dialog-title'}>
        {labels.title}
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>{labels.body}</Typography>
      </DialogContent>
      <DialogActions >
        <Button
          id={id + 'id-button1'}
          onClick={handleClickOnButton1}
          color="primary">
          {labels.button1}
        </Button>
        <Button
          data-cy={id + '-button2'}
          id={id + 'id-button2'}
          onClick={handleClickOnButton2}
          color="primary"
        >
          {labels.button2}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SimpleTwoActionsDialog.propTypes = {
  /**
   * Dialog's id
   */
  id: PropTypes.string.isRequired,
  /**
   *  ## Define the SimpleTwoActionsDialog's state:
   *  - true : the dialog is opened
   *  - false : the dialog is closed
   */
  open: PropTypes.bool,
  /**
   *  ## Labels for dialog
   * Structure:
   * <pre>
   * {
   *  title:'This is a title',
   *  body:'This is a body',
   *  button1: 'Action1',
   *  button2: 'Action2',
   *  ariaLabelledby: 'Wonderful dialog
   *}
   *</pre>
   */
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
    ariaLabelledby: PropTypes.string.isRequired
  }).isRequired,
  /**
   *  ## Function used when button1 is clicked
   */
  handleClickOnButton1: PropTypes.func.isRequired,

  /**
   *  ## Function used when button2 is clicked
   */
  handleClickOnButton2: PropTypes.func.isRequired
};

SimpleTwoActionsDialog.defaultProps = {
  open: false
};
