// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useTranslation } from 'react-i18next';
import {
  Typography,
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  gridContainer: {
    height: '100%'
  },
  iframe: {
    display: 'block',
    height: '100%',
    width: '100%'
  },
  label: {
    size: 14
  }
}));

const Dashboard = (props) => {
  const { t } = useTranslation();

  const classes = useStyles();

  const { iframeTitle, url, scenarioName, scenarioId, ...otherProps } = props;

  const formattedUrl = url.replaceAll('<ScenarioName>', scenarioName).replaceAll('<ScenarioId>', scenarioId);

  return (
    <>
      { formattedUrl !== '' &&
        <iframe
          className={classes.iframe}
          title={iframeTitle}
          frameBorder="0"
          allowFullScreen={true}
          src={formattedUrl} {...otherProps}
        />
      }
      { formattedUrl === '' &&
        <Grid container justify="center" alignItems="center" className={classes.gridContainer}>
          <Grid item>
            <Typography
              component="h2"
              color="textSecondary"
              className={classes.label}
            >
              {t('commoncomponents.iframe.scenario.results.text.no.result', 'No dashboards for this scenario.')}
            </Typography>
          </Grid>
        </Grid>
      }
    </>
  );
};

Dashboard.propTypes = {
  iframeTitle: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  scenarioName: PropTypes.string,
  scenarioId: PropTypes.string
};

export default withStyles(useStyles)(Dashboard);
