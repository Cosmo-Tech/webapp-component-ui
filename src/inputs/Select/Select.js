// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Stack, Autocomplete, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../misc';
import { BasicInputPlaceholder } from '../BasicInputs/BasicInputPlaceholder';
import { getCommonInputStyles } from '../style';

const useStyles = makeStyles(getCommonInputStyles);

export const Select = (props) => {
  const classes = useStyles();
  const { id, labels, tooltipText, value, options, disabled, onChange, isDirty } = props;
  const getLabel = useCallback((key) => options?.find((el) => el.key === key)?.label ?? key ?? '', [options]);

  const optionValue = useMemo(() => {
    return { key: value, label: getLabel(value) };
  }, [getLabel, value]);

  if (disabled) {
    const selectedValues = getLabel(value) ?? labels.noValues;
    return (
      <BasicInputPlaceholder
        id={`select-input-${id}`}
        label={labels.label ?? id}
        tooltipText={tooltipText}
        value={selectedValues}
      />
    );
  }

  return (
    <Stack
      data-cy={`select-input-${id}`}
      direction="row"
      spacing={1}
      alignItems="center"
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
    >
      <Autocomplete
        id={id}
        options={options}
        noOptionsText={labels.noOptions}
        value={optionValue}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        onChange={(event, newValue) => onChange(newValue?.key)}
        getOptionLabel={(option) => option?.label ?? ''}
        renderOption={(props, option) => (
          <li data-testid={'option-' + option.key} {...props} key={option.key}>
            {option.label}
          </li>
        )}
        style={{ width: 500 }}
        ListboxProps={{ 'data-cy': 'select-input-listbox' }}
        renderInput={(params) => (
          <TextField {...params} data-cy="scenario-select-input" placeholder={labels.label} label={labels.label} />
        )}
      />
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
  );
};

Select.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      label: 'string',
      noValues: 'string',
      noOptions: 'string',
    }
   </pre>
   */
  labels: PropTypes.shape({
    label: PropTypes.string,
    noValues: PropTypes.string,
    noOptions: PropTypes.string,
  }),
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Selected value
   */
  value: PropTypes.string,
  /**
   * Whether the component is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Function used when the user changes current value
   */
  onChange: PropTypes.func.isRequired,
  /**
   * List of all possible options. A value (JS object) has two attributes : **key** and **value**
   *   `{ key: 'option_key', value: 'My option value' }`
   */
  options: PropTypes.array.isRequired,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};

Select.defaultProps = {
  disabled: false,
  labels: {
    label: 'Selection',
    noValues: 'No value selected',
    noOptions: 'No options available',
  },
};
