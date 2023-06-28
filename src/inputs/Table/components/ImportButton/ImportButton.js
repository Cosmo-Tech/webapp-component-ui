// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Tooltip, IconButton } from '@mui/material';
import PropTypes from 'prop-types';

export const ImportButton = (props) => {
  const { disabled, onImport, label } = props;
  return (
    <Tooltip title={label}>
      <span>
        <IconButton
          variant="text"
          component="label"
          onChange={onImport}
          size="small"
          color="primary"
          disabled={disabled}
          data-cy="import-file-button"
        >
          <input type="file" accept=".csv, .xlsx" hidden />
          <UploadFileIcon fontSize="inherit" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

ImportButton.propTypes = {
  /*
   * Function used to import a file in Table component readable by AgGrid
   */
  onImport: PropTypes.func.isRequired,
  /*
   * Boolean that defines whether button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button, displayed as a tooltip
   */
  label: PropTypes.string.isRequired,
};
