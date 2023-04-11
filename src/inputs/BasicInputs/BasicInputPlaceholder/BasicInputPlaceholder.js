// Copyright (c) Cosmo Tech.
// Licenced under the MIT licence.

import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { TooltipInfo } from '../../../misc';

export const BasicInputPlaceholder = ({ id, label, tooltipText, value, ...otherProps }) => {
  return (
    <Stack data-cy={id}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography data-cy="disabled-input-label" variant="subtitle2" color="textSecondary">
          {label}
        </Typography>
        <TooltipInfo title={tooltipText} />
      </Stack>
      <Typography data-cy="disabled-input-value" variant="body2" sx={{ ml: 1 }}>
        {value}
      </Typography>
    </Stack>
  );
};

BasicInputPlaceholder.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
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
