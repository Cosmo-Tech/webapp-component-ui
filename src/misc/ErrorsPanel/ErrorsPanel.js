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
import useStyles from './style';

export const ErrorsPanel = (props) => {
  const classes = useStyles();
  const { errors, maxErrorsCount, labels, onClear, buildErrorsCountLabel, className } = props;

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
              className={classes.errorTitle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="errors-panel-content"
              id="errors-panel-header"
            >
              <Box justifyContent="flex-start">
                <Typography className={classes.errorSummary}>
                  <CancelIcon className={classes.cancelIcon} />
                </Typography>
              </Box>
              <Box flexGrow={1}>
                <Typography className={classes.errorSummary} data-cy={'error-summary'}>
                  {error.summary}
                </Typography>
              </Box>
              <Box>
                <Typography className={classes.errorLoc} data-cy={'error-loc'}>
                  {error.loc}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails className={classes.errorContextContainer}>
              <Typography className={classes.errorContext} variant="caption">
                {error.context}
              </Typography>
            </AccordionDetails>
            <Divider />
          </Accordion>
        ))}
      </>
    );
  }, [errors, maxErrorsCount, classes]);

  return (
    <Paper className={`${classes.errorsContainer} ${className}`} data-cy="errors-panel">
      <Typography className={classes.errorsHeader} data-cy="errors-header">
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

ErrorsPanel.defaultProps = {
  labels: {
    clear: 'Clear',
    errorsCountLabel: 'Errors:',
  },
  maxErrorsCount: 100,
};
