import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menuTrigger: {
    backgroundRepeat: 'no-repeat',
    minWidth: '32px',
    height: '32px',
    backgroundSize: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'box-shadow ease-in-out 0.2s',
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  profilePic: {
    width: '32px',
    height: '32px',
  },
  userName: {
    fontSize: '16px',
    textAlign: 'center',
    lineHeight: '32px',
    height: '32px',
    marginLeft: '8px',
    color: theme.palette.text.primary,
  },
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
