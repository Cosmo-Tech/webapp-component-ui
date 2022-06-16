import React, { useState } from 'react';
import { Button, Paper, Slide, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyles from './style';

export const ErrorBanner = (props) => {
  const classes = useStyles();
  const { error, clearErrors, labels } = props;
  const [copyButtonText, setCopyButtonText] = useState(labels.secondButtonText);
  const copyToClipboard = (message) => {
    navigator.clipboard.writeText(message).then(() => setCopyButtonText(labels.toggledButtonText));
  };
  const errorMessageMaxLength = 200;
  return (
    <Slide direction="down" in={error != null} unmountOnExit>
      <Paper square elevation={0} className={classes.errorContainer} data-cy="error-banner">
        <div>
          <Typography className={classes.errorTitle}>{error.status + ' ' + error.title}</Typography>
          <Typography className={classes.errorText}>
            {error.detail.length < errorMessageMaxLength ? error.detail : labels.tooLongErrorMessage}
          </Typography>
          <Typography className={classes.errorText}>{error.comment}</Typography>
        </div>
        <div className={classes.errorText}>
          {error.detail.length >= errorMessageMaxLength && (
            <Button
              className={classes.errorButton}
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => copyToClipboard(error.detail)}
            >
              {copyButtonText}
            </Button>
          )}
          {clearErrors && (
            <Button
              className={classes.errorButton}
              size="small"
              color="inherit"
              variant="outlined"
              data-cy="dismiss-error-button"
              onClick={clearErrors}
            >
              {labels.dismissButtonText}
            </Button>
          )}
        </div>
      </Paper>
    </Slide>
  );
};

ErrorBanner.propTypes = {
  error: PropTypes.object.isRequired,
  clearErrors: PropTypes.func,
  labels: PropTypes.shape({
    tooLongErrorMessage: PropTypes.string,
    dismissButtonText: PropTypes.string,
    secondButtonText: PropTypes.string.isRequired,
    toggledButtonText: PropTypes.string,
  }),
};
ErrorBanner.defaultProps = {
  labels: {
    dismissButtonText: 'Dismiss',
    tooLongErrorMessage:
      'Detailed error message is too long to be displayed. To read it, please use the COPY button and paste it in ' +
      'your favorite text editor.',
    toggledButtonText: 'Copied',
  },
};
