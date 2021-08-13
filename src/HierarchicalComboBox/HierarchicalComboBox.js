// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Tooltip } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const HierarchicalComboBox = ({
  values,
  label,
  disabled,
  handleChange,
  separator,
  maxCharLength,
  renderInputToolType,
  ...props
}) => {
  return (
    <Autocomplete
      {...props}
      onChange={(event, node) => (handleChange(event, node))}
      disableClearable
      disabled={disabled}
      options={values}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={(option) => Object.keys(option).length !== 0 ? option.name : ''}
      renderOption={(option) => {
        const marginLeft = option.depth * 20 || 0;
        return (
          <span
            data-testid={'option-' + option.id}
            style={{ marginLeft: marginLeft }}
          >
            {option.name}
          </span>
        );
      } }
      renderInput={(params) => (
        <Tooltip arrow title={renderInputToolType}>
          <TextField
            {...params}
            data-cy="scenario-select-input"
            placeholder={label}
            label={label}
            variant="outlined"
          />
        </Tooltip>
      )}
    />
  );
};

HierarchicalComboBox.propTypes = {
  label: PropTypes.string,
  handleChange: PropTypes.func,
  disabled: PropTypes.bool,
  values: PropTypes.array,
  separator: PropTypes.string,
  maxCharLength: PropTypes.number,
  renderInputToolType: PropTypes.string
};

HierarchicalComboBox.defaultProps = {
  disabled: false,
  separator: ' ... ',
  maxCharLength: -1,
  renderInputToolType: ''
};

export default HierarchicalComboBox;
