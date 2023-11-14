import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Paper, Typography } from '@mui/material';
import useStyles from './style';

const DEFAULT_ERROR = {
  comment: '',
  detail: '',
  status: '',
  title: '',
};

export const ErrorBanner = ({ error, clearErrors, labels }) => {
  const classes = useStyles();
  const error_ = { ...DEFAULT_ERROR, ...error };
  const [copyButtonText, setCopyButtonText] = useState(labels.secondButtonText);
  const copyToClipboard = (message) => {
    navigator.clipboard.writeText(message).then(() => setCopyButtonText(labels.toggledButtonText));
  };
  const errorMessageMaxLength = 200;
  const errorStatusText = error_.status ? error_.status + ' ' : '';
  return (
    <Collapse in={error != null}>
      <Paper square elevation={0} className={classes.errorContainer} data-cy="error-banner">
        <div>
          <Typography className={classes.errorTitle}>{errorStatusText + error_.title}</Typography>
          <Typography className={classes.errorText} data-cy="error-detail">
            {error_.detail.length < errorMessageMaxLength ? error_.detail : labels.tooLongErrorMessage}
          </Typography>
          <Typography className={classes.errorText} data-cy="error-comment">
            {error_.comment}
          </Typography>
        </div>
        <div className={classes.errorText}>
          {error_.detail.length >= errorMessageMaxLength && (
            <Button className={classes.errorButton} size="small" onClick={() => copyToClipboard(error_.detail)}>
              {copyButtonText}
            </Button>
          )}
          {clearErrors && (
            <Button className={classes.errorButton} size="small" data-cy="dismiss-error-button" onClick={clearErrors}>
              {labels.dismissButtonText}
            </Button>
          )}
        </div>
      </Paper>
    </Collapse>
  );
};

ErrorBanner.propTypes = {
  error: PropTypes.shape({
    comment: PropTypes.string,
    detail: PropTypes.string,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
  }),
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
