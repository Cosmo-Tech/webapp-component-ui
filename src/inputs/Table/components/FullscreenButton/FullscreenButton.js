// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

export const FullscreenButton = (props) => {
  const { isFullscreen, toggleFullscreen } = props;

  return isFullscreen ? (
    <CloseFullscreenIcon onClick={toggleFullscreen} fontSize="inherit" data-cy="grid-fullscreen-button" />
  ) : (
    <OpenInFullIcon onClick={toggleFullscreen} fontSize="inherit" data-cy="grid-fullscreen-button" />
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
};
