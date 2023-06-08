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
   * Function use to import a file in Table component readable by AgGrid
   */
  onImport: PropTypes.func.isRequired,
  /*
   * Boolean use to know if the user have rights to edit the solution
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button used for Tooltip
   */
  label: PropTypes.string.isRequired,
};
