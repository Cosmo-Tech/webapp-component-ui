import makeStyles from '@mui/styles/makeStyles';

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
    background: theme.palette.errorContainer.main,
  },
  errorTitle: {
    fontWeight: 'bold',
    color: theme.palette.errorContainer.contrastText,
  },
  errorText: {
    color: theme.palette.errorContainer.contrastText,
  },
  errorButton: {
    marginLeft: '5px',
    marginRight: '5px',
    color: theme.palette.errorContainer.contrastText,
  },
}));

export default useStyles;
