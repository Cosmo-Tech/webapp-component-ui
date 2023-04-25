// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { FullscreenButton } from '..';

export const TableToolbar = (props) => {
  const { isFullscreen, toggleFullscreen } = props;
  const classes = useStyles();

  return (
    <div className={classes.tableToolbar}>
      <FullscreenButton isFullscreen={isFullscreen} toggleFullscreen={toggleFullscreen} />
    </div>
  );
};

TableToolbar.propTypes = {
  /*
   * Boolean value to know if the table parent is in Fullscreen, used to set state of fullscreen button
   */
  isFullscreen: PropTypes.bool.isRequired,
  /*
   * Function used to translate parent table element in fullscreen
   */
  toggleFullscreen: PropTypes.func.isRequired,
};
