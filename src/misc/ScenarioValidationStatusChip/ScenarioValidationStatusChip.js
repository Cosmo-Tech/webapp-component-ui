import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Chip, CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  /// USE ERROR AND SUCCESS IN CHIP COLOR WHEN UPDATE TO MUI 5.X IS DONE
  validated: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
    '&:focus': {
      backgroundColor: theme.palette.success.main,
    },
    '& .MuiChip-deleteIcon': {
      color: theme.palette.success.contrastText,
    },
  },
  rejected: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:focus': {
      backgroundColor: theme.palette.error.main,
    },
    '& .MuiChip-deleteIcon': {
      color: theme.palette.error.contrastText,
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
      /// USE color="error | success" WHEN UPDATE TO MUI 5.X IS DONE
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
