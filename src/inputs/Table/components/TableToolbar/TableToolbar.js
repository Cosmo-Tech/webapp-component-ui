// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { FullscreenButton, ImportButton, ExportButton, AddRowButton, DeleteRowButton } from './components';
import { CircularProgress } from '@mui/material';

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
    editMode,
    customToolbarActions,
    labels,
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.tableToolbar} style={isReady ? { borderBottom: 'none' } : null} data-cy="table-toolbar">
      <FullscreenButton
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        disabled={isLoading}
        label={labels.fullscreen}
      />
      {onImport && <ImportButton onImport={onImport} label={labels.import} disabled={!editMode || isLoading} />}
      {onExport && <ExportButton onExport={onExport} label={labels.export} disabled={isLoading} />}
      {onAddRow && <AddRowButton onAddRow={onAddRow} label={labels.addRow} disabled={!editMode || isLoading} />}
      {onDeleteRow && (
        <DeleteRowButton
          onDeleteRow={onDeleteRow}
          labels={labels.deleteRows}
          disabled={!editMode || !isReady || isLoading || !(isRowSelected ?? true)}
        />
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
  }).isRequired,
};
