// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { CircularProgress, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import { FadingTooltip } from '../../../../misc';

export const ImportButton = (props) => {
  const { onImport, isLoading, disabled, label } = props;
  return (
    <FadingTooltip title={label} useSpan={true}>
      {isLoading ? (
        <IconButton variant="text" component="label" size="small" disabled>
          <CircularProgress disableShrink color="primary" size="15px" />
        </IconButton>
      ) : (
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
      )}
    </FadingTooltip>
  );
};

ImportButton.propTypes = {
  /*
   * Function used to import a file in Table component readable by AgGrid
   */
  onImport: PropTypes.func.isRequired,
  /*
   * Boolean value define if data from cloud is downloading
   */
  isLoading: PropTypes.bool.isRequired,
  /*
   * Boolean that defines whether button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button, displayed as a tooltip
   */
  label: PropTypes.string.isRequired,
};
