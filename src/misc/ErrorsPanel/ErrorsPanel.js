import React from 'react';
import PropTypes from 'prop-types';
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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './style';

export const ErrorsPanel = (props) => {
  const classes = useStyles();
  const { errors, labels, onClear } = props;

  return (
    <Paper className={classes.errorsContainer}>
      <Typography className={classes.errorsHeader}>File load failed. {errors.length} error(s) occurred:</Typography>
      {errors.map((error, index) => (
        <Accordion key={'error' + index}>
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
              <Typography className={classes.errorSummary}>{error.summary}</Typography>
            </Box>
            <Box>
              <Typography className={classes.errorLoc}>{error.loc}</Typography>
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
   * Component's labels:
   * Structure:
   * <pre>
   {
      clear: 'string',
      mainError: 'string',
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    clear: PropTypes.string.isRequired,
    mainError: PropTypes.string,
  }),
  /**
   *  Function that will be called when users clicks on the "Clear" button
   *  Function parameters:
   *    event: object containing the ag grid veent data
   */
  onClear: PropTypes.func,
};

ErrorsPanel.defaultProps = {
  labels: {
    clear: 'Clear',
  },
};
