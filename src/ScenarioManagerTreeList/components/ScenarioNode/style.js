// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  scenarioHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scenarioHeaderItem: {
    marginRight: '12px'
  },
  scenarioTitle: {
    maxWidth: '500px',
    color: theme.palette.primary.main,
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover::before': {
      background: theme.palette.black,
      color: theme.palette.white,
      content: 'attr(data-content)',
      position: 'absolute',
      bottom: '20px',
      padding: '10px',
      fontSize: '12px',
      whiteSpace: 'break-spaces'
    }
  },
  statusCreated: {
    marginLeft: '5px',
    color: theme.palette.text.info
  },
  statusSuccessful: {
    marginLeft: '5px',
    color: theme.palette.text.success
  },
  statusFailed: {
    marginLeft: '5px',
    color: theme.palette.text.error
  },
  datasets: {
    marginLeft: '15px'
  }
}));

export default useStyles;
