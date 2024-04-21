// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material';
import { Stack, Autocomplete, TextField, Checkbox } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../misc';
import { getCommonInputStyles } from '../style';

const useStyles = makeStyles(getCommonInputStyles);

export const MultiSelect = (props) => {
  const classes = useStyles();
  const {
    id,
    label,
    tooltipText,
    value,
    multiValuesProps,
    enumValues: selectEnumValues,
    changeValues,
    isDirty,
  } = props;

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const enumValues = useMemo(() => (Array.isArray(selectEnumValues) ? selectEnumValues : []), [selectEnumValues]);
  const getLabelFromEnumKey = useCallback(
    (key) => enumValues.find((el) => el.key === key)?.value ?? key ?? '',
    [enumValues]
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
        disabled={multiValuesProps?.disabled}
        id={id}
        options={enumValues}
        disableCloseOnSelect
        getOptionLabel={(option) => getLabelFromEnumKey(option.key)}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
            {getLabelFromEnumKey(option.key)}
          </li>
        )}
        isOptionEqualToValue={(option, value) => option.key === value.key}
        value={value}
        onChange={(event, newValue) => changeValues(newValue)}
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
   * Values's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * MultiValues's value
   */
  value: PropTypes.array.isRequired,
  /**
   * Additional props that you can specify for the BasicMultiValues's textField that displays the enum value selected
   */
  multiValuesProps: PropTypes.object,
  /**
   * Function used when the user changes the BasicMultiValues values
   */
  changeValues: PropTypes.func.isRequired,
  /**
   * List of all possible BasicMultiValues values. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};
