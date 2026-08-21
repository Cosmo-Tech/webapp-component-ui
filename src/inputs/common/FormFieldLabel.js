// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';

export const FormFieldLabel = ({ label, required = false, variant = 'body1', ...labelProps }) => {
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
   * Typography variant to use for the label (default: "body1")
   */
  variant: PropTypes.string,
};
