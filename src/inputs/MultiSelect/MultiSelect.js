// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { Chip, Stack, Autocomplete, TextField, Checkbox } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../misc';
import { getCommonInputStyles } from '../style';

const useStyles = makeStyles(getCommonInputStyles);

export const MultiSelect = (props) => {
  const classes = useStyles();
  const { id, label, tooltipText, selectedKeys, disabled, options, onChange, isDirty } = props;

  const autocompleteValues = useMemo(() => options?.map((el) => el.key) ?? [], [options]);
  const getLabelFromEnumKey = useCallback(
    (key) => options?.find((el) => el.key === key)?.value ?? key ?? '',
    [options]
  );

  const renderOption = useCallback(
    (props, optionKey, { selected }) => {
      const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
      const checkedIcon = <CheckBoxIcon fontSize="small" />;
      return (
        <li {...props}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
          {getLabelFromEnumKey(optionKey)}
        </li>
      );
    },
    [getLabelFromEnumKey]
  );

  return (
    <Stack
      data-cy={`multi-input-${id}`}
      direction="row"
      spacing={1}
      alignItems="center"
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
    >
      <Autocomplete
        multiple
        disabled={disabled}
        id={id}
        options={autocompleteValues}
        disableCloseOnSelect
        renderTags={(values, getTagProps) =>
          values.map((optionKey, index) => (
            <Chip
              key={optionKey}
              variant="outlined"
              label={getLabelFromEnumKey(optionKey)}
              {...getTagProps({ index })}
            />
          ))
        }
        renderOption={renderOption}
        value={selectedKeys}
        onChange={(event, newValues) => onChange(newValues)}
        style={{ width: 500 }}
        renderInput={(params) => <TextField {...params} label={label} placeholder={label} />}
        ListboxProps={{ 'data-cy': 'multi-input-listbox' }}
      />
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
  );
};

MultiSelect.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * Component label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * List of keys of the selected elements (from the keys defined in options)
   */
  selectedKeys: PropTypes.array.isRequired,
  /**
   * Whether the component is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Function used when the user changes the BasicMultiValues values
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

MultiSelect.defaultProps = {
  disabled: false,
};
