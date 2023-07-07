// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { FullscreenButton, ImportButton, ExportButton, AddRowButton, DeleteRowButton } from '..';
import { CircularProgress } from '@mui/material';

export const TableToolbar = (props) => {
  const {
    isFullscreen,
    toggleFullscreen,
    isReady,
    isLoading,
    onImport,
    onExport,
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
        disabled={!(isReady && !isLoading)}
        label={labels?.fullscreen ?? 'Fullscreen'}
      />
      {onImport && (
        <ImportButton onImport={onImport} disabled={!(editMode && !isLoading)} label={labels?.import ?? 'Import'} />
      )}
      {onExport && <ExportButton onExport={onExport} label={labels?.export ?? 'Export'} disabled={isLoading} />}
      {onAddRow && (
        <AddRowButton
          onAddRow={onAddRow}
          label={labels?.addRow ?? 'Add a new row'}
          disabled={!(editMode && !isLoading)}
        />
      )}
      {onDeleteRow && (
        <DeleteRowButton
          onDeleteRow={onDeleteRow}
          labels={labels?.deleteRows}
          disabled={!(editMode && isReady && !isLoading)}
        />
      )}
      {isLoading ? (
        <span className={classes.TableLoading}>
          Loading...
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
   * Boolean value define if data is fully loaded
   */
  isReady: PropTypes.bool.isRequired,
  /*
   * Boolean value define if data from cloud is downloading
   */
  isLoading: PropTypes.bool.isRequired,
  /*
   * Boolean value which defined if user can actually do modifications on the webapp
   */
  editMode: PropTypes.bool.isRequired,
  /*
   * Function used to import a file in Table. If it's not defined, the button won't be displayed
   */
  onImport: PropTypes.func,
  /*
   * Function used to export a file in Table. If it's not defined, the button won't be displayed
   */
  onExport: PropTypes.func,
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
      import: 'string',
      export: 'string',
      addRow: 'string',
      deleteRows: {
        deleteRows: 'string',
        dialog: {
          title: 'string',
          body: 'string',
          cancel: 'string',
          confirm: 'string',
          checkbox: 'string',
        },
      },
      fullscreen: 'string',
    }
   </pre>
   */
  labels: PropTypes.shape({
    import: PropTypes.string,
    export: PropTypes.string,
    addRow: PropTypes.string,
    deleteRows: PropTypes.shape({
      deleteRows: PropTypes.string,
      dialog: {
        title: PropTypes.string,
        body: PropTypes.string,
        cancel: PropTypes.string,
        confirm: PropTypes.string,
        checkbox: PropTypes.string,
      },
    }),
    fullscreen: PropTypes.string,
  }),
};
