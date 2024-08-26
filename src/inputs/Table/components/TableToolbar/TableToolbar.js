// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress } from '@mui/material';
import {
  FullscreenButton,
  ImportButton,
  ExportButton,
  AddRowButton,
  DeleteRowButton,
  RevertDataButton,
} from './components';
import { useStyles } from './style';

export const TableToolbar = (props) => {
  const {
    isFullscreen,
    toggleFullscreen,
    isReady,
    isLoading,
    onImport,
    onExport,
    isRowSelected,
    onAddRow,
    onDeleteRow,
    onRevert,
    editMode,
    customToolbarActions,
    labels,
    visibilityOptions,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.tableToolbar} style={isReady ? { borderBottom: 'none' } : null} data-cy="table-toolbar">
      {visibilityOptions?.fullscreen !== false && (
        <FullscreenButton
          isFullscreen={isFullscreen}
          toggleFullscreen={toggleFullscreen}
          disabled={isLoading}
          label={labels.fullscreen}
        />
      )}
      {onImport && visibilityOptions?.import !== false && (
        <ImportButton onImport={onImport} label={labels.import} disabled={!editMode || isLoading} />
      )}
      {onExport && visibilityOptions?.export !== false && (
        <ExportButton onExport={onExport} label={labels.export} disabled={isLoading} />
      )}
      {onAddRow && visibilityOptions?.addRow !== false && (
        <AddRowButton onAddRow={onAddRow} label={labels.addRow} disabled={!editMode || isLoading} />
      )}
      {onDeleteRow && visibilityOptions?.deleteRow !== false && (
        <DeleteRowButton
          onDeleteRow={onDeleteRow}
          labels={labels.deleteRows}
          disabled={!editMode || !isReady || isLoading || !(isRowSelected ?? true)}
        />
      )}
      {onRevert && visibilityOptions?.revert !== false && (
        <RevertDataButton onRevert={onRevert} label={labels.revert} disabled={!editMode || isLoading} />
      )}
      {isLoading ? (
        <span className={classes.tableLoading}>
          {labels.loading}
          <CircularProgress size="10px" />
        </span>
      ) : (
        customToolbarActions
      )}
    </div>
  );
};

TableToolbar.propTypes = {
  /*
   * Boolean value to know if the table parent is in Fullscreen, used to set state of fullscreen button
   */
  isFullscreen: PropTypes.bool.isRequired,
  /*
   * Function used to translate parent table element in fullscreen
   */
  toggleFullscreen: PropTypes.func.isRequired,
  /*
   * Boolean value that defines if data is fully loaded
   */
  isReady: PropTypes.bool.isRequired,
  /*
   * Boolean value define if data from cloud is downloading
   */
  isLoading: PropTypes.bool.isRequired,
  /*
   * Boolean value which defines if user can actually do modifications on the webapp
   */
  editMode: PropTypes.bool.isRequired,
  /*
   * Function used to import a file in Table. If undefined, import button is not displayed
   */
  onImport: PropTypes.func,
  /*
   * Function used to export a file in Table. If undefined, export button is not displayed
   */
  onExport: PropTypes.func,
  /*
   *  Function used to revert table with data fetched from scenario's dataset.
   * If undefined, revert button is not displayed
   */
  onRevert: PropTypes.func,
  /*
   * Boolean value that defines if a row is selected or not
   */
  isRowSelected: PropTypes.bool,
  /*
   * Function used to add a row in the Table. If it's not defined, the button won't be displayed
   */
  onAddRow: PropTypes.func,
  /*
   * Function used to remove selected rows in the Table. If it's not defined, the button won't be displayed
   */
  onDeleteRow: PropTypes.func,
  /*
   * List of extra React elements to add in the TableToolbar
   */
  customToolbarActions: PropTypes.array,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      loading: 'string',
      import: 'string',
      export: 'string',
      addRow: 'string',
      deleteRows: 'string',
      fullscreen: 'string',
      revert: 'string'
    }
   </pre>
   */
  labels: PropTypes.shape({
    loading: PropTypes.string,
    import: PropTypes.string,
    export: PropTypes.string,
    addRow: PropTypes.string,
    deleteRows: PropTypes.string,
    fullscreen: PropTypes.string,
    revert: PropTypes.string,
  }).isRequired,
  visibilityOptions: PropTypes.shape({
    fullscreen: PropTypes.bool,
    import: PropTypes.bool,
    export: PropTypes.bool,
    addRow: PropTypes.bool,
    deleteRow: PropTypes.bool,
    revert: PropTypes.bool,
  }),
};
