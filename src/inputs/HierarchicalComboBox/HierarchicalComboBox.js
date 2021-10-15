// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Tooltip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const HierarchicalComboBox = ({ values, label, disabled, handleChange, renderInputToolType, ...props }) => {
  return (
    <Autocomplete
      {...props}
      onChange={(event, node) => handleChange(event, node)}
      disableClearable
      disabled={disabled}
      options={values}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => (Object.keys(option).length !== 0 ? option.name : '')}
      renderOption={(option) => {
        const marginLeft = option.depth * 20 || 0;
        return (
          <span data-testid={'option-' + option.id} style={{ marginLeft: marginLeft }}>
            {option.name}
          </span>
        );
      }}
      renderInput={(params) => (
        <Tooltip arrow title={renderInputToolType}>
          <TextField {...params} data-cy="scenario-select-input" placeholder={label} label={label} variant="outlined" />
        </Tooltip>
      )}
    />
  );
};

HierarchicalComboBox.propTypes = {
  /**
   * HierarchicalComboBox's label
   */
  label: PropTypes.string,
  /**
   * Function bound on onChange event
   */
  handleChange: PropTypes.func.isRequired,
  /**
   *  Define the HierarchicalComboBox's state:
   *  - true : the button is disabled (the tooltip will guide users on how to enable the button)
   *  - false : the button is enabled
   */
  disabled: PropTypes.bool,
  /**
   * HierarchicalComboBox's values.
   * Each value should at least contain **name, parentId, depth, id** attributes
   */
  values: PropTypes.array.isRequired,
  /**
   * Tooltip on HierarchicalComboBox
   */
  renderInputToolType: PropTypes.string,
};

HierarchicalComboBox.defaultProps = {
  disabled: false,
  renderInputToolType: '',
};
