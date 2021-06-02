// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  CardContent,
  Typography
} from '@material-ui/core'

import EvolutionText from '../EvolutionText'
import useStyles from './muiStyles'

class CardKPI extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  formatValue (value) {
    if (this.props.isTime) {
      return formatAsTime(value)
    }
    return formatFloat(value)
  }

  processData () {
    // Default values if data is missing
    if (this.props.value === undefined) {
      return { value: '---', evolution: undefined }
    }

    // Format new indicator value
    let formattedValue
    let value = Number(this.props.value)
    if (Number.isNaN(value)) {
      value = 0
    }
    formattedValue = this.formatValue(value)

    // Compute evolution between new & reference value
    let diff
    let formattedDiff
    if (this.props.reference !== undefined) {
      let ref = Number(this.props.reference)
      if (Number.isNaN(ref)) {
        ref = 0
      }
      // If "diff" comparison is enabled, show the difference instead of the
      // percent change
      if (this.props.diff) {
        diff = value - ref
        formattedDiff = this.formatValue(diff)
        if (diff > 0) {
          formattedDiff = '+' + formattedDiff
        }
      // Otherwise, use the default mode "relative", the difference is
      // expressed as a percentage
      } else if (ref === 0 && value !== 0) {
        // Do not use percentage if reference value is zero
        formattedDiff = '+' + this.formatValue(value)
      } else {
        diff = 100.0 * (value - ref) / ref
        formattedDiff = formatFloat(diff)
        if (diff > 0) {
          formattedDiff = '+' + formattedDiff
        }
        formattedDiff += '%'
      }
    }

    formattedValue = this.props.isTime ? formatTimeAsJsx(value) : formattedValue
    return {
      value: formattedValue,
      evolution: formattedDiff
    }
  }

  render () {
    const classes = useStyles();
    // Retrieve value & evolution to display from props
    const { value, evolution } = this.processData()

    return (
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <Typography className={classes.title} color="textSecondary">
            {this.props.title}
          </Typography>
          <Box className={classes.numerics}>
            <EvolutionText
                value={evolution}
                shiftColors={this.props.shiftColors}
            />
            <Typography className={classes.value}>
              {value}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    )
  }
}

function formatFloat (value) {
  let newVal = Number(value).toFixed(2)
  if (newVal.endsWith('.00')) {
    newVal = newVal.substring(0, newVal.length - 3)
  }
  return newVal
}

function splitSecondsAsTime (value) {
  const splittedTime = {}
  let seconds = parseInt(value, 10)
  splittedTime.days = Math.floor(seconds / (3600 * 24))
  seconds -= splittedTime.days * 3600 * 24
  splittedTime.hours = Math.floor(seconds / 3600)
  seconds -= splittedTime.hours * 3600
  splittedTime.minutes = Math.floor(seconds / 60)
  seconds -= splittedTime.minutes * 60
  splittedTime.seconds = seconds

  return splittedTime
}

function formatAsTime (value) {
  const negative = value < 0
  if (negative) {
    value *= -1
  }
  const time = splitSecondsAsTime(value)

  // Format output string
  let output = ''
  // Display days only if value > 0
  if (time.days > 0) { output += time.days + 'd ' }
  output += time.hours + 'h '
  output += time.minutes + 'm'
  // Display seconds only if days are not shown
  if (time.days === 0) { output += ' ' + time.seconds + 's' }
  if (negative) {
    output = '-' + output
  }
  return output
}

function formatTimeAsJsx (value) {
  const time = splitSecondsAsTime(value)
  const unitStyle = { fontSize: '15px', paddingRight: '6px' }
  if (time.days > 0) {
    return (<span>
      {time.days}<span style={unitStyle}>d</span>
      {time.hours}<span style={unitStyle}>h</span>
      {time.minutes}<span style={unitStyle}>min</span>
    </span>)
  } else {
    return (<span>
      {time.hours}<span style={unitStyle}>h</span>
      {time.minutes}<span style={unitStyle}>min</span>
      {time.seconds}<span style={unitStyle}>s</span>
    </span>)
  }
}

CardKPI.propTypes = {
  diff: PropTypes.bool,
  isTime: PropTypes.bool,
  shiftColors: PropTypes.bool,
  title: PropTypes.string,
  value: PropTypes.number,
  reference: PropTypes.number
}

CardKPI.defaultProps = {
  diff: false,
  isTime: false,
  shiftColors: false
}

export default CardKPI
