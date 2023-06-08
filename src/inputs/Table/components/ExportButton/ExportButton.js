// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, Tooltip } from '@mui/material';
import PropTypes from 'prop-types';

export const ExportButton = (props) => {
  const { onExport, disabled, label } = props;
  return (
    <Tooltip title={label}>
      <span>
        <IconButton onClick={onExport} size="small" color="primary" disabled={disabled} data-cy="export-button">
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
   * Boolean value to know if there is some data fully loaded
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
};
