// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
  },
  openDrawerButton: {
    position: 'absolute',
    display: 'flex',
    top: '0px',
    left: '0px',
    height: '80px',
  },
  drawer: {
    height: '100%',
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
    justifyContent: 'space-between',
  },
  drawerContent: {
    height: '100%',
    width: '350px',
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
  placeholder: {
    height: '35px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '10px',
  },
  placeholderText: {
    color: theme.palette.primary.main,
    fontSize: '15px',
    padding: '15px',
  },
  cytoscapeContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  settingsContainer: {
    display: 'flex',
    width: '100%',
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
      color: theme.palette.primary.main,
    },
  },
  queryTextfields: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
  },
  queryHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5em',
  },
  querySearchDepth: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    gap: '1em',
    alignItems: 'center',
  },
  querySearchByID: {
    display: 'grid',
    gridTemplateColumns: '2fr 5fr',
    gap: '1em',
    alignItems: 'center',
  },
  queryEdgetypes: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '1em',
    alignItems: 'center',
  },
  tabPanel: {
    '& .MuiBox-root': {
      padding: 0,
    },
    '& .MuiAccordion-root': {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiAccordion-root.Mui-expanded': {
      margin: 0,
    },
    '& .MuiAccordionSummary-root': {
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      minHeight: 56,
    },
    '& .MuiAccordionSummary-content.Mui-expanded': {},
    '& .MuiAccordionDetails-root': {
      padding: '16px 16px 16px',
    },
    '& .MuiButton-root': {
      width: 'min-content',
      alignSelf: 'flex-end',
    },
  },
}));

export default useStyles;
