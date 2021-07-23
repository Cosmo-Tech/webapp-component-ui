// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import * as PropTypes from 'prop-types';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DashboardPlaceholder from '../Dashboard/components';
import { PowerBIUtils } from '@cosmotech/azure';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  divContainer: {
    height: '100%',
    width: '100%'
  }
}));

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

const SimplePowerBIReportEmbed = ({ index, reports, reportConfiguration, scenario, lang, downloadLogsFile }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { reportId, settings, staticFilters, dynamicFilters, pageName } = reportConfiguration[index];

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
      embedUrl: reports.data?.reportsInfo[reportId]?.embedUrl,
      accessToken: reports.data?.accessToken
    };
    addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters);
    setEmbedConfig(newConfig);
  }, [reports, staticFilters, settings, additionalFilters, reportId, pageName, lang]);

  return (
      <>
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
        {
          isReady && <PowerBIEmbed cssClassName={classes.divContainer} embedConfig={embedConfig} />
        }
      </>
  );
};

SimplePowerBIReportEmbed.propTypes = {
  index: PropTypes.number,
  reports: PropTypes.object.isRequired,
  reportConfiguration: PropTypes.array.isRequired,
  scenario: PropTypes.object,
  lang: PropTypes.string.isRequired,
  downloadLogsFile: PropTypes.func
};
SimplePowerBIReportEmbed.defaultProps = {
  index: 0
};

export default SimplePowerBIReportEmbed;
