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
  menu: {
    transform: 'translate3d(0,30px,0) !important',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  link: {
    color: theme.palette.text.primary,
  },
  menuIcon: {
    color: theme.palette.primary.main,
    fontSize: 32,
  },
}));

export default useStyles;