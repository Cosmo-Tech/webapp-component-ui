import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Paper,
  Typography,
} from '@mui/material';

const DEFAULT_LABELS = {
  clear: 'Clear',
  errorsCountLabel: 'Errors:',
};

export const ErrorsPanel = (props) => {
  const { errors, maxErrorsCount = 100, labels: tmpLabels, onClear, buildErrorsCountLabel, className } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  let errorsCountLabel = labels.errorsCountLabel;
  if (buildErrorsCountLabel) {
    errorsCountLabel = buildErrorsCountLabel(errors.length, maxErrorsCount);
  }

  const getErrors = useCallback(() => {
    const errorsToRender = errors.slice(0, maxErrorsCount);
    return (
      <>
        {errorsToRender.map((error, index) => (
          <Accordion key={'error' + index} data-cy={'error-accordion-' + index}>
            <AccordionSummary
              sx={{
                backgroundColor: (theme) => theme.palette.background.default,
                '& .MuiAccordionSummary-content': {
                  alignItems: 'center',
                },
              }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="errors-panel-content"
              id="errors-panel-header"
            >
              <Box sx={{ justifyContent: 'flex-start' }}>
                <Typography
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.default,
                    color: (theme) => theme.palette.error.main,
                    display: 'flex',
                    alignContent: 'center',
                  }}
                >
                  <CancelIcon sx={{ marginRight: '16px' }} />
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.default,
                    color: (theme) => theme.palette.error.main,
                    display: 'flex',
                    alignContent: 'center',
                  }}
                  data-cy={'error-summary'}
                >
                  {error.summary}
                </Typography>
              </Box>
              <Box>
                <Typography sx={{ color: (theme) => theme.palette.warning.main }} data-cy={'error-loc'}>
                  {error.loc}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: (theme) => theme.palette.background.default }}>
              <Typography sx={{ color: (theme) => theme.palette.error.main, whiteSpace: 'pre-line' }} variant="caption">
                {error.context}
              </Typography>
            </AccordionDetails>
            <Divider />
          </Accordion>
        ))}
      </>
    );
  }, [errors, maxErrorsCount]);

  return (
    <Paper
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        marginTop: '10px',
        marginBottom: '32px',
      }}
      className={className}
      data-cy="errors-panel"
    >
      <Typography
        sx={{ backgroundColor: (theme) => theme.palette.background.default, padding: '10px' }}
        data-cy="errors-header"
      >
        {labels.mainError} {errorsCountLabel}
      </Typography>
      {getErrors()}
      <Accordion>
        <AccordionActions>
          <Button size="small" color="primary" variant="contained" onClick={onClear}>
            {labels.clear}
          </Button>
        </AccordionActions>
      </Accordion>
    </Paper>
  );
};

ErrorsPanel.propTypes = {
  /**
   * List of error objects with mandatory attribute "summary", and optional attirbutes "loc" and "context"
   */
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      summary: PropTypes.string.isRequired,
      loc: PropTypes.string,
      context: PropTypes.string,
    })
  ).isRequired,
  /**
   * Maximum number of displayed errors
   */
  maxErrorsCount: PropTypes.number,
  /**
   * Component's labels:
   * Structure:
   * <pre>
   {
      clear: 'string',
      mainError: 'string',
      errorsCountLabel: 'string',
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    clear: PropTypes.string,
    mainError: PropTypes.string,
    errorsCountLabel: PropTypes.string,
  }),
  /**
   *  Function that will be called when users click on the "Clear" button
   *  Function parameters:
   *    event: object containing the ag grid veent data
   */
  onClear: PropTypes.func,
  /**
   *  Function to generate the errors panel title
   *  Function parameters:
   *    errorsCount: number of errors in the errors panel
   */
  buildErrorsCountLabel: PropTypes.func,
  className: PropTypes.string,
};
