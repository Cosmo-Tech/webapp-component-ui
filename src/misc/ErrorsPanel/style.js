import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  errorsContainer: {
    marginTop: '10px',
    marginBottom: '32px',
  },
  errorsHeader: {
    padding: '10px',
  },
  errorTitle: {
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
    },
  },
  errorSummary: {
    color: theme.palette.error.contrastText,
    display: 'flex',
    alignContent: 'center',
  },
  errorLoc: {
    color: theme.palette.warning.contrastText,
  },
  errorContext: {
    color: theme.palette.error.contrastText,
    whiteSpace: 'pre-line',
  },
  errorContextContainer: {},
  cancelIcon: {
    marginRight: '16px',
  },
}));

export default useStyles;
