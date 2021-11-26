import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './style';

export const ErrorsPanel = (props) => {
  const classes = useStyles();
  const { errors, labels, onClear } = props;

  return (
    <Card className={classes.errorsPanelCard}>
      <CardContent>
        {errors.map((error, index) => (
          <Accordion key={'error' + index}>
            <AccordionSummary
              className={classes.errorTitle}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="errors-panel-content"
              id="errors-panel-header"
            >
              <Typography className={classes.errorSummary}>{error.summary}</Typography>
              <Typography className={classes.errorLoc}>{error.loc}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.errorContextContainer}>
              <Typography className={classes.errorContext} variant="caption">
                {error.context}
              </Typography>
            </AccordionDetails>
            <Divider />
          </Accordion>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClear}>
          {labels.clear}
        </Button>
      </CardActions>
    </Card>
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
