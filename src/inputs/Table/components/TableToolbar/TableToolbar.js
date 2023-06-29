// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './style';
import { FullscreenButton, ImportButton, ExportButton } from '..';

export const TableToolbar = (props) => {
  const { isFullscreen, toggleFullscreen, isReady, onImport, onExport, editMode, customToolbarActions, labels } = props;
  const classes = useStyles();

  return (
    <div className={classes.tableToolbar} style={isReady ? { borderBottom: 'none' } : null}>
      <FullscreenButton
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        disabled={!isReady}
        label={labels.fullscreen ?? 'Fullscreen'}
      />
      {onImport ? <ImportButton onImport={onImport} disabled={!editMode} label={labels.import ?? 'Import'} /> : null}
      {onExport ? <ExportButton onExport={onExport} label={labels.export ?? 'Export'} /> : null}
      {customToolbarActions}
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
   * Boolean value which defined if user can actually do modifications on the webapp
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
   * List of extra React elements to add in the TableToolbar
   */
  customToolbarActions: PropTypes.array,
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
    import: PropTypes.string,
    export: PropTypes.string,
    fullscreen: PropTypes.string,
  }),
};
