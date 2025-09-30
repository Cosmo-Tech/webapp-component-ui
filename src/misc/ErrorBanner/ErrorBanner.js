import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Paper, Typography, styled } from '@mui/material';

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

const ErrorTextDiv = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
}));

export const ErrorBanner = ({ error: errorBeforePatch, clearErrors, labels: tmpLabels }) => {
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
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '20px',
          paddingRight: '20px',
          backgroundColor: (theme) => theme.palette.error.main,
        }}
        data-cy="error-banner"
      >
        <div>
          <Typography
            sx={{
              fontWeight: 'bold',
              color: (theme) => theme.palette.error.contrastText,
            }}
          >
            {errorStatusText + error.title}
          </Typography>
          <Typography sx={{ color: (theme) => theme.palette.error.contrastText }} data-cy="error-detail">
            {error.detail.length < errorMessageMaxLength ? error.detail : labels.tooLongErrorMessage}
          </Typography>
          <Typography sx={{ color: (theme) => theme.palette.error.contrastText }} data-cy="error-comment">
            {error.comment}
          </Typography>
        </div>
        <ErrorTextDiv>
          {error.detail.length >= errorMessageMaxLength && (
            <Button
              sx={{
                marginLeft: '5px',
                marginRight: '5px',
                color: (theme) => theme.palette.error.contrastText,
              }}
              size="small"
              onClick={() => copyToClipboard(error.detail)}
            >
              {copyButtonText}
            </Button>
          )}
          {clearErrors && (
            <Button
              sx={{
                marginLeft: '5px',
                marginRight: '5px',
                color: (theme) => theme.palette.error.contrastText,
              }}
              size="small"
              data-cy="dismiss-error-button"
              onClick={clearErrors}
            >
              {labels.dismissButtonText}
            </Button>
          )}
        </ErrorTextDiv>
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
