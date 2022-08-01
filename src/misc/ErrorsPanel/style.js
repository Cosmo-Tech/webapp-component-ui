import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  errorsContainer: {
    backgroundColor: theme.palette.background.default,
    marginTop: '10px',
    marginBottom: '32px',
  },
  errorsHeader: {
    backgroundColor: theme.palette.background.default,
    padding: '10px',
  },
  errorTitle: {
    backgroundColor: theme.palette.background.default,
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
    },
  },
  errorSummary: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.error.main,
    display: 'flex',
    alignContent: 'center',
  },
  errorLoc: {
    color: theme.palette.warning.main,
  },
  errorContext: {
    color: theme.palette.error.main,
    whiteSpace: 'pre-line',
  },
  errorContextContainer: {
    backgroundColor: theme.palette.background.default,
  },
  cancelIcon: {
    marginRight: '16px',
  },
}));

export default useStyles;
