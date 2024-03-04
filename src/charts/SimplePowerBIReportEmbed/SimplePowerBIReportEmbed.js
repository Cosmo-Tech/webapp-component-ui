// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { PowerBIEmbed } from 'powerbi-client-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as PropTypes from 'prop-types';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { PowerBIUtils } from '@cosmotech/azure';
import { FadingTooltip } from '../../misc';
import DashboardPlaceholder from '../Dashboard/components';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  divContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  report: {
    height: '100%',
    flex: 1,
  },
  errorContainer: {
    'z-index': '1', // Need z-index > 0, otherwise the error banner is hidden behind the powerbi loading screen
    height: '50px',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    padding: '5px 0',
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  errorTitle: {
    fontWeight: 'bold',
    fontSize: 'large',
  },
  errorDescription: {
    fontWeight: 'bold',
    fontSize: 'small',
  },
  toolbar: {
    height: '100%',
  },
}));

function getErrorCode(labels, reports) {
  if (!reports?.error?.status && !reports?.error?.statusText) return labels.errors.unknown;
  return `${reports?.error?.status ?? ''} ${reports?.error?.statusText ?? ''}`;
}

function getErrorDescription(labels, reports) {
  return reports?.error?.powerBIErrorInfo ?? labels.errors.details;
}

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

export const SimplePowerBIReportEmbed = ({
  index,
  reports,
  reportConfiguration,
  scenario,
  alwaysShowReports,
  lang,
  downloadLogsFile,
  refreshable,
  refreshTimeout,
  labels,
  iframeRatio,
  useAAD,
  visibleScenarios,
  theme,
}) => {
  const { reportId, settings, staticFilters, dynamicFilters, pageName } = reportConfiguration[index] || {};
  const hasNavContentPane = settings?.navContentPaneEnabled;
  const classes = useStyles({ hasNavContentPane });

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
  const additionalFilters = useMemo(
    () => PowerBIUtils.constructDynamicFilters(dynamicFilters, scenarioDTO),
    [dynamicFilters, scenarioDTO]
  );
  const noScenario = scenario === null;
  const scenarioState = noScenario ? 'Created' : scenarioDTO.state;
  const noRun = scenarioState === 'Created' || scenarioState === null;
  const runInProgress = scenarioState === 'Running';
  const dataInTransfer = scenarioState === 'DataIngestionInProgress';
  const hasError = scenarioState === 'Failed';
  const hasUnknownStatus = scenarioState === 'Unknown';
  const noDashboardConfigured = reportConfiguration[index] === undefined;

  const getPlaceholder = () => {
    if (alwaysShowReports) return null;
    if (noScenario) return <DashboardPlaceholder label={labels.noScenario.label} title={labels.noScenario.title} />;
    if (noRun) return <DashboardPlaceholder label={labels.noRun.label} title={labels.noRun.title} />;
    if (runInProgress)
      return <DashboardPlaceholder label={labels.inProgress.label} title={labels.inProgress.title} inProgress />;
    if (dataInTransfer) {
      return (
        <DashboardPlaceholder label={labels.dataInTransfer.label} title={labels.dataInTransfer.title} inProgress />
      );
    }
    if (hasError)
      return (
        <DashboardPlaceholder
          label={labels.hasErrors.label}
          title={labels.hasErrors.title}
          downloadLogsFile={downloadLogsFile}
          downloadLabel={labels.downloadButton}
        />
      );
    if (hasUnknownStatus) return <DashboardPlaceholder label={labels.hasUnknownStatus.label} />;
    if (noDashboardConfigured) return <DashboardPlaceholder label={labels.noDashboard.label} />;
    return null;
  };

  useEffect(() => {
    const newConfig = {
      type: 'report',
      id: reportId,
      tokenType,
      embedUrl: reports.data?.reportsInfo?.[reportId]?.embedUrl,
      accessToken: reports.data?.accessToken,
    };

    addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters);
    setEmbedConfig(newConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, scenario, reports.status]);

  useEffect(() => {
    if (theme) {
      report?.applyTheme({ themeJson: theme });
    }
  }, [theme, report]);

  const errorCode = getErrorCode(labels, reports);
  const errorDescription = getErrorDescription(labels, reports);

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
    if (scenarioState === 'Successful') refreshReport(false);
  }, [refreshReport, scenarioState]);

  const iframe = useMemo(() => {
    if (!embedConfig?.embedUrl) {
      return null;
    }

    let content;
    try {
      content = (
        <PowerBIEmbed
          cssClassName={classes.report}
          embedConfig={embedConfig}
          getEmbeddedComponent={(embedObject) => {
            if (theme) {
              embedObject.applyTheme({ themeJson: theme });
            }
            setReport(embedObject);
          }}
        />
      );
    } catch (error) {
      console.log('Error when intializing the PowerBIEmbed component.');
      console.error(error);
      return null;
    }

    return content;
  }, [classes.report, embedConfig, theme]);

  const placeholder = getPlaceholder();
  const isReady = (scenarioState === undefined || scenarioState === 'Successful') && !noScenario;

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
    <div className={classes.root}>
      <div className={classes.errorContainer} hidden={reports.status !== 'ERROR'}>
        <div className={classes.errorTitle}>{errorCode}</div>
        <div className={classes.errorDescription}>{errorDescription}</div>
      </div>
      {placeholder}
      <div className={classes.divContainer} style={divContainerStyle}>
        {refreshable && (
          <div className={classes.toolbar}>
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
    </div>
  );
};

SimplePowerBIReportEmbed.propTypes = {
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
    dataInTransfer: PropTypes.shape({
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

SimplePowerBIReportEmbed.defaultProps = {
  index: 0,
  alwaysShowReports: false,
  refreshable: true,
  refreshTimeout: 15000,
  useAAD: false,
  labels: {
    noScenario: {
      title: 'No scenario yet',
      label: 'You can create a scenario by clicking on the CREATE button',
    },
    noDashboard: {
      label: "There isn't any dashboard configured for this run type",
    },
    noRun: {
      label: 'The scenario has not been run yet',
    },
    inProgress: {
      label: 'Scenario run in progress...',
    },
    dataInTransfer: {
      label: 'Transfer of scenario results in progress...',
    },
    hasErrors: {
      label: 'An error occured during the scenario run',
    },
    hasUnknownStatus: {
      label: 'This scenario has an unknown state, if the problem persists, please, contact your administrator',
    },
    downloadButton: 'Download logs',
    refreshTooltip: 'Refresh',
    errors: {
      unknown: 'Unknown error',
      details: 'Something went wrong when fetching PowerBI reports info',
    },
  },
};
