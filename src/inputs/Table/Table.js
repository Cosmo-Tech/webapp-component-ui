// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, Stack, Typography, Box, Button } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-balham.css';
import { DateUtils } from '@cosmotech/core';
import { getColumnTypes, getDefaultColumnsProperties } from './ColumnTypes.js';
import { TABLE_DATA_STATUS } from './TableDataStatus';
import { ErrorsPanel, TooltipInfo } from '../../misc';
import { getCommonInputStyles } from '../style';
import { TableToolbar } from './components';
import { TABLE_TOOLBAR_HEIGHT } from './components/TableToolbar/style.js';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const useStyles = makeStyles((theme) => ({
  ...getCommonInputStyles(theme),
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
  loadingLabel: {
    marginLeft: '15px',
    marginRight: '15px',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  nonEditableCell: {
    backgroundColor: theme.palette.action.disabled,
    color: theme.palette.text.disabled,
  },
  emptyTablePlaceholderDiv: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    width: '15%',
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  emptyTablePlaceholderTitle: {
    marginBottom: theme.spacing(1),
  },
  emptyTablePlaceholderBody: {
    marginBottom: theme.spacing(1),
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
  const keys = ['enumValues', 'minValue', 'maxValue', 'defaultValue', 'acceptsEmptyFields'];
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
    maxErrorsCount,
    height,
    width,
    columns,
    rows,
    labels,
    tooltipText,
    extraToolbarActions,
    onCellChange,
    onClearErrors,
    buildErrorsPanelTitle,
    agTheme,
    isDirty,
    onImport,
    onExport,
    onAddRow,
    onDeleteRow,
    enableAddRow,
    customToolbarActions,
    ...otherProps
  } = props;

  const gridRef = useRef();
  const dimensions = { height, width };
  const classes = useStyles();
  const defaultColDef = getDefaultColumnsProperties(onCellChange, classes);
  const columnTypes = getColumnTypes(dateFormat);
  const formattedColumns = useMemo(() => _formatColumnsData(columns, dateFormat), [columns, dateFormat]);
  const isLoading = LOADING_STATUS_MAPPING[dataStatus];
  const hasErrors = errors && errors.length > 0;
  const isReady = dataStatus === TABLE_DATA_STATUS.READY;
  const errorPanelLabels = useMemo(() => {
    return {
      clear: labels.clearErrors,
      mainError: labels.errorsPanelMainError,
    };
  }, [labels.clearErrors, labels.errorsPanelMainError]);
  const [isFullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setFullscreen(!isFullscreen);
  }, [isFullscreen, setFullscreen]);

  useEffect(() => {
    // If gridRef is initialized and rows have been changed programmatically (i.e. not through the ag-grid UI), then we
    // have to force the refresh of the table cells for the changes to be re-rendered
    gridRef?.current?.api?.refreshCells();
  }, [rows]);

  const errorsPanelElement = useMemo(() => {
    return (
      <>
        {hasErrors && (
          <ErrorsPanel
            labels={errorPanelLabels}
            errors={errors}
            maxErrorsCount={maxErrorsCount}
            onClear={onClearErrors}
            buildErrorsCountLabel={buildErrorsPanelTitle}
          />
        )}
      </>
    );
  }, [buildErrorsPanelTitle, errorPanelLabels, errors, hasErrors, maxErrorsCount, onClearErrors]);

  const tableToolbarElement = useMemo(() => {
    const toolbarLabels = {
      import: labels.import,
      export: labels.export,
      fullscreen: labels.fullscreen,
      addRow: labels.addRow,
      deleteRows: labels.deleteRows,
    };
    return (
      <TableToolbar
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        isReady={isReady}
        isLoading={isLoading}
        onImport={onImport}
        onExport={onExport}
        onAddRow={onAddRow}
        enableAddRow={enableAddRow}
        onDeleteRow={onDeleteRow}
        editMode={editMode}
        customToolbarActions={customToolbarActions}
        labels={toolbarLabels}
      />
    );
  }, [
    labels.import,
    labels.export,
    labels.fullscreen,
    labels.addRow,
    labels.deleteRows,
    isFullscreen,
    toggleFullscreen,
    isReady,
    isLoading,
    onImport,
    onExport,
    onAddRow,
    enableAddRow,
    onDeleteRow,
    editMode,
    customToolbarActions,
  ]);

  const agGridElement = useMemo(() => {
    const context = {
      dateFormat,
      editMode,
    };
    return (
      <AgGridReact
        ref={gridRef}
        undoRedoCellEditing={true}
        rowDragManaged={true}
        suppressDragLeaveHidesColumns={true}
        allowDragFromColumnsToolPanel={true}
        columnDefs={formattedColumns}
        defaultColDef={defaultColDef}
        columnTypes={columnTypes}
        rowData={rows}
        context={context}
        stopEditingWhenCellsLoseFocus={true}
        rowSelection={'multiple'}
      />
    );
  }, [columnTypes, dateFormat, defaultColDef, editMode, formattedColumns, rows]);

  return (
    <div
      id="table-container"
      data-cy="table-input"
      {...otherProps}
      className={isDirty ? classes.dirtyInput : classes.notDirtyInput}
    >
      <div data-cy="label">
        <Stack spacing={1} direction="row" alignItems="center">
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }} color="textSecondary">
            {labels.label}
          </Typography>
          <TooltipInfo title={tooltipText} variant="small" />
        </Stack>
      </div>
      {extraToolbarActions ? <div className={classes.toolBar}>{extraToolbarActions}</div> : null}
      <div data-cy="grid" id="grid-container" className={agTheme}>
        {errorsPanelElement}
        {tableToolbarElement}
        <Box sx={dimensions}>
          {isReady && !isLoading ? (
            agGridElement
          ) : (
            <div className={classes.emptyTablePlaceholderDiv}>
              <Typography variant="h5" className={classes.emptyTablePlaceholderTitle}>
                {labels.placeholderTitle}
              </Typography>
              <Typography variant="body1" className={classes.emptyTablePlaceholderBody}>
                {labels.placeholderBody}
              </Typography>
              {onImport ? (
                <Button
                  key="import-file-button"
                  disabled={!editMode}
                  color="primary"
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  component="label"
                  onChange={onImport}
                >
                  {labels.import}
                  <input type="file" accept=".csv, .xlsx" hidden />
                </Button>
              ) : null}
            </div>
          )}
        </Box>
        <Dialog
          fullScreen
          open={isFullscreen}
          onClose={toggleFullscreen}
          className={agTheme}
          data-cy="fullscreen-table"
        >
          <DialogContent data-cy="grid">
            {errorsPanelElement}
            {tableToolbarElement}
            <Box sx={{ height: `calc(100% - ${TABLE_TOOLBAR_HEIGHT})` }}>{agGridElement}</Box>
          </DialogContent>
        </Dialog>
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
   * Maximum number of displayed errors
   */
  maxErrorsCount: PropTypes.number,
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
   * AgGrid theme
   */
  agTheme: PropTypes.string,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      clearErrors: 'string',
      label: 'string',
      loading: 'string',
      errorsPanelMainError: 'string',
      placeholderTitle: 'string',
      placeholderBody: 'string',
      import: 'string',
      export: 'string',
      addRow: 'string',
      deleteRows: 'string',
      fullscreen: 'string',
    }
   </pre>
   */
  labels: PropTypes.shape({
    clearErrors: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.string,
    errorsPanelMainError: PropTypes.string,
    placeholderTitle: PropTypes.string,
    placeholderBody: PropTypes.string,
    import: PropTypes.string,
    export: PropTypes.string,
    addRow: PropTypes.string,
    deleteRows: PropTypes.string,
    fullscreen: PropTypes.string,
  }),
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   *  List of extra React elements. these elements will be added above AgGrid Table
   */
  extraToolbarActions: PropTypes.arrayOf(PropTypes.node),
  /*
   * List of extra React elements. these elements will be added in a smaller toolbar, better integrated with AgGrid
   */
  customToolbarActions: PropTypes.arrayOf(PropTypes.node),
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
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
  /*
   * Callback function that will be called when user clicks on one of the import buttons, in
   * the toolbar or in the table placeholder.If not defined, these buttons will not be rendered.
   */
  onImport: PropTypes.func,
  /*
   * Callback function that will be called when user clicks on the export button.
   * If not defined, this button will not be rendered.
   */
  onExport: PropTypes.func,
  /*
   * Callback function that will be called when user click on the add row button.
   * If not defined, this button will not be rendered.
   */
  onAddRow: PropTypes.func,
  /*
   * Callback function that will be called when user click on the delete row button.
   * If not defined, this button will not be rendered.
   */
  onDeleteRow: PropTypes.func,
  /*
   * Boolean which define if you wan't to had the addRow features.
   * Need to be disabled if you wan't to had some non editable columns.
   */
  enableAddRow: PropTypes.bool.isRequired,
};

Table.defaultProps = {
  dateFormat: 'dd/MM/yyyy',
  dataStatus: TABLE_DATA_STATUS.EMPTY,
  height: '200px',
  width: '100%',
  agTheme: 'ag-theme-balham',
  labels: {
    clearErrors: 'Clear',
    loading: 'Loading...',
  },
  onCellChange: () => {},
  maxErrorsCount: 100,
  isDirty: false,
};
