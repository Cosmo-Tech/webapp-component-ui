import React, { useState } from 'react';
import { Button, Paper, Slide, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './style';

export const ErrorBanner = (props) => {
  const classes = useStyles();
  const { error, clearErrors } = props;
  const [buttonText, setButtonText] = useState('Copy');
  const copyToClipboard = (message) => {
    navigator.clipboard.writeText(message).then(() => setButtonText('Copied'));
  };
  return (
    <Slide direction="down" in={error != null} unmountOnExit>
      <Paper square elevation={0} className={classes.errorContainer} data-cy="error-banner">
        <div>
          <Typography className={classes.errorTitle}>{error.status + ' ' + error.title}</Typography>
          <Typography className={classes.errorText}>
            {error.detail.length < 200
              ? error.detail
              : 'Error message is too long to display, please copy it to clipboard to read it'}
          </Typography>
          <Typography className={classes.errorText}>{error.comment}</Typography>
        </div>
        <div className={classes.errorText}>
          {error.detail.length > 199 && (
            <Button
              className={classes.errorButton}
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => copyToClipboard(error.detail)}
            >
              {buttonText}
            </Button>
          )}
          <Button
            className={classes.errorButton}
            size="small"
            color="inherit"
            variant="outlined"
            data-cy="dismiss-error-button"
            onClick={clearErrors}
          >
            Dismiss
          </Button>
        </div>
      </Paper>
    </Slide>
  );
};

ErrorBanner.propTypes = {
  error: PropTypes.object,
  clearErrors: PropTypes.func,
};
