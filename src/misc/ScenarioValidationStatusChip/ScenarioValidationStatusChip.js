import React from 'react';
import PropTypes from 'prop-types';
import { Chip, CircularProgress } from '@mui/material';

const DEFAULT_LABELS = {
  draft: 'Draft',
  rejected: 'Rejected',
  validated: 'Validated',
};

export const ScenarioValidationStatusChip = ({ labels: tmpLabels, status, onDelete, className, showDraft = false }) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const lowerCaseStatus = status?.toLowerCase() || 'unknown';

  const getLabel = () => {
    if (lowerCaseStatus in labels) {
      return labels[lowerCaseStatus];
    } else if (['loading', 'unknown'].includes(lowerCaseStatus) === false) {
      console.warn(`No label found for scenario status "${lowerCaseStatus}".`);
    }
    return status ?? 'Unknown';
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

  if ((!showDraft && lowerCaseStatus === 'draft') || ['validated', 'rejected', 'draft'].inludes === false) return null;

  let color;
  if (lowerCaseStatus === 'validated') color = 'success';
  else if (lowerCaseStatus === 'rejected') color = 'error';

  return (
    <Chip
      clickable={false}
      data-cy="scenario-validation-status"
      label={getLabel()}
      onDelete={onDelete}
      color={color}
      className={className}
    />
  );
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
   * Boolean value defining whether the Chip must be shown when the status is "Draft" (false by default)
   */
  showDraft: PropTypes.bool,
  /**
   * Scenario status. Must be one of these values: 'Draft', 'Loading', 'Rejected', 'Validated' or 'Unknown'.
   */
  status: PropTypes.oneOf(['Draft', 'Loading', 'Rejected', 'Validated', 'Unknown']).isRequired,
};
