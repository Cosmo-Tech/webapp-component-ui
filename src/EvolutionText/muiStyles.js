// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const useStyles = theme => ({
  evolution: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: 15,
    padding: 0,
    letterSpacing: 0
  },
  default: {
    color: theme.palette.text.primary
  },
  up: {
    color: theme.palette.text.ok
  },
  down: {
    color: theme.palette.text.warning
  },
  downArrow: {
    transform: 'rotate(-90deg)',
    fontSize: '1rem'
  },
  upArrow: {
    fontSize: '1rem'
  },
  elem: {
    display: 'inline-flex'
  }
})

export default useStyles
