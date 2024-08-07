// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  card: {
    height: '100%',
    width: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  description: {
    height: '70px',
    overflow: 'auto',
  },
}));

export default useStyles;
