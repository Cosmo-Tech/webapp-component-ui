// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  statsHUDContainer: {
    color: theme.palette.primary.main,
    top: '15px',
    textAlign: 'right',
    right: '15px',
    position: 'absolute',
    'z-index': '7',
  },
}));

export default useStyles;
