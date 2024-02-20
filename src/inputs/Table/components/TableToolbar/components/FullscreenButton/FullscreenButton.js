// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { IconButton } from '@mui/material';
import { FadingTooltip } from '../../../../../../misc';

export const FullscreenButton = (props) => {
  const { isFullscreen, toggleFullscreen, disabled, label } = props;
  const spanProps = { style: { display: 'inline-block', height: '100%' } };

  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const onClick = useCallback(
    (event) => {
      setTooltipOpen(false);
      toggleFullscreen(event);
    },
    [setTooltipOpen, toggleFullscreen]
  );

  return (
    <FadingTooltip open={isTooltipOpen} title={label} useSpan={true} spanProps={spanProps} disableInteractive={true}>
      <IconButton
        onClick={onClick}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => setTooltipOpen(false)}
        size="small"
        data-cy="grid-fullscreen-button"
        color="primary"
        disabled={disabled}
      >
        {isFullscreen ? <CloseFullscreenIcon fontSize="inherit" /> : <OpenInFullIcon fontSize="inherit" />}
      </IconButton>
    </FadingTooltip>
  );
};

FullscreenButton.propTypes = {
  /*
   * Boolean value to know if the table parent is in fullscreen
   */
  isFullscreen: PropTypes.bool.isRequired,
  /*
   * Function used to translate parent table in fullscreen
   */
  toggleFullscreen: PropTypes.func.isRequired,
  /*
   * Boolean that defines if the button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * Label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
};
