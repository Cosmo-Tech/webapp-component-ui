import React from 'react';
import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FadingTooltip } from '../FadingTooltip';

export const TooltipInfo = ({ title, variant = 'medium', ...other }) =>
  title ? (
    <FadingTooltip title={title} {...other}>
      {variant === 'small' ? (
        <InfoOutlinedIcon color="action" fontSize="small" sx={{ display: 'inherit' }} />
      ) : (
        <InfoOutlinedIcon color="inherit" fontSize="inherit" sx={{ display: 'inherit' }} />
      )}
    </FadingTooltip>
  ) : null;

TooltipInfo.propTypes = {
  /**
   * Icon style (if different from "small", the icon size & color will inherit from parent)
   */
  variant: PropTypes.string,
  /**
   * Tooltip text
   */
  title: PropTypes.string,
};
