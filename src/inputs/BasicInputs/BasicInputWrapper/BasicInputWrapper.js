// Copyright (c) Cosmo Tech.
// Licenced under the MIT licence.

import { Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FadingTooltip } from '../../../misc';

export const BasicInputWrapper = ({ children, label, tooltipText, disabled, labelOnly, value, ...otherProps }) => {
  return (
    <>
      {labelOnly ? (
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography data-cy="label-disabled-input" variant="subtitle2" color="textSecondary">
            {label}
          </Typography>
          {tooltipText && (
            <FadingTooltip title={tooltipText}>
              <InfoOutlinedIcon color="inherit" fontSize="inherit" />
            </FadingTooltip>
          )}
        </Stack>
      ) : disabled ? (
        <Stack>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography data-cy="label-disabled-input" variant="subtitle2" color="textSecondary">
              {label}
            </Typography>
            {tooltipText && (
              <FadingTooltip title={tooltipText}>
                <InfoOutlinedIcon color="inherit" fontSize="inherit" />
              </FadingTooltip>
            )}
          </Stack>
          <Typography data-cy="value-disabled-input" variant="body2" sx={{ ml: 1 }}>
            {value}
          </Typography>
        </Stack>
      ) : (
        <>
          {tooltipText && (
            <FadingTooltip title={tooltipText}>
              <InfoOutlinedIcon color="action" fontSize="small" />
            </FadingTooltip>
          )}
        </>
      )}
    </>
  );
};

BasicInputWrapper.propTypes = {
  /**
   * Component children
   */
  children: PropTypes.node,
  /**
   * Basic input's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Value to be displayed in read only
   */
  value: PropTypes.string,
  /**
   * Defines the possibility of changing value
   */
  disabled: PropTypes.bool,
  /**
   * Defines the possibility of displaying a label without value
   */
  labelOnly: PropTypes.bool,
};
