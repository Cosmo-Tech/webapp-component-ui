// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  rootContainer: ({ width }) => ({
    width,
  }),
  relativePosContainer: ({ paddingTop }) => ({
    position: 'relative',
    paddingTop,
  }),
  absolutePosContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
}));

export const FixedRatioContainer = (props) => {
  const { children, className, heightOffset = '0px', ratio = 1, width = '100%' } = props;
  const paddingTop = `calc(${(1 / ratio) * 100}% + ${heightOffset})`;
  const classes = useStyles({ paddingTop, width });

  return (
    <div
      className={clsx(classes.rootContainer, {
        [className]: className.length !== 0,
      })}
    >
      <div className={classes.relativePosContainer}>
        <div className={classes.absolutePosContainer}>{children}</div>
      </div>
    </div>
  );
};

FixedRatioContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  heightOffset: PropTypes.string,
  ratio: PropTypes.number,
  width: PropTypes.string,
};
