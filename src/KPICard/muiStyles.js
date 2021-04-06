const useStyles = (theme) => ({
  card: {
    minWidth: 120,
    height: 96,
    marginRight: `calc(1.5 * ${theme.spacing(1)}px)`,
    padding: 0,
    position: 'relative',
    boxSizing: 'border-box',
    borderRadius: '4px',
    background: theme.palette.background.secondary
  },
  content: {
    padding: '0 !important',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    color: theme.palette.text.grey,
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0,
    lineHeight: '1.45',
    textAlign: 'left',
    top: '0px',
    margin: 0,
    padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(
      1
    )}px ${theme.spacing(1)}px`
  },
  numerics: {
    fontWeight: 'bold',
    margin: '0 0 8px 0',
    padding: `0 ${theme.spacing(1)}px`,
    paddingBottom: 0,
    width: '100%',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  outputLabel: {
    fontSize: 15
  },
  value: {
    textAlign: 'left',
    fontSize: 35,
    lineHeight: 1,
    margin: 0,
    padding: 0,
    letterSpacing: 0
  },
  evolution: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 12,
    margin: 0,
    padding: 0,
    height: '14px',
    letterSpacing: 0,
    lineHeight: '14px'
  }
})

export default useStyles
