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
  dialogProps,
  button1Props,
  button2Props,
  closeOnBackdropClick,
  component,
}) => {
  const onClose = (event, reason) => {
    if (closeOnBackdropClick || reason !== 'backdropClick') {
      handleClickOnButton1();
    }
  };

  return (
    <Dialog
      open={open}
      data-cy={id + '-dialog'}
      aria-labelledby={id + '-dialog-title'}
      maxWidth={'xs'}
      fullWidth={true}
      onClose={onClose}
      {...dialogProps}
    >
      <DialogTitle id={id + '-dialog-title'}>{labels.title}</DialogTitle>
      <DialogContent>
        <Typography data-cy={id + '-dialog-body'} variant="body1" component={component}>
          {labels.body}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          data-cy={id + '-button1'}
          id={id + 'id-button1'}
          onClick={handleClickOnButton1}
          color="primary"
          {...button1Props}
        >
          {labels.button1}
        </Button>
        <Button
          data-cy={id + '-button2'}
          id={id + 'id-button2'}
          onClick={handleClickOnButton2}
          color="primary"
          {...button2Props}
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
   *}
   *</pre>
   */
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.node.isRequired,
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
   * Properties to add or override to the dialog component
   */
  dialogProps: PropTypes.object,

  /**
   * Properties to add or override to the button1 component
   */
  button1Props: PropTypes.object,

  /**
   * Properties to add or override to the button2 component
   */
  button2Props: PropTypes.object,

  /**
   * Close dialog on backdrop click
   */
  closeOnBackdropClick: PropTypes.bool,
  /**
   * HTML tag to be rendered as dialog's body, e.g., 'div', 'span', 'p' (default value)
   */
  component: PropTypes.string,
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
  dialogProps: {},
  button1Props: {},
  button2Props: {},
  closeOnBackdropClick: false,
  component: 'p',
};
