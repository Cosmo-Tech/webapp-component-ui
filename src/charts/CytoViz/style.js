// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },
  openDrawerButton: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    top: '0px',
    left: '0px',
    height: '80px',
  },
  drawer: {
    height: '100%',
    width: '300px',
    position: 'absolute',
    left: '0px',
  },
  drawerPaper: {
    position: 'absolute',
    left: '0px',
  },
  drawerHeader: {
    display: 'flex',
    height: '80px',
  },
  drawerContent: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  loadingText: {
    color: theme.palette.primary.main,
    fontSize: '15px',
    padding: '15px',
  },
  loadingContainer: {
    height: '35px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
  },
  cytoscapeContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: theme.palette.background.secondary,
  },
  settingsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  settingLine: {
    height: '50px',
    margin: '6px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLabel: {
    margin: '4px',
    flexGrow: '1',
  },
  settingInputContainer: {
    minWidth: '100px',
    display: 'flex',
    justifyContent: 'center',
  },
  settingsSlider: {
    '& .MuiSlider-valueLabel': {
      backgroundColor: theme.palette.background.primary,
      color: theme.palette.primary.main,
    },
  },
}));

export default useStyles;
