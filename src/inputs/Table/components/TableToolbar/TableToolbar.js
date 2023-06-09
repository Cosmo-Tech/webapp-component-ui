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
        label={labels.fullscreen}
      />
      {onImport ? <ImportButton onImport={onImport} disabled={!editMode} label={labels.import} /> : null}
      {onExport ? <ExportButton onExport={onExport} label={labels.export} /> : null}
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
   * Boolean value to know if there is some data fully loaded
   */
  isReady: PropTypes.bool.isRequired,
  /*
   * Boolean use to know if the user have rights to edit the solution
   */
  editMode: PropTypes.bool.isRequired,
  /*
   * Function used to import a file in Table. If it's not defined, he do not display the import button
   */
  onImport: PropTypes.func,
  /*
   * Function used to export a file in Table. If it's not defined, he do not display the import button
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
    clearErrors: PropTypes.string,
    label: PropTypes.string,
    loading: PropTypes.string,
    errorsPanelMainError: PropTypes.string,
    placeholderTitle: PropTypes.string,
    placeholderBody: PropTypes.string,
    import: PropTypes.string,
    export: PropTypes.string,
    fullscreen: PropTypes.string,
  }),
};
