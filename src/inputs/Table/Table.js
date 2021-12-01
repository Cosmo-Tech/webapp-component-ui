// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, makeStyles, Typography } from '@material-ui/core';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import { DateUtils } from '@cosmotech/core';
import { getColumnTypes, getDefaultColumnsProperties } from './ColumnTypes.js';
import { TABLE_DATA_STATUS } from './TableDataStatus';
import { ErrorsPanel } from '../../misc/ErrorsPanel/ErrorsPanel.js';

const useStyles = makeStyles((theme) => ({
  toolBar: {
    height: '40px',
    display: 'flex',
    flexDirection: 'row',
    flexFlow: 'flex-start',
    alignItems: 'stretch',
    marginTop: '10px',
    marginBottom: '6px;',
  },
  errorsContainer: {
    backgroundColor: theme.palette.black,
    color: theme.palette.text.error,
    fontSize: '15px',
    weight: 600,
    marginTop: '10px',
    padding: '4px',
    whiteSpace: 'pre-line',
  },
}));

const LOADING_STATUS_MAPPING = {
  [TABLE_DATA_STATUS.EMPTY]: false,
  [TABLE_DATA_STATUS.UPLOADING]: true,
  [TABLE_DATA_STATUS.DOWNLOADING]: true,
  [TABLE_DATA_STATUS.PARSING]: true,
  [TABLE_DATA_STATUS.READY]: false,
  [TABLE_DATA_STATUS.ERROR]: false,
};

const _formatMinMaxDatesInColumns = (col, dateFormat) => {
  if (col.type && col.type.indexOf('date') !== -1) {
    if (col.minValue) {
      col.minValue = DateUtils.format(new Date(col.minValue), dateFormat) || col.minValue;
    }
    if (col.maxValue) {
      col.maxValue = DateUtils.format(new Date(col.maxValue), dateFormat) || col.maxValue;
    }
  }
};

const _moveKeyToCellEditorParams = (col, key) => {
  if (Object.keys(col).indexOf(key) !== -1) {
    col.cellEditorParams = {
      ...col.cellEditorParams,
      [key]: JSON.parse(JSON.stringify(col[key])),
    };
    delete col[key];
  }
};

const _moveExtraPropertiesToCellEditorParams = (col) => {
  const keys = ['enumValues', 'minValue', 'maxValue'];
  keys.forEach((key) => _moveKeyToCellEditorParams(col, key));
};

const _formatColumnsData = (columns, dateFormat) =>
  columns.map((col, index) => {
    _formatMinMaxDatesInColumns(col, dateFormat);
    _moveExtraPropertiesToCellEditorParams(col);
    return col;
  });

export const Table = (props) => {
  const {
    dateFormat,
    editMode,
    dataStatus,
    errors,
    height,
    width,
    columns,
    rows,
    labels,
    extraToolbarActions,
    onCellChange,
    onClearErrors,
    buildErrorsPanelTitle,
    ...otherProps
  } = props;
  const dimensions = { height: height, width: width };
  const classes = useStyles();

  const context = {
    dateFormat: dateFormat,
    editMode: editMode,
  };

  const defaultColDef = getDefaultColumnsProperties(onCellChange);
  const columnTypes = getColumnTypes(dateFormat);
  const formattedColumns = useMemo(() => _formatColumnsData(columns, dateFormat), [columns, dateFormat]);
  const hasErrors = errors && errors.length > 0;
  const isLoading = LOADING_STATUS_MAPPING[dataStatus];
  const isReady = dataStatus === TABLE_DATA_STATUS.READY;
  const errorPanelLabels = {
    clear: labels.clearErrors,
    mainError: labels.errorsPanelMainError,
  };

  return (
    <div id="table-container" {...otherProps}>
      <Typography data-cy="label">{labels.label}</Typography>
      <div className={classes.toolBar}>
        {extraToolbarActions}
        {isLoading && (
          <div>
            {labels.loading}
            <CircularProgress />
          </div>
        )}
      </div>
      {hasErrors && (
        <ErrorsPanel
          labels={errorPanelLabels}
          errors={errors}
          onClear={onClearErrors}
          buildErrorsCountLabel={buildErrorsPanelTitle}
        />
      )}
      <div data-cy="grid" id="grid-container" style={dimensions} className="ag-theme-balham-dark">
        {isReady && (
          <AgGridReact
            undoRedoCellEditing={true}
            rowDragManaged={true}
            suppressDragLeaveHidesColumns={true}
            allowDragFromColumnsToolPanel={true}
            columnDefs={formattedColumns}
            defaultColDef={defaultColDef}
            columnTypes={columnTypes}
            rowData={rows}
            context={context}
          />
        )}
      </div>
    </div>
  );
};

Table.propTypes = {
  /**
   *  Custom date format for columns of type "date". Default value: 'dd/MM/yyyy'
   */
  dateFormat: PropTypes.string,
  /**
   *  Define whether or not the table can be edited
   */
  editMode: PropTypes.bool.isRequired,
  /**
   *  Define the current status of the table data (c.f. TableDataStatus.js)
   */
  dataStatus: PropTypes.string,
  /**
   *  List of errors to display instead of the table
   */
  errors: PropTypes.array,
  /**
   * Table height
   */
  height: PropTypes.string,
  /**
   * Table width
   */
  width: PropTypes.string,
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      label: 'string'
    }
   </pre>
   */
  labels: PropTypes.shape({
    clearErrors: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.string,
    errorsPanelMainError: PropTypes.string,
  }),
  /**
   *  List of extra React elements to add in the Table toolbar
   */
  extraToolbarActions: PropTypes.arrayOf(PropTypes.node),
  /**
   *  Callback function that will be called when a cell is edited
   *  Function parameters:
   *    event: object containing the ag grid veent data
   */
  onCellChange: PropTypes.func,
  /**
   *  Callback function that will be called when users click on the "Clear" button in the errors panel
   */
  onClearErrors: PropTypes.func.isRequired,
  /**
   *  Function to generate the errors panel title
   *  Function parameters:
   *    errorsCount: number of errors in the errors panel
   */
  buildErrorsPanelTitle: PropTypes.func,
};

Table.defaultProps = {
  dateFormat: 'dd/MM/yyyy',
  dataStatus: TABLE_DATA_STATUS.EMPTY,
  height: '200px',
  width: '100%',
  labels: {
    clearErrors: 'Clear',
    loading: 'Loading...',
  },
  onCellChange: () => {},
};
