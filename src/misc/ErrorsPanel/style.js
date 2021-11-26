import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  errorsPanelCard: {},
  errorTitle: {
    '& .MuiAccordionSummary-content': {
      justifyContent: 'space-between',
    },
  },
  errorSummary: {
    color: theme.palette.text.error,
  },
  errorLoc: {
    color: theme.palette.text.warning,
  },
  errorContext: {
    color: theme.palette.text.error,
    whiteSpace: 'pre-line',
  },
  errorContextContainer: {},
}));

export default useStyles;
