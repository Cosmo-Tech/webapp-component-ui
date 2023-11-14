// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { MenuItem, Stack, TextField, Tooltip, Fade, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { TooltipInfo } from '../../../misc';
import { getCommonInputStyles } from '../../style';
import { BasicInputPlaceholder } from '../BasicInputPlaceholder';

const useStyles = makeStyles(getCommonInputStyles);

export const BasicEnumInput = (props) => {
  const classes = useStyles();
  const {
    id,
    label,
    tooltipText,
    value: valueKey, // this "value" prop is actually a key of the objects in enumValues array
    textFieldProps,
    enumValues: selectEnumValues,
    changeEnumField,
    isDirty,
    size,
    ...otherProps
  } = props;

  const enumValues = useMemo(() => (Array.isArray(selectEnumValues) ? selectEnumValues : []), [selectEnumValues]);
  const getLabelFromEnumKey = useCallback(
    (key) => enumValues.find((el) => el.key === key)?.value ?? key ?? '',
    [enumValues]
  );

  if (textFieldProps?.disabled)
    return (
      <BasicInputPlaceholder
        id={`enum-input-${id}`}
        label={label}
        tooltipText={tooltipText}
        value={getLabelFromEnumKey(valueKey)}
        {...otherProps}
      />
    );

  return (
    <Stack
      data-cy={`enum-input-${id}`}
      direction="row"
      spacing={1}
      alignItems="center"
      className={isDirty ? classes.dirtyInput : isDirty === false ? classes.notDirtyInput : ''}
    >
      <TextField
        variant="outlined"
        label={label}
        size={size}
        sx={{ flexGrow: 1 }}
        select
        value={typeof valueKey === 'string' ? valueKey : ''}
        SelectProps={{
          renderValue: (key) => <Box>{getLabelFromEnumKey(key)}</Box>, // Prevent extra padding on selected value
          'data-cy': `enum-input-select-${id}`,
          MenuProps: { 'data-cy': `enum-input-menu-${id}` },
        }}
        onChange={(event) => changeEnumField(event.target.value)}
      >
        {enumValues.map((option) => (
          <MenuItem
            key={option.key}
            value={option.key}
            data-cy={option.key}
            sx={{ p: '0px' }} // Remove default MenuItem padding to increase the hover area for the items tooltips
          >
            <Tooltip
              data-cy={`enum-input-value-tooltip-${option.key}`}
              title={option.tooltip}
              placement="right-end"
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <Box
                // Extra padding on menu items to increase the hover area for the items tooltips
                sx={{ px: '16px', py: '6px', width: '100%' }}
              >
                {option.value}
              </Box>
            </Tooltip>
          </MenuItem>
        ))}
      </TextField>
      <TooltipInfo title={tooltipText} variant="small" />
    </Stack>
  );
};

BasicEnumInput.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * BasicEnumInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicEnumInput's value
   */
  value: PropTypes.string.isRequired,
  /**
   * Additional props that you can specify for the BasicEnumInput's textField that displays the enum value selected
   */
  textFieldProps: PropTypes.object,
  /**
   * Function used when the user changes the BasicEnumInput value
   */
  changeEnumField: PropTypes.func.isRequired,
  /**
   * List of all possible BasicEnumInput values. A value (JS object) has two attributes : **key** and **value**
   *  `{
         key: 'thisIsAKey',
         value: 'This is a Value'
       }`
   */
  enumValues: PropTypes.array.isRequired,
  /**
   * Size of the textInput: small (default value), medium or large
   */
  size: PropTypes.string,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};

BasicEnumInput.defaultProps = {
  size: 'small',
};
