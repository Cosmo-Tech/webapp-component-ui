import React from 'react';
import PropTypes from 'prop-types';
import { Chip, CircularProgress } from '@mui/material';

export const ScenarioValidationStatusChip = (props) => {
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

  const colorProp = lowerCaseStatus === 'validated' ? 'success' : 'error';

  return lowerCaseStatus === 'rejected' || lowerCaseStatus === 'validated' ? (
    <Chip
      clickable={false}
      data-cy="scenario-validation-status"
      label={getLabel()}
      onDelete={onDelete}
      color={colorProp}
      className={className}
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
