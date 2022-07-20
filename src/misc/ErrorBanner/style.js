import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  errorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '20px',
    paddingRight: '20px',
    backgroundColor: theme.palette.error.main,
  },
  errorTitle: {
    fontWeight: 'bold',
    color: theme.palette.error.contrastText,
  },
  errorText: {
    color: theme.palette.error.contrastText,
  },
  errorButton: {
    marginLeft: '5px',
    marginRight: '5px',
  },
}));

export default useStyles;
