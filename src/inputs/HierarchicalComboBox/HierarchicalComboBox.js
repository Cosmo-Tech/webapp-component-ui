// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Autocomplete } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { FadingTooltip, ScenarioValidationStatusChip } from '../../misc';

const useStyles = makeStyles((theme) => ({
  validationStatusChip: {
    height: '24px',
    marginLeft: '10px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export const HierarchicalComboBox = ({
  values,
  label,
  labels,
  disabled,
  handleChange,
  renderInputToolType,
  ...props
}) => {
  const classes = useStyles();
  // 'label' prop is deprecated but is still used as main source of data if provided, otherwise we fallback to the new
  // prop labels.label
  const mainLabel = label || labels.label;
  return (
    <Autocomplete
      {...props}
      data-cy="scenario-selector"
      ListboxProps={{ 'data-cy': 'scenario-selector-options' }}
      onChange={(event, node) => handleChange(event, node)}
      disableClearable
      disabled={disabled}
      options={values}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name ?? ''}
      renderOption={(props, option) => {
        const marginLeft = option.depth * 20 || 0;
        return (
          <li data-testid={'option-' + option.id} {...props} key={option.id}>
            <span style={{ marginLeft }}>
              {option.name}
              <ScenarioValidationStatusChip
                className={classes.validationStatusChip}
                status={option.validationStatus || 'Unknown'}
                labels={labels.validationStatus}
              />
            </span>
          </li>
        );
      }}
      renderInput={(params) => (
        <FadingTooltip arrow title={renderInputToolType}>
          <TextField {...params} data-cy="scenario-select-input" placeholder={mainLabel} label={mainLabel} />
        </FadingTooltip>
      )}
    />
  );
};

HierarchicalComboBox.propTypes = {
  /**
   * DEPRECATED HierarchicalComboBox's label. This prop is deprecated, use labels.label instead.
   */
  label: PropTypes.string,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
       label: 'string',
       validationStatus:
       {
         rejected: 'string',
         validated: 'string',
       }
     }
   * </pre>
   */
  labels: PropTypes.shape({
    label: PropTypes.string,
    validationStatus: PropTypes.shape({
      rejected: PropTypes.string,
      validated: PropTypes.string,
    }),
  }),
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
  labels: {
    label: 'Scenario',
    validationStatus: {
      rejected: 'Rejected',
      validated: 'Validated',
    },
  },
};
