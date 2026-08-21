// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { TooltipInfo } from '../../misc';

export const FormFieldLabel = ({ label, required = false, tooltipText, variant = 'body1', ...labelProps }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <Typography variant={variant} component="span" {...labelProps}>
        {label}
      </Typography>
      {required && (
        <Typography
          data-cy="required-asterisk"
          variant={variant}
          component="span"
          sx={{ color: (theme) => theme.palette.error.main, fontWeight: 'bold', lineHeight: 1 }}
        >
          *
        </Typography>
      )}
      {tooltipText && <TooltipInfo title={tooltipText} variant="small" />}
    </Box>
  );
};

FormFieldLabel.propTypes = {
  /**
   * The label text to display
   */
  label: PropTypes.string.isRequired,
  /**
   * Whether to show a red asterisk indicator for required fields (default: false)
   */
  required: PropTypes.bool,
  /**
   * Optional tooltip text to display with TooltipInfo
   */
  tooltipText: PropTypes.string,
  /**
   * Typography variant to use for the label (default: "body1")
   */
  variant: PropTypes.string,
};
