// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import CallMadeIcon from '@material-ui/icons/CallMade'
import CallReceivedIcon from '@material-ui/icons/CallReceived'

import useStyles from './muiStyles'

const DIRECTION = {
  UNKNOWN: 0,
  DOWN: 1,
  UP: 2,
  NONE: 3
}

class EvolutionText extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  render () {
    const classes = useStyles();
    const dir = this.getDirection(this.props.value)
    if (dir === DIRECTION.UNKNOWN || dir === DIRECTION.NONE) {
      return (
        <div className={classes.elem}>
        </div>
      )
    }

    return (
      <div className={classes.elem}>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          {this.getIcon(this.props.value, this.props.shiftColors)}
        </div>
        <div className={classes.elem}>
          <Typography className={classes.evolution}>
            <span
              className={this.getClass(this.props.value,
                this.props.shiftColors)}
            >
              {this.props.value}
            </span>
          </Typography>
        </div>
      </div>
    )
  }

  getDirection (value) {
    if (value === undefined) return DIRECTION.UNKNOWN
    if (value[0] === '-') return DIRECTION.DOWN
    if (value[0] === '+') return DIRECTION.UP
    return DIRECTION.NONE
  }

  getClass (value, shift) {
    const classes = useStyles();

    const direction = this.getDirection(value)
    if (direction === DIRECTION.UNKNOWN) return classes.default
    if (shift === true) {
      // Shift colors if option is enabled
      if (direction === DIRECTION.DOWN) return classes.up
      if (direction === DIRECTION.UP) return classes.down
    } else {
      if (direction === DIRECTION.DOWN) return classes.down
      if (direction === DIRECTION.UP) return classes.up
    }
    return classes.down
  }

  getIcon (value, shift) {
    const classes = useStyles();
    const colorClass = this.getClass(value, shift)

    const direction = this.getDirection(value)
    if (direction === DIRECTION.UNKNOWN) return
    if (direction === DIRECTION.DOWN) return (<CallReceivedIcon className={[classes.downArrow, colorClass].join(' ')} />)
    if (direction === DIRECTION.UP) return (<CallMadeIcon className={[classes.upArrow, colorClass].join(' ')} />)
    return (
      <CallReceivedIcon
        className={[classes.downArrow, colorClass].join(' ')}
      />
    )
  }
}

EvolutionText.propTypes = {
  shiftColors: PropTypes.bool,
  value: PropTypes.string
}

export default EvolutionText
