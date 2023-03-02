// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.background,
    color: theme.palette.surfaceVariant.contrastText,
    borderRadius: '16px',
  },
}));

export default useStyles;
