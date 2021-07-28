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
    color: '#F2AE35',
    marginBottom: '8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '&:hover::before': {
      content: 'attr(data-content)',
      position: 'absolute',
      bottom: '20px',
      padding: '10px',
      background: '#000',
      color: '#fff',
      fontSize: '12px',
      whiteSpace: 'break-spaces'
    }
  },
  statusCreated: {
    marginLeft: '5px',
    color: '#E3E3E3'
  },
  statusSuccessful: {
    marginLeft: '5px',
    color: '#A7CE1F'
  },
  statusFailed: {
    marginLeft: '5px',
    color: '#BD4A02'
  },
  datasets: {
    marginLeft: '15px'
  }
}));

export default useStyles;
