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
  if (!params.context.editMode) {
    newValue = params.oldValue;
  } else if (['0', 'false'].indexOf(newValue) !== -1) {
    newValue = 'false';
  } else if (['1', 'true'].indexOf(newValue) !== -1) {
    newValue = 'true';
  } else {
    newValue = params.oldValue;
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _dateSetter = (params) => {
  const dateFormat = params.context.dateFormat;
  let newValue = params.newValue;
  if (!params.context.editMode || !DateUtils.isValid(newValue, dateFormat)) {
    newValue = params.oldValue;
  } else {
    const minValue = params.column.userProvidedColDef?.cellEditorParams?.minValue;
    const maxValue = params.column.userProvidedColDef?.cellEditorParams?.maxValue;
    if (minValue !== undefined) {
      newValue = DateUtils.strMax(newValue, minValue, dateFormat) || params.oldValue;
    }
    if (maxValue !== undefined) {
      newValue = DateUtils.strMin(newValue, maxValue, dateFormat) || params.oldValue;
    }
  }
  // Force date format before setting it
  params.data[params.colDef.field] = DateUtils.format(DateUtils.parse(newValue, dateFormat), dateFormat);
  return true;
};

const _intSetter = (params) => {
  let newValue = parseInt(params.newValue);

  if (!params.context.editMode || isNaN(newValue) || !Number.isSafeInteger(newValue)) {
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
  params.data[params.colDef.field] = newValue;
  return true;
};

const _numberSetter = (params) => {
  let newValue = parseFloat(params.newValue);
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
  params.data[params.colDef.field] = newValue;
  return true;
};

const _enumSetter = (params) => {
  const enumValues = params.column.userProvidedColDef?.cellEditorParams?.enumValues || [];
  if (enumValues.length === 0) {
    console.warn(`Missing enum values for table column "${params.column.colId}"`);
  }

  let newValue = params.newValue;
  if (!params.context.editMode || enumValues.indexOf(newValue) === -1) {
    newValue = params.oldValue;
  }
  params.data[params.colDef.field] = newValue;
  return true;
};

const _dateComparator = (valueA, valueB, nodeA, nodeB, isInverted) => {
  return isInverted ^ (new Date(valueA) > new Date(valueB));
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

export const COLUMN_TYPES = {
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
  },
  enum: {
    valueSetter: _enumSetter,
  },
  int: {
    filter: 'agNumberColumnFilter',
    valueSetter: _intSetter,
  },
  number: {
    filter: 'agNumberColumnFilter',
    valueSetter: _numberSetter,
  },
};
