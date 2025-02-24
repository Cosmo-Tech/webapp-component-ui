// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import Lottie from 'react-lottie-player/dist/LottiePlayerLight';
import PropTypes from 'prop-types';
import { Grid2 as Grid, Typography } from '@mui/material';

const DEFAULT_STYLE = {
  height: 100,
  width: 120,
  variant: 'h2',
};
export const LoadingLine = (props) => {
  const { title, isLoading, hasError, animations, style = DEFAULT_STYLE } = props;

  const spinnerStyle = {
    height: style.height,
    width: style.width,
  };

  return (
    <>
      <Grid container direction="row" sx={{ alignItems: 'center' }}>
        <Grid>
          <Typography variant={style.variant}>{title}</Typography>
        </Grid>
        <Grid>
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
