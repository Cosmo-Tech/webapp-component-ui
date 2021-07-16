// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  searchContainer: {
    margin: '5px',
    marginLeft: '45px',
    marginTop: '10px',
    height: '45px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  treeContainer: {
    height: 'calc(100% - 50px)'
  },
  searchField: {
    marginTop: '2.5px',
    marginBottom: '2.5px',
    height: '50px'
  },
  searchInfo: {
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: '20px'
  },
  scenarioCard: {
    '& .rst__rowContents': {
      backgroundColor: theme.palette.background.secondary
    }
  }
}));

export default useStyles;
