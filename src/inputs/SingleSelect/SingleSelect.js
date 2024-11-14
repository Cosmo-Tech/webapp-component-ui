// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Stack, Autocomplete, TextField } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../misc';
import { BasicInputPlaceholder } from '../BasicInputs';
import { getCommonInputStyles } from '../style';

const useStyles = makeStyles(getCommonInputStyles);
const DEFAULT_LABELS = {
  label: 'Selection',
  noValue: 'No value selected',
  noOptions: 'No options available',
};

export const SingleSelect = (props) => {
  const classes = useStyles();
  const { id, labels: tmpLabels, tooltipText, value, options, disabled = false, onChange, isDirty } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  const optionValue = useMemo(() => {
    return { key: value, label: options?.find((el) => el.key === value)?.label };
  }, [options, value]);

  if (disabled) {
    const selectedValues = optionValue.label ?? labels.noValue;
    return (
      <BasicInputPlaceholder
        id={`single-select-${id}`}
        label={labels.label ?? id}
        tooltipText={tooltipText}
        value={selectedValues}
      />
    );
  }

  return (
    <Stack
      data-cy={`single-select-${id}`}
      direction="row"
      spacing={1}
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
      sx={{ alignItems: 'center' }}
    >
      <Autocomplete
        id={id}
        options={options}
        noOptionsText={labels.noOptions}
        value={optionValue}
        isOptionEqualToValue={(option, value) => option.key === value.key || value.key == null}
        onChange={(event, newValue) => onChange(newValue?.key)}
        getOptionLabel={(option) => option?.label ?? ''}
        renderOption={(props, option) => (
          <li data-cy={'single-select-option-' + option.key} {...props} key={option.key}>
            {option.label}
          </li>
        )}
        style={{ width: 500 }}
        ListboxProps={{ 'data-cy': 'single-select-listbox' }}
        renderInput={(params) => (
          <TextField {...params} data-cy={`single-select-text-${id}`} placeholder={labels.label} label={labels.label} />
        )}
      />
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
  );
};

SingleSelect.propTypes = {
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
    noValue: PropTypes.string,
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
