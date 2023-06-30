// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

export const TABLE_TOOLBAR_HEIGHT = '32px';

export const useStyles = makeStyles((theme) => ({
  tableToolbar: {
    border: 'var(--ag-borders) var(--ag-border-color)',
    padding: theme.spacing(0.2, 0),
    width: '100%',
    height: TABLE_TOOLBAR_HEIGHT,
    color: theme.palette.primary.main,
    backgroundColor: 'var(--ag-odd-row-background-color)',
    '& .MuiButtonBase-root': {
      marginLeft: theme.spacing(1),
    },
  },
  TableLoading: {
    marginLeft: theme.spacing(1),
    color: theme.palette.text.primary,
    '& .MuiCircularProgress-root': {
      marginLeft: theme.spacing(1),
    },
  },
}));
