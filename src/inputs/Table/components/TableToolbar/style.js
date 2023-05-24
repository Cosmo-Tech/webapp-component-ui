// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

export const TABLE_TOOLBAR_HEIGHT = '32px';

export const useStyles = makeStyles((theme) => ({
  tableToolbar: {
    border: 'var(--ag-borders) var(--ag-border-color)',
    borderBottom: 'none',
    padding: theme.spacing(1, 2),
    width: '100%',
    height: TABLE_TOOLBAR_HEIGHT,
    color: theme.palette.primary.main,
    backgroundColor: 'var(--ag-odd-row-background-color)',
    fontSize: '16px',
  },
}));
