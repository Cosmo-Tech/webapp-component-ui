// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../misc';

export const ExportButton = (props) => {
  const { onExport, disabled, label } = props;
  return (
    <FadingTooltip title={label} useSpan={true}>
      <IconButton onClick={onExport} size="small" color="primary" data-cy="export-button" disabled={disabled}>
        <DownloadIcon fontSize="inherit" />
      </IconButton>
    </FadingTooltip>
  );
};

ExportButton.propTypes = {
  /*
   * Function used to export a file from Table
   */
  onExport: PropTypes.func.isRequired,
  /*
   * Boolean that defines whether button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * Label of the button, displayed as a tooltip
   */
  label: PropTypes.string.isRequired,
};
