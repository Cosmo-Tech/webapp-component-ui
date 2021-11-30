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
    color: theme.palette.text.error,
    display: 'flex',
    alignContent: 'center',
  },
  errorLoc: {
    color: theme.palette.text.warning,
  },
  errorContext: {
    color: theme.palette.text.error,
    whiteSpace: 'pre-line',
  },
  errorContextContainer: {},
  cancelIcon: {
    marginRight: '16px',
  },
}));

export default useStyles;
