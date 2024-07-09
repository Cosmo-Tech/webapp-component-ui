// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import RestorePageIcon from '@mui/icons-material/RestorePage';
import { IconButton } from '@mui/material';
import { FadingTooltip } from '../../../../../../misc';

export const RevertDataButton = ({ disabled, onRevert, label }) => {
  const spanProps = { style: { display: 'inline-block', height: '100%' } };

  return (
    <FadingTooltip title={label} useSpan={true} spanProps={spanProps} disableInteractive={true}>
      <IconButton
        variant="text"
        component="label"
        onClick={onRevert}
        size="small"
        color="primary"
        disabled={disabled}
        data-cy="revert-table-button"
      >
        <RestorePageIcon fontSize="inherit" />
      </IconButton>
    </FadingTooltip>
  );
};
RevertDataButton.propTypes = {
  /*
   * Function used to revert table with data fetched from scenario's dataset
   */
  onRevert: PropTypes.func.isRequired,
  /*
   * Boolean that defines whether button is disabled
   */
  disabled: PropTypes.bool.isRequired,
  /*
   * label of the button, displayed as a tooltip
   */
  label: PropTypes.string,
};
