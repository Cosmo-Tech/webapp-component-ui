// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';
import { Grid, Typography } from '@mui/material';

export const LoadingLine = (props) => {
  const { title, isLoading, hasError, animations, style } = props;

  const spinnerStyle = {
    height: style.height,
    width: style.width,
  };

  return (
    <>
      <Grid container direction="row" alignItems={'center'}>
        <Grid item>
          <Typography variant={style.variant}>{title}</Typography>
        </Grid>
        <Grid item>
          {isLoading ? (
            <Lottie animationData={animations.dataLoading} style={spinnerStyle} loop play />
          ) : (
            <Lottie
              animationData={hasError ? animations.dataError : animations.dataLoaded}
              style={spinnerStyle}
              loop={false}
              play
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

LoadingLine.propTypes = {
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  animations: PropTypes.object.isRequired,
};

LoadingLine.defaultProps = {
  style: {
    height: 100,
    width: 120,
    variant: 'h2',
  },
};
