// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export const SimpleTwoActionsDialog = ({
  id,
  open,
  labels,
  handleClickOnButton1,
  handleClickOnButton2,
  colorConfirm,
}) => {
  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleClickOnButton1();
    }
  };

  return (
    <Dialog open={open} aria-labelledby={id + '-dialog-title'} maxWidth={'xs'} fullWidth={true} onClose={onClose}>
      <DialogTitle id={id + '-dialog-title'}>{labels.title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{labels.body}</Typography>
      </DialogContent>
      <DialogActions>
        {/* TODO Use button1Props and button2Props to enable variants and colors */}
        <Button data-cy={id + '-button1'} id={id + 'id-button1'} onClick={handleClickOnButton1} color="primary">
          {labels.button1}
        </Button>
        <Button data-cy={id + '-button2'} id={id + 'id-button2'} onClick={handleClickOnButton2} color={colorConfirm}>
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
   *}
   *</pre>
   */
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    button1: PropTypes.string.isRequired,
    button2: PropTypes.string.isRequired,
  }),
  /**
   *  ## Function used when button1 is clicked
   */
  handleClickOnButton1: PropTypes.func.isRequired,

  /**
   *  ## Function used when button2 is clicked
   */
  handleClickOnButton2: PropTypes.func.isRequired,

  /**
   *
   */
  colorConfirm: PropTypes.string.isRequired,
};

SimpleTwoActionsDialog.defaultProps = {
  open: false,
  labels: {
    title: 'What A Wonderful Dialog',
    body: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vivamus quis efficitur odio, sit amet auctor nunc.
              Curabitur et ante a nulla dapibus ultricies.
              Proin porttitor tempor libero euismod convallis.
              Etiam quis sollicitudin mauris. Curabitur hendrerit felis quis ligula volutpat posuere.
              Sed gravida arcu in porttitor ornare.
              Nulla ac rhoncus dui.
          `,
    button1: 'Cancel',
    button2: 'Validate',
  },
  colorConfirm: 'primary',
};
