// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export const ExportButton = (props) => {
  const { onExport, label } = props;
  return (
    <Tooltip title={label}>
      <span>
        <IconButton onClick={onExport} size="small" color="primary" data-cy="export-button">
          <DownloadIcon fontSize="inherit" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

ExportButton.propTypes = {
  /*
   * Function use to export a file from Table
   */
  onExport: PropTypes.func.isRequired,
  /*
   * Boolean to define is the button is disabled
   */
  label: PropTypes.string.isRequired,
};
