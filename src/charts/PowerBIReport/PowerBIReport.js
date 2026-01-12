// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { PowerBIEmbed } from 'powerbi-client-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PowerBIUtils } from '@cosmotech/azure';
import { RUNNER_RUN_STATE } from '../../common/apiConstants';
import { FadingTooltip } from '../../misc';
import DashboardPlaceholder from '../DashboardPlaceholder';

const PREFIX = 'PowerBIReport';
const classes = { report: `${PREFIX}-report` };

const Root = styled('div')(({ theme }) => ({
  [`& .${classes.report}`]: {
    height: '100%',
    flex: 1,
  },
}));

function addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters) {
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

const DEFAULT_LABELS = {
  refreshTooltip: 'Refresh',
};

export const PowerBIReport = ({
  index = 0,
  reports,
  reportConfiguration,
  scenario,
  alwaysShowReports = false,
  lang,
  downloadLogsFile,
  refreshable = true,
  refreshTimeout = 15000,
  labels: tmpLabels,
  iframeRatio,
  useAAD = false,
  visibleScenarios = [],
  theme,
}) => {
  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...tmpLabels }), [tmpLabels]);
  const { reportId, settings, staticFilters, dynamicFilters, pageName } = reportConfiguration[index] || {};

  // 1 Embed or 0 Aad
  const tokenType = useAAD ? 0 : 1;
  // PowerBI Report object (received via callback)
  const [report, setReport] = useState();
  const [disabled, setDisabled] = useState(false);
  const [embedConfig, setEmbedConfig] = useState({
    type: 'report',
    id: reportId,
    embedUrl: '',
    accessToken: '',
    tokenType,
  });

  const scenarioDTO = useMemo(
    () => PowerBIUtils.constructScenarioDTO(scenario, visibleScenarios),
    [scenario, visibleScenarios]
  );
  const noScenario = scenario === null;
  const scenarioLastRunStatus = noScenario ? RUNNER_RUN_STATE.CREATED : scenarioDTO.lastRunStatus;

  const additionalFilters = useMemo(
    () => PowerBIUtils.constructDynamicFilters(dynamicFilters, scenarioDTO),
    [dynamicFilters, scenarioDTO]
  );

  const placeholder = useMemo(() => {
    return (
      <DashboardPlaceholder
        alwaysShowReports={alwaysShowReports}
        disabled={reports?.status === 'DISABLED'}
        downloadLogsFile={downloadLogsFile}
        noDashboardConfigured={reportConfiguration[index] == null}
        scenario={scenario}
        scenarioDTO={scenarioDTO}
        labels={labels}
      />
    );
  }, [alwaysShowReports, reports, downloadLogsFile, reportConfiguration, index, scenario, scenarioDTO, labels]);

  useEffect(() => {
    const newConfig = {
      type: 'report',
      id: reportId,
      tokenType,
      embedUrl: reports.data?.reportsInfo?.[reportId]?.embedUrl,
      accessToken: reports.data?.accessToken,
      theme: { themeJson: theme },
    };

    addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters);
    setEmbedConfig(newConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, scenario, reports.status, theme]);

  useEffect(() => {
    if (theme) {
      report?.applyTheme({ themeJson: theme });
    }
  }, [theme, report]);

  const refreshReport = useCallback(
    (triggerTimeout = true) => {
      if (!report) return;
      report.refresh();

      if (triggerTimeout) {
        setDisabled(true);
        setTimeout(() => {
          setDisabled(false);
        }, refreshTimeout);
      }
    },
    [refreshTimeout, report]
  );

  useEffect(() => {
    if (scenarioLastRunStatus === RUNNER_RUN_STATE.SUCCESSFUL) refreshReport(false);
  }, [refreshReport, scenarioLastRunStatus]);

  const iframe = useMemo(() => {
    if (!embedConfig?.embedUrl) {
      return null;
    }

    let content;
    try {
      content = (
        <PowerBIEmbed cssClassName={classes.report} embedConfig={embedConfig} getEmbeddedComponent={setReport} />
      );
    } catch (error) {
      console.log('Error when intializing the PowerBIEmbed component.');
      console.error(error);
      return null;
    }

    return content;
  }, [embedConfig]);

  const isReady =
    (scenarioLastRunStatus === undefined || scenarioLastRunStatus === RUNNER_RUN_STATE.SUCCESSFUL) && !noScenario;

  const divContainerStyle = {};
  if (!isReady && !alwaysShowReports) {
    divContainerStyle.display = 'none';
  }

  if (iframeRatio && !Number.isNaN(iframeRatio)) {
    divContainerStyle.aspectRatio = String(iframeRatio);
  } else {
    divContainerStyle.height = '100%';
  }

  return (
    <Root style={{ height: '100%', width: '100%', position: 'relative' }}>
      {placeholder}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'row', ...divContainerStyle }}>
        {refreshable && (
          <div style={{ height: '100%' }}>
            <FadingTooltip title={labels.refreshTooltip}>
              <IconButton
                aria-label="refresh"
                disabled={!report || disabled}
                color="primary"
                onClick={refreshReport}
                size="large"
              >
                <RefreshIcon />
              </IconButton>
            </FadingTooltip>
          </div>
        )}
        {iframe}
      </div>
    </Root>
  );
};

PowerBIReport.propTypes = {
  /**
   * Index of reportConfiguration
   */
  index: PropTypes.number,
  /**
   * List of available reports
   */
  reports: PropTypes.object.isRequired,
  /**
   * List of configuration report
   */
  reportConfiguration: PropTypes.array.isRequired,
  /**
   * Current scenario
   */
  scenario: PropTypes.object,
  /**
   * If set to true, PowerBI reports will always be displayed, despite the scenario state
   */
  alwaysShowReports: PropTypes.bool,
  /**
   * Current language
   */
  lang: PropTypes.string.isRequired,
  /**
   * Function bound on "Download logs" button
   */
  downloadLogsFile: PropTypes.func,
  /**
   *  Defines the refreshButton's state:
   *  - true : the refreshButton appears
   *  - false : the refreshButton is hidden
   */
  refreshable: PropTypes.bool,
  /**
   *  Defines the time during which the refresh button is disabled
   *  (PowerBI allows refresh actions only every 15 seconds)
   */
  refreshTimeout: PropTypes.number,
  /**
   *  Defines the tokenType used for reports
   *  - true: access token used is flagged as an AAD token
   *  - false: access token used is flagged as an Embed token
   */
  useAAD: PropTypes.bool,
  /**
   * Array of scenarios data, containing only the scenarios that the current user has access to. You can leave this prop
   * undefined to ignore scenario filters based on user permissions. Scenarios objects must respect the following
   * schema:
   *  - id (mandatory): scenario identifier
   *  - runId (optional): scenario run identifier
   *  - csmSimulationRun (optional): identifier of the csmSimulationRun
   */
  visibleScenarios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      runId: PropTypes.string,
      csmSimulationRun: PropTypes.string,
    })
  ),
  /**
   *  Display ratio (width/height) of the PowerBI iframe, expressed as a number.
   */
  iframeRatio: PropTypes.number,
  /**
   * Structure:
   * <pre>
   * {
      noScenario: {
        title:'string',
        label:'string'
        },
      noRun: {
        title: 'string',
        label: 'string'
        },
      inProgress: {
        title: 'string',
        label:'string'
        },
      hasErrors: {
        title:'string',
        label: 'string'
      },
      downloadButton: 'string',
      refreshButton: 'string',
      errors: {
        unknown : 'string',
        details : 'string'
      }
   }
   * </pre>
   */
  labels: PropTypes.shape({
    noScenario: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    noDashboard: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string,
    }),
    noRun: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    inProgress: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    hasErrors: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string.isRequired,
    }).isRequired,
    hasUnknownStatus: PropTypes.shape({
      title: PropTypes.string,
      label: PropTypes.string,
    }),
    resultsDisplayDisabled: PropTypes.string,
    downloadButton: PropTypes.string.isRequired,
    refreshTooltip: PropTypes.string.isRequired,
    errors: PropTypes.shape({
      unknown: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    }).isRequired,
  }),
  /**
   *  Power BI object theme
   */
  theme: PropTypes.object,
};
