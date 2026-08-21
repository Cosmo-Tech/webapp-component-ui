// Copyright (c) Cosmo Tech.
// Licenced under the MIT licence.
import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import { TooltipInfo } from '../../../misc';
import { FormFieldLabel } from '../../common/FormFieldLabel';

export const BasicInputPlaceholder = ({ id, label, tooltipText, value, required = false }) => {
  return (
    <Stack data-cy={id}>
      <Stack
        spacing={1}
        direction="row"
        sx={{
          alignItems: 'center',
        }}
      >
        <FormFieldLabel label={label} required={required} variant="subtitle2" data-cy="disabled-input-label" />
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
  /**
   * Whether the input field is required; when true, displays a red asterisk indicator
   */
  required: PropTypes.bool,
};
