// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import * as PropTypes from 'prop-types';
import { IconButton, Tooltip, makeStyles } from '@material-ui/core';
import { AccessTime as AccessTimeIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import DashboardPlaceholder from '../Dashboard/components';
import { PowerBIUtils } from '@cosmotech/azure';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative'
  },
  divContainer: {
    height: '100%',
    width: '100%'
  },
  errorContainer: {
    height: '50px',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    padding: '5px 0',
    backgroundColor: theme.palette.error.dark,
    color: theme.palette.error.contrastText
  },
  errorTitle: {
    fontWeight: 'bold',
    fontSize: 'large'
  },
  errorDescription: {
    fontWeight: 'bold',
    fontSize: 'small'
  },
  toolbar: {
    height: '10px'
  }
}));

function getErrorCode (t, reports) {
  let errorCode = t('commoncomponents.iframe.scenario.error.unknown.label', 'Unknown error');
  if (reports?.error?.status && reports?.error?.statusText) {
    errorCode = `${reports?.error?.status} - ${reports?.error?.statusText}`;
  }
  return errorCode;
}

function getErrorDescription (t, reports) {
  let errorDescription = t('commoncomponents.iframe.scenario.error.unknown.details',
    'Something went wrong when fetching PowerBI reports info');
  if (reports?.error?.powerBIErrorInfo) {
    errorDescription = reports?.error?.powerBIErrorInfo;
  }
  return errorDescription;
}

function addDynamicParameters (pageName, lang, newConfig, settings, staticFilters, additionalFilters) {
  if (pageName !== undefined && pageName[lang] !== undefined) {
    newConfig.pageName = pageName[lang];
  }

  if (settings !== undefined) {
    newConfig.settings = settings;
  }

  if (staticFilters !== undefined || additionalFilters !== undefined) {
    let filters = [];
    if (staticFilters !== undefined) {
      filters = filters.concat(staticFilters);
    }
    if (additionalFilters !== undefined) {
      filters = filters.concat(additionalFilters);
    }
    newConfig.filters = filters;
  }
}

const SimplePowerBIReportEmbed = ({
  index,
  reports,
  reportConfiguration,
  scenario,
  lang,
  downloadLogsFile,
  refreshable,
  refreshTimeout
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { reportId, settings, staticFilters, dynamicFilters, pageName } = reportConfiguration[index];

  // PowerBI Report object (received via callback)
  const [report, setReport] = useState();
  const [disabled, setDisabled] = useState(false);
  const [embedConfig, setEmbedConfig] = useState({
    type: 'report',
    id: reportId,
    embedUrl: '',
    accessToken: '',
    tokenType: 1 // 1 Embed or 0 Aad
  });

  const scenarioDTO = useMemo(
    () => PowerBIUtils.constructScenarioDTO(scenario), [scenario]);
  const additionalFilters = useMemo(
    () => PowerBIUtils.constructDynamicFilters(dynamicFilters, scenarioDTO),
    [dynamicFilters, scenarioDTO]);
  const noScenario = scenario === null;
  const scenarioState = noScenario ? 'Created' : scenarioDTO.state;
  const noRun = scenarioState === 'Created' || scenarioState === null;
  const runInProgress = scenarioState === 'Running';
  const hasError = scenarioState === 'Failed';
  const isReady = (scenarioState === undefined || scenarioState === 'Successful') && !noScenario;

  useEffect(() => {
    const newConfig = {
      type: 'report',
      id: reportId,
      tokenType: 1,
      embedUrl: reports.data?.reportsInfo?.[reportId]?.embedUrl,
      accessToken: reports.data?.accessToken
    };
    addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters);
    setEmbedConfig(newConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, scenario, reports.status]);

  const errorCode = getErrorCode(t, reports);
  const errorDescription = getErrorDescription(t, reports);

  const refreshReport = () => {
    report.refresh();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, refreshTimeout);
  };

  return (
      <div className={classes.root}>
        <div className={classes.errorContainer} hidden={reports.status !== 'ERROR'}>
          <div className={classes.errorTitle}>
            { errorCode }
          </div>
          <div className={classes.errorDescription}>
            { errorDescription }
          </div>
        </div>
        { noScenario && <DashboardPlaceholder
            label={t('commoncomponents.iframe.scenario.noscenario.label',
              'You can create a scenario by clicking on') + ' "' +
            t('commoncomponents.button.create.scenario.label', 'Create Alternative Scenario') + '"'}
            title={t('commoncomponents.iframe.scenario.noscenario.title', 'No scenario yet')}
        />
        }
        { noRun && <DashboardPlaceholder
            label={t('commoncomponents.iframe.scenario.results.label.uninitialized',
              'The scenario has not been run yet')}
        />
        }
        { runInProgress && <DashboardPlaceholder
            label={t('commoncomponents.iframe.scenario.results.label.running', 'Scenario run in progress...')}
            icon={ <AccessTimeIcon color="primary" fontSize="large"/> }
        />
        }
        {
          hasError && <DashboardPlaceholder
            label={t('commoncomponents.iframe.scenario.results.text.error', 'An error occured during the scenario run')}
            downloadLogsFile={downloadLogsFile}
          />
        }
        <div className={classes.divContainer} hidden={!isReady}>
          { refreshable &&
          <div className={classes.toolbar}>
            <Tooltip title={t('commoncomponents.iframe.scenario.results.button.refresh', 'Refresh')}>
                <IconButton aria-label="refresh" disabled={!report || disabled} color="primary" onClick={refreshReport}>
                  <RefreshIcon/>
                </IconButton>
            </Tooltip>
          </div>
          }
          <PowerBIEmbed
            cssClassName={classes.divContainer}
            embedConfig={embedConfig}
            getEmbeddedComponent={ (embedObject) => {
              setReport(embedObject);
            } }
          />
        </div>
      </div>
  );
};

SimplePowerBIReportEmbed.propTypes = {
  index: PropTypes.number,
  reports: PropTypes.object.isRequired,
  reportConfiguration: PropTypes.array.isRequired,
  scenario: PropTypes.object,
  lang: PropTypes.string.isRequired,
  downloadLogsFile: PropTypes.func,
  refreshable: PropTypes.bool,
  refreshTimeout: PropTypes.number
};
SimplePowerBIReportEmbed.defaultProps = {
  index: 0,
  refreshable: true,
  refreshTimeout: 15000
};

export default SimplePowerBIReportEmbed;
