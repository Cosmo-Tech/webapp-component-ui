import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Paper, Typography } from '@mui/material';
import useStyles from './style';

const DEFAULT_ERROR = {
  comment: '',
  detail: '',
  status: '',
  title: '',
};
const DEFAULT_LABELS = {
  dismissButtonText: 'Dismiss',
  tooLongErrorMessage:
    'Detailed error message is too long to be displayed. To read it, please use the COPY button and paste it in ' +
    'your favorite text editor.',
  toggledButtonText: 'Copied',
};

export const ErrorBanner = ({ error: errorBeforePatch, clearErrors, labels: tmpLabels }) => {
  const classes = useStyles();
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [copyButtonText, setCopyButtonText] = useState(labels.secondButtonText);
  const copyToClipboard = (message) => {
    navigator.clipboard.writeText(message).then(() => setCopyButtonText(labels.toggledButtonText));
  };

  const error = useMemo(() => {
    if (typeof errorBeforePatch !== 'object' || errorBeforePatch == null) return DEFAULT_ERROR;
    Object.keys(errorBeforePatch).forEach((key) => errorBeforePatch[key] == null && delete errorBeforePatch[key]);
    return { ...DEFAULT_ERROR, ...errorBeforePatch };
  }, [errorBeforePatch]);

  const errorMessageMaxLength = 200;
  const errorStatusText = error.status ? error.status + ' ' : '';
  return (
    <Collapse in={errorBeforePatch != null}>
      <Paper square elevation={0} className={classes.errorContainer} data-cy="error-banner">
        <div>
          <Typography className={classes.errorTitle}>{errorStatusText + error.title}</Typography>
          <Typography className={classes.errorText} data-cy="error-detail">
            {error.detail.length < errorMessageMaxLength ? error.detail : labels.tooLongErrorMessage}
          </Typography>
          <Typography className={classes.errorText} data-cy="error-comment">
            {error.comment}
          </Typography>
        </div>
        <div className={classes.errorText}>
          {error.detail.length >= errorMessageMaxLength && (
            <Button className={classes.errorButton} size="small" onClick={() => copyToClipboard(error.detail)}>
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
