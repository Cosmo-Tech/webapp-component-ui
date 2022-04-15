import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Chip, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  validated: {
    backgroundColor: theme.palette.success.main,
    color: 'white',
    '&:focus': {
      backgroundColor: theme.palette.success.main,
    },
    '& .MuiChip-deleteIcon': {
      color: 'white',
    },
  },
  rejected: {
    backgroundColor: theme.palette.error.main,
    color: 'white',
    '&:focus': {
      backgroundColor: theme.palette.error.main,
    },
    '& .MuiChip-deleteIcon': {
      color: 'white',
    },
  },
}));

export const ScenarioValidationStatusChip = (props) => {
  const classes = useStyles();
  const { labels, status, onDelete, className } = props;
  const lowerCaseStatus = status?.toLowerCase() || 'unknown';

  const getLabel = () => {
    if (lowerCaseStatus in labels) {
      return labels[lowerCaseStatus];
    } else if (['draft', 'loading', 'unknown'].includes(lowerCaseStatus) === false) {
      console.warn(`No label found for scenario status "${lowerCaseStatus}".`);
    }
    return 'Unknown';
  };

  const getClassName = () => {
    let className = '';
    switch (lowerCaseStatus) {
      case 'validated':
        className = classes.validated;
        break;
      case 'rejected':
        className = classes.rejected;
        break;
      default:
        break;
    }
    return className;
  };

  if (lowerCaseStatus === 'loading') {
    return (
      <CircularProgress
        className={className}
        color="inherit"
        data-cy="scenario-validation-status-loading-spinner"
        size="15px"
      />
    );
  }

  return lowerCaseStatus === 'rejected' || lowerCaseStatus === 'validated' ? (
    <Chip
      clickable={false}
      data-cy="scenario-validation-status"
      label={getLabel()}
      onDelete={onDelete}
      className={clsx(getClassName(), className)}
    />
  ) : null;
};

ScenarioValidationStatusChip.propTypes = {
  /**
   * Optional classname.
   */
  className: PropTypes.string,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
       rejected: 'string',
       validated: 'string',
     }
   * </pre>
   */
  labels: PropTypes.shape({
    rejected: PropTypes.string,
    validated: PropTypes.string,
  }),
  /**
   * Function that will be called when users click on the "Delete" button. Can be used to clear the current status.
   * This prop is optional: if it is not provided, the delete button in the chip will not be displayed.
   */
  onDelete: PropTypes.func,
  /**
   * Scenario status. Must be one of these values: 'Draft', 'Loading', 'Rejected', 'Validated' or 'Unknown'.
   */
  status: PropTypes.oneOf(['Draft', 'Loading', 'Rejected', 'Validated', 'Unknown']).isRequired,
};

ScenarioValidationStatusChip.defaultProps = {
  labels: {
    rejected: 'Rejected',
    validated: 'Validated',
  },
};
