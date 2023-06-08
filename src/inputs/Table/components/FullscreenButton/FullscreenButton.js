// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { IconButton, Tooltip } from '@mui/material';

export const FullscreenButton = (props) => {
  const { isFullscreen, toggleFullscreen, disabled, label } = props;

  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          onClick={toggleFullscreen}
          size="small"
          data-cy="grid-fullscreen-button"
          color="primary"
          disabled={disabled}
        >
          {isFullscreen ? <CloseFullscreenIcon fontSize="inherit" /> : <OpenInFullIcon fontSize="inherit" />}
        </IconButton>
      </span>
    </Tooltip>
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
   * Boolean to indicate if the table has some data load
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
};
