import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menu: {
    transform: 'translate3d(0,30px,0) !important',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    marginLeft: '20px',
  },
}));

export default useStyles;
