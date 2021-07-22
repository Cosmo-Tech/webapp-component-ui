// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@material-ui/core';

const LoadingLine = props => {
  const { t } = useTranslation();
  const { titleKey, isLoading, hasError, height, width, dataLoaderOptions, dataLoadedOptions, errorDataOptions } = props;
  return (
      <>
        <Grid container direction="row" alignItems={'center'}>
          <Grid item >
            <Typography variant="h2">
              {t(titleKey, 'LoadingLine Title')}
            </Typography>
          </Grid>
          <Grid item >
            {isLoading
              ? (<Lottie options={dataLoaderOptions} height={height} width={width} />)
              : (<Lottie options={hasError ? errorDataOptions : dataLoadedOptions} height={height} width={width} />)}
          </Grid>
        </Grid>
      </>
  );
};

LoadingLine.propTypes = {
  titleKey: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  dataLoaderOptions: PropTypes.object.isRequired,
  dataLoadedOptions: PropTypes.object.isRequired,
  errorDataOptions: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

export default LoadingLine;
