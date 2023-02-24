// Copyright (c) Cosmo Tech.
// Licenced under the MIT licence.

import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { TooltipInfo } from '../../../misc';

export const BasicInputPlaceholder = ({ label, tooltipText, value, ...otherProps }) => {
  return (
    <Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography data-cy="label-disabled-input" variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <TooltipInfo title={tooltipText} size="small" />
      </Stack>
      <Typography data-cy={`${otherProps.dataCy}-value-disabled-input`} variant="body2" sx={{ ml: 1 }}>
        {value}
      </Typography>
    </Stack>
  );
};

BasicInputPlaceholder.propTypes = {
  /**
   * Basic input's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Value to be displayed
   */
  value: PropTypes.string,
};
