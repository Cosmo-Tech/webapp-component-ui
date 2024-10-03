import React from 'react';
import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FadingTooltip } from '../FadingTooltip';

export const TooltipInfo = ({ title, variant = 'medium' }) =>
  title ? (
    <FadingTooltip title={title}>
      {variant === 'small' ? (
        <InfoOutlinedIcon color="action" fontSize="small" />
      ) : (
        <InfoOutlinedIcon color="inherit" fontSize="inherit" />
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
