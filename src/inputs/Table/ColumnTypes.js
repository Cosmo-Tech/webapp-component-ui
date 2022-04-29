// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { DateUtils } from '@cosmotech/core';

const _editModeSetter = (params) => {
  let newValue = params.newValue;
  if (!params.context.editMode) {
    newValue = params.oldValue;
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _boolSetter = (params) => {
  let newValue = params.newValue.toLowerCase();
  const allowedEmptyFields = params.colDef.cellEditorParams?.acceptsEmptyFields && newValue.length === 0;
  if (!params.context.editMode) {
    newValue = params.oldValue;
  } else {
    if (['0', 'false', 'no'].indexOf(newValue) !== -1) {
      newValue = 'false';
    } else if (['1', 'true', 'yes'].indexOf(newValue) !== -1) {
      newValue = 'true';
    } else if (!allowedEmptyFields) {
      newValue = params.oldValue;
    }
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _dateSetter = (params) => {
  const dateFormat = params.context.dateFormat;
  let newValue = params.newValue;
  const allowedEmptyFields =
    params.context.editMode && params.colDef.cellEditorParams?.acceptsEmptyFields && newValue.length === 0;
  if (allowedEmptyFields) {
    params.data[params.colDef.field] = newValue;
    return true;
  } else {
    if (!params.context.editMode || !DateUtils.isValid(newValue, dateFormat)) {
      newValue = params.oldValue;
      params.data[params.colDef.field] = newValue;
      return true;
    } else {
      const minValue = params.column.userProvidedColDef?.cellEditorParams?.minValue;
      const maxValue = params.column.userProvidedColDef?.cellEditorParams?.maxValue;
      if (minValue !== undefined) {
        newValue = DateUtils.strMax(newValue, minValue, dateFormat) || params.oldValue;
      }
      if (maxValue !== undefined) {
        newValue = DateUtils.strMin(newValue, maxValue, dateFormat) || params.oldValue;
      }
      // Force date format before setting it
      params.data[params.colDef.field] = DateUtils.format(DateUtils.parse(newValue, dateFormat), dateFormat);
      return true;
    }
  }
};

const _intSetter = (params) => {
  let newValue = params.newValue;
  const allowedEmptyFields =
    params.context.editMode && params.colDef.cellEditorParams?.acceptsEmptyFields && newValue.length === 0;
  if (!allowedEmptyFields) {
    newValue = parseInt(params.newValue);
    if (!params.context.editMode || !Number.isSafeInteger(newValue)) {
      newValue = params.oldValue;
    } else {
      // Min & max values are currently limited by the default cellEditor behavior
      const DEFAULT_MIN_INT = -1e21 + 1;
      const DEFAULT_MAX_INT = 1e21 - 1;
      const configMinValue = params.column.userProvidedColDef?.cellEditorParams?.minValue;
      const configMaxValue = params.column.userProvidedColDef?.cellEditorParams?.maxValue;
      const minValue = configMinValue !== undefined ? configMinValue : DEFAULT_MIN_INT;
      const maxValue = configMaxValue !== undefined ? configMaxValue : DEFAULT_MAX_INT;
      newValue = Math.max(newValue, minValue);
      newValue = Math.min(newValue, maxValue);
      newValue = newValue.toString();
    }
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _numberSetter = (params) => {
  let newValue = params.newValue;
  const allowedEmptyFields =
    params.context.editMode && params.colDef.cellEditorParams?.acceptsEmptyFields && newValue.length === 0;
  if (!allowedEmptyFields) {
    newValue = parseFloat(params.newValue);
    if (!params.context.editMode || isNaN(newValue)) {
      newValue = params.oldValue;
    } else {
      const minValue = params.column.userProvidedColDef?.cellEditorParams?.minValue;
      const maxValue = params.column.userProvidedColDef?.cellEditorParams?.maxValue;
      if (minValue !== undefined) {
        newValue = Math.max(newValue, minValue);
      }
      if (maxValue !== undefined) {
        newValue = Math.min(newValue, maxValue);
      }
      newValue = newValue.toString();
    }
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _enumSetter = (params) => {
  const enumValues = params.column.userProvidedColDef?.cellEditorParams?.enumValues || [];
  if (enumValues.length === 0) {
    console.warn(`Missing enum values for table column "${params.column.colId}"`);
  }
  let newValue = params.newValue;
  const allowedEmptyFields = params.colDef.cellEditorParams?.acceptsEmptyFields && newValue.length === 0;
  if (!allowedEmptyFields && (!params.context.editMode || enumValues.indexOf(newValue) === -1)) {
    newValue = params.oldValue;
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _intFilterValueGetter = (params) => {
  return parseInt(params.data?.[params.column.colId]);
};

const _numberFilterValueGetter = (params) => {
  return parseFloat(params.data?.[params.column.colId]);
};

const _dateFilterValueGetter = (params) => {
  const dateFormat = params.context.dateFormat;
  const strValue = params.data?.[params.column.colId];
  return DateUtils.parse(strValue, dateFormat);
};

export const getDefaultColumnsProperties = (onCellChange) => {
  return {
    editable: (params) => params.context.editMode,
    resizable: true,
    sortable: true,
    filter: 'agTextColumnFilter',
    valueSetter: _editModeSetter,
    onCellValueChanged: (event) => {
      onCellChange(event);
    },
  };
};

export const getColumnTypes = (dateFormat) => {
  const _dateComparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
    return DateUtils.parse(valueA, dateFormat) > DateUtils.parse(valueB, dateFormat) ? 1 : -1;
  };

  const _numberComparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
    return Number(valueA) > Number(valueB) ? 1 : -1;
  };

  return {
    nonEditable: { editable: false },
    nonResizable: { resizable: false },
    nonSortable: { sortable: false },
    bool: {
      valueSetter: _boolSetter,
    },
    date: {
      comparator: _dateComparator,
      filter: 'agDateColumnFilter',
      valueSetter: _dateSetter,
      filterValueGetter: _dateFilterValueGetter,
    },
    enum: {
      valueSetter: _enumSetter,
    },
    int: {
      comparator: _numberComparator,
      filter: 'agNumberColumnFilter',
      valueSetter: _intSetter,
      filterValueGetter: _intFilterValueGetter,
    },
    number: {
      comparator: _numberComparator,
      filter: 'agNumberColumnFilter',
      valueSetter: _numberSetter,
      filterValueGetter: _numberFilterValueGetter,
    },
  };
};
