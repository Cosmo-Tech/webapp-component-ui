// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Stack, Typography, Box, Button } from '@mui/material';
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
import rfdc from 'rfdc';

const clone = rfdc();

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
  fullscreenGridContainer: {
    top: '0px',
    left: '0px',
    right: 'auto',
    bottom: 'auto',
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: '2',
  },
  fullscreenGridBorder: {
    border: theme.spacing(2) + ' solid',
    borderColor: 'var(--ag-odd-row-background-color)',
    backgroundColor: 'var(--ag-odd-row-background-color)',
    height: '100%',
    overflow: 'scroll',
  },
  emptyTablePlaceholderDiv: {
    textAlign: 'center',
    maxHeight: '200px',
    maxWidth: '390px',
    margin: '0px',
    position: 'relative',
    top: '50%',
    left: '50%',
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
  },
  emptyTablePlaceholderTitle: {
    marginBottom: theme.spacing(1),
    whiteSpace: 'pre-line',
  },
  emptyTablePlaceholderBody: {
    marginBottom: theme.spacing(1),
  },
  errorsPanelFullscreen: {
    marginTop: '0px',
    maxHeight: '80%',
    overflow: 'scroll',
  },
  errorsPanel: {
    maxHeight: '300px',
    overflow: 'scroll',
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
  columns.map((col) => {
    if (col.children) {
      col.children = _formatColumnsData(col.children, dateFormat);
    } else {
      _formatMinMaxDatesInColumns(col, dateFormat);
      _moveExtraPropertiesToCellEditorParams(col);
    }
    return col;
  });

export const Table = (props) => {
  const {
    gridRef: optionalGridRef,
    dateFormat,
    editMode,
    dataStatus,
    errors,
    maxErrorsCount,
    height,
    width,
    columns,
    rows,
    labels: tmpLabels,
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
    customToolbarActions,
    ...otherProps
  } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const fallbackRef = useRef(null);
  const gridRef = optionalGridRef || fallbackRef;

  const dimensions = { height, width };
  const classes = useStyles();
  const defaultColDef = getDefaultColumnsProperties(onCellChange, classes);
  const columnTypes = getColumnTypes(dateFormat);
  const formattedColumns = useMemo(() => _formatColumnsData(clone(columns), dateFormat), [columns, dateFormat]);
  const isLoading = LOADING_STATUS_MAPPING[dataStatus];
  const hasErrors = errors && errors.length > 0;
  const isReady = rows.length > 0 && dataStatus === TABLE_DATA_STATUS.READY;
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

  const onEscapeKeyDown = (event) => {
    if (event.key === 'Escape') setFullscreen(false);
  };
  useEffect(() => {
    window.addEventListener('keydown', onEscapeKeyDown);
    return () => {
      window.removeEventListener('keydown', onEscapeKeyDown);
    };
  }, []);

  const onSelectionChanged = useCallback(() => {
    setIsRowSelected(gridRef?.current?.api?.getSelectedRows().length > 0);
  }, [gridRef]);

  useEffect(() => {
    // If gridRef is initialized and rows have been changed programmatically (i.e. not through the ag-grid UI), then we
    // have to force the refresh of the table cells for the changes to be re-rendered
    gridRef?.current?.api?.refreshCells();
    onSelectionChanged();
  }, [gridRef, rows, onSelectionChanged]);

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
            className={isFullscreen ? classes.errorsPanelFullscreen : classes.errorsPanel}
          />
        )}
      </>
    );
  }, [
    buildErrorsPanelTitle,
    classes.errorsPanel,
    classes.errorsPanelFullscreen,
    errorPanelLabels,
    errors,
    hasErrors,
    isFullscreen,
    maxErrorsCount,
    onClearErrors,
  ]);

  // Deprecated: deleteRows and addRows will be removed in a future version, the api will no longer be an argument sent
  // to onDeleteRow and onAddRow. Use gridRef prop instead to retrieve the ag-grid reference
  const deleteRows = useCallback(() => {
    onDeleteRow(gridRef?.current?.api);
  }, [gridRef, onDeleteRow]);
  const addRows = useCallback(() => {
    onAddRow(gridRef?.current?.api);
  }, [gridRef, onAddRow]);

  const [isRowSelected, setIsRowSelected] = useState(false);

  const tableToolbarElement = useMemo(() => {
    const toolbarLabels = {
      import: labels.import,
      export: labels.export,
      fullscreen: labels.fullscreen,
      addRow: labels.addRow,
      deleteRows: labels.deleteRows,
      loading: labels.loading,
    };

    return (
      <TableToolbar
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        isReady={isReady}
        isLoading={isLoading}
        onImport={onImport}
        onExport={onExport}
        isRowSelected={isRowSelected}
        onAddRow={onAddRow ? addRows : undefined}
        onDeleteRow={onDeleteRow ? deleteRows : undefined}
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
    labels.loading,
    isFullscreen,
    toggleFullscreen,
    isReady,
    isLoading,
    onImport,
    onExport,
    onAddRow,
    onDeleteRow,
    isRowSelected,
    addRows,
    deleteRows,
    editMode,
    customToolbarActions,
  ]);

  const emptyTablePlaceholder = useMemo(() => {
    return (
      <div className={classes.emptyTablePlaceholderDiv} data-cy="empty-table-placeholder">
        <Typography variant="h5" className={classes.emptyTablePlaceholderTitle}>
          {labels.placeholderTitle}
        </Typography>
        <Typography variant="body1" className={classes.emptyTablePlaceholderBody}>
          {labels.placeholderBody}
        </Typography>
        {onImport ? (
          <Button
            key="import-file-button"
            disabled={!editMode || isLoading}
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
    );
  }, [
    classes.emptyTablePlaceholderBody,
    classes.emptyTablePlaceholderDiv,
    classes.emptyTablePlaceholderTitle,
    editMode,
    isLoading,
    labels.import,
    labels.placeholderBody,
    labels.placeholderTitle,
    onImport,
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
        onSelectionChanged={onSelectionChanged}
      />
    );
  }, [gridRef, columnTypes, dateFormat, defaultColDef, editMode, formattedColumns, rows, onSelectionChanged]);

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
      <div
        data-cy="grid"
        id="grid-container"
        className={`${agTheme} ${isFullscreen && classes.fullscreenGridContainer}`}
      >
        <div className={isFullscreen ? classes.fullscreenGridBorder : null}>
          {errorsPanelElement}
          {tableToolbarElement}
          <Box sx={isFullscreen ? { height: `calc(100% - ${TABLE_TOOLBAR_HEIGHT})`, width: '100%' } : dimensions}>
            {isReady && !isLoading ? agGridElement : emptyTablePlaceholder}
          </Box>
        </div>
      </div>
    </div>
  );
};

Table.propTypes = {
  /**
   *  Ref object initialized with the ag-grid ref on table creation
   */
  gridRef: PropTypes.object,
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
   *  List of extra React elements. These elements will be added above AgGrid Table
   *  List of extra React elements. These elements will be added above AgGrid Table
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
   * Callback function that will be called when user clicks on the add row button.
   * If not defined, this button will not be rendered.
   */
  onAddRow: PropTypes.func,
  /*
   * Callback function that will be called when user clicks on the delete row button.
   * If not defined, this button will not be rendered.
   */
  onDeleteRow: PropTypes.func,
};

const DEFAULT_LABELS = {
  clearErrors: 'Clear',
  label: 'Table',
  loading: 'Loading...',
  errorsPanelMainError: 'File load failed.',
  placeholderTitle: 'Import your first data',
  placeholderBody: 'After importing a valid csv or xlsx file, your data will be displayed in an interactive table.',
  import: 'Import',
  export: 'Export',
  addRow: 'Add a new row',
  deleteRows: 'Remove selected rows',
  fullscreen: 'Fullscreen',
};

Table.defaultProps = {
  dateFormat: 'dd/MM/yyyy',
  dataStatus: TABLE_DATA_STATUS.EMPTY,
  height: '200px',
  width: '100%',
  agTheme: 'ag-theme-balham',
  labels: DEFAULT_LABELS,
  onCellChange: () => {},
  maxErrorsCount: 100,
  isDirty: false,
};
