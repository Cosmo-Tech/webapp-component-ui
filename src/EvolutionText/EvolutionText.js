// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import CallMadeIcon from '@material-ui/icons/CallMade';
import CallReceivedIcon from '@material-ui/icons/CallReceived';

import useStyles from './muiStyles';

const DIRECTION = {
  UNKNOWN: 0,
  DOWN: 1,
  UP: 2,
  NONE: 3
};

const EvolutionText = (props) => {
  const classes = useStyles();
  const {
    shiftColors,
    value
  } = props;

  const getDirection = (value) => {
    if (value === undefined) return DIRECTION.UNKNOWN;
    if (value[0] === '-') return DIRECTION.DOWN;
    if (value[0] === '+') return DIRECTION.UP;
    return DIRECTION.NONE;
  };

  const getClass = (classes, value, shift) => {
    const direction = getDirection(value);
    if (direction === DIRECTION.UNKNOWN) return classes.default;
    if (shift === true) {
      // Shift colors if option is enabled
      if (direction === DIRECTION.DOWN) return classes.up;
      if (direction === DIRECTION.UP) return classes.down;
    } else {
      if (direction === DIRECTION.DOWN) return classes.down;
      if (direction === DIRECTION.UP) return classes.up;
    }
    return classes.down;
  };

  const getIcon = (classes, value, shift) => {
    const colorClass = getClass(classes, value, shift);
    const direction = getDirection(value);
    if (direction === DIRECTION.UNKNOWN) return;
    if (direction === DIRECTION.DOWN) {
      return (<CallReceivedIcon className={[classes.downArrow, colorClass].join(' ')} />);
    }
    if (direction === DIRECTION.UP) return (<CallMadeIcon className={[classes.upArrow, colorClass].join(' ')} />);
    return (<CallReceivedIcon className={[classes.downArrow, colorClass].join(' ')} />);
  };

  const dir = getDirection(props.value);
  if (dir === DIRECTION.UNKNOWN || dir === DIRECTION.NONE) {
    return (
      <div className={classes.elem}>
      </div>
    );
  }

  return (
    <div className={classes.elem}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        {getIcon(classes, value, shiftColors)}
      </div>
      <div className={classes.elem}>
        <Typography className={classes.evolution}>
          <span className={getClass(classes, value, shiftColors)}>
            {value}
          </span>
        </Typography>
      </div>
    </div>
  );
};

EvolutionText.propTypes = {
  shiftColors: PropTypes.bool,
  value: PropTypes.string
};

export default EvolutionText;
