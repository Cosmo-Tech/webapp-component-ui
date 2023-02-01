// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  elementDetailsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  attributeRowContainer: {
    margin: '4px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attributeColumnContainer: {
    margin: '4px',
    display: 'flex',
    flexDirection: 'column',
  },
  attributeLabel: {
    marginRight: '4px',
    fontWeight: 'bold',
  },
  tableContainer: {
    margin: '4px',
  },
  table: {
    margin: '5px',
    border: `1px solid ${theme.palette.text.primary}`,
    borderCollapse: 'collapse',
  },
  th: {
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '5px',
  },
  td: {
    border: `1px solid ${theme.palette.text.primary}`,
    padding: '5px',
  },
}));

export default useStyles;
