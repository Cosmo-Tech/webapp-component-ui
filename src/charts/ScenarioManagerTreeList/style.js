// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

const WEBAPP_HEADER_HEIGHT = 48;
const SEARCH_FIELD_HEIGHT = 50;
const SEARCH_FIELD_MARGIN = 32;
const TREES_CONTAINER_OFFSET = WEBAPP_HEADER_HEIGHT + SEARCH_FIELD_HEIGHT + 2 * SEARCH_FIELD_MARGIN;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    '& .rst__tree': {
      height: '100%',
    },
    '& .rst__lineBlock': {
      '&::before': {
        backgroundColor: theme.palette.text.primary,
      },
      '&::after': {
        backgroundColor: theme.palette.text.primary,
      },
    },
    '& .rst__node': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    '& .rst__nodeContent': {
      flexGrow: '1',
      position: 'sticky',
    },
  },
  rootScenarioHiddenLineBlock: {
    '& .rst__lineBlock': {
      width: '0px !important',
      marginLeft: '43px', // Need 43px to align left side with scenarios that have children
    },
  },
  searchContainer: {
    height: `${SEARCH_FIELD_HEIGHT}px`,
    margin: `${SEARCH_FIELD_MARGIN}px`,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  treesContainer: {
    height: `calc(100% - ${TREES_CONTAINER_OFFSET}px)`, // Offset by header height + search bar height
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  treeContainer: {
    backgroundColor: theme.palette.background.paper,
    margin: '12px',
    padding: '16px',
    width: '65%',
  },
  searchField: {
    marginTop: '2.5px',
    marginBottom: '2.5px',
    maxWidth: '600px',
    flexBasis: '50%',
    height: '50px',
  },
  toolbar: {
    marginLeft: '16px',
    display: 'flex',
    flexDirection: 'row',
  },
  toolbarPrimaryAction: {
    minWidth: '40px',
    padding: '11px',
    margin: '8px',
    '& .MuiButton-startIcon': {
      marginLeft: '0px',
      marginRight: '0px',
    },
  },
  scenarioCard: {
    '& .rst__rowContents': {
      border: 'none',
      boxShadow: 'none',
      padding: '0px',
      backgroundColor: 'inherit',
    },
    '& .rst__rowLabel': {
      width: '100%',
    },
  },
}));

export default useStyles;
