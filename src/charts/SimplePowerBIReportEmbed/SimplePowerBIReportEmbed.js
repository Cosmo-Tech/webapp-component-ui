// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useState } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import * as PropTypes from 'prop-types';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { AccessTime as AccessTimeIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import DashboardPlaceholder from '../Dashboard/components';
import { FixedRatioContainer } from '../../misc/FixedRatioContainer';
import { PowerBIUtils } from '@cosmotech/azure';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    position: 'relative',
  },
  divContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  report: {
    height: '100%',
    width: '100%',
  },
  errorContainer: {
    'z-index': '1', // Need z-index > 0, otherwise the error banner is hidden behind the powerbi loading screen
    height: '50px',
    width: '100%',
    position: 'absolute',
    textAlign: 'center',
    padding: '5px 0',
    backgroundColor: theme.palette.error.dark,
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
  iframeContainerWithRatio: {
    height: '100%',
  },
  iframeContainerWithoutRatio: ({ hasNavContentPane }) => ({
    height: hasNavContentPane ? 'calc(100% - 35px)' : '100%',
    width: '100%',
  }),
}));

function getErrorCode(labels, reports) {
  let errorCode = labels.errors.unknown;
  if (reports?.error?.status && reports?.error?.statusText) {
    errorCode = `${reports?.error?.status} - ${reports?.error?.statusText}`;
  }
  return errorCode;
}

function getErrorDescription(labels, reports) {
  let errorDescription = labels.errors.details;
  if (reports?.error?.powerBIErrorInfo) {
    errorDescription = reports?.error?.powerBIErrorInfo;
  }
  return errorDescription;
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
  useAAD,
  iframeRatio,
}) => {
  const { reportId, settings, staticFilters, dynamicFilters, pageName } = reportConfiguration[index];
  const hasNavContentPane = settings?.navContentPaneEnabled;
  const iframeHeightOffset = hasNavContentPane ? '35px' : '0px';
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
    tokenType: tokenType,
  });

  const scenarioDTO = useMemo(() => PowerBIUtils.constructScenarioDTO(scenario), [scenario]);
  const additionalFilters = useMemo(
    () => PowerBIUtils.constructDynamicFilters(dynamicFilters, scenarioDTO),
    [dynamicFilters, scenarioDTO]
  );
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
      tokenType: tokenType,
      embedUrl: reports.data?.reportsInfo?.[reportId]?.embedUrl,
      accessToken: reports.data?.accessToken,
    };
    addDynamicParameters(pageName, lang, newConfig, settings, staticFilters, additionalFilters);
    setEmbedConfig(newConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, scenario, reports.status]);

  const errorCode = getErrorCode(labels, reports);
  const errorDescription = getErrorDescription(labels, reports);

  const refreshReport = () => {
    report.refresh();
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, refreshTimeout);
  };

  const iframe = (
    <PowerBIEmbed
      cssClassName={classes.report}
      embedConfig={embedConfig}
      getEmbeddedComponent={(embedObject) => {
        setReport(embedObject);
      }}
    />
  );

  let iframeContainer;
  if (iframeRatio != null && iframeRatio > 0) {
    iframeContainer = (
      <FixedRatioContainer
        className={classes.iframeContainerWithRatio}
        width="100%"
        ratio={iframeRatio}
        heightOffset={iframeHeightOffset}
      >
        {iframe}
      </FixedRatioContainer>
    );
  } else {
    iframeContainer = <div className={classes.iframeContainerWithoutRatio}>{iframe}</div>;
  }

  return (
    <div className={classes.root}>
      <div className={classes.errorContainer} hidden={reports.status !== 'ERROR'}>
        <div className={classes.errorTitle}>{errorCode}</div>
        <div className={classes.errorDescription}>{errorDescription}</div>
      </div>
      {noScenario && <DashboardPlaceholder label={labels.noScenario.label} title={labels.noScenario.title} />}
      {!noScenario && noRun && !alwaysShowReports && (
        <DashboardPlaceholder label={labels.noRun.label} title={labels.noRun.title} />
      )}
      {runInProgress && !alwaysShowReports && (
        <DashboardPlaceholder
          label={labels.inProgress.label}
          title={labels.inProgress.title}
          icon={<AccessTimeIcon color="primary" fontSize="large" />}
        />
      )}
      {hasError && !alwaysShowReports && (
        <DashboardPlaceholder
          label={labels.hasErrors.label}
          title={labels.hasErrors.title}
          downloadLogsFile={downloadLogsFile}
          downloadLabel={labels.downloadButton}
        />
      )}
      <div className={classes.divContainer} style={!isReady && !alwaysShowReports ? { display: 'none' } : {}}>
        {refreshable && (
          <div className={classes.toolbar}>
            <Tooltip title={labels.refreshTooltip}>
              <IconButton aria-label="refresh" disabled={!report || disabled} color="primary" onClick={refreshReport}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
        {iframeContainer}
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
    downloadButton: PropTypes.string.isRequired,
    refreshTooltip: PropTypes.string.isRequired,
    errors: PropTypes.shape({
      unknown: PropTypes.string.isRequired,
      details: PropTypes.string.isRequired,
    }).isRequired,
  }),
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
      label: 'You can create a scenario by clicking on Create new scenario',
    },
    noRun: {
      label: 'The scenario has not been run yet',
    },
    inProgress: {
      label: 'Scenario run in progress...',
    },
    hasErrors: {
      label: 'An error occured during the scenario run',
    },
    downloadButton: 'Download logs',
    refreshTooltip: 'Refresh',
    errors: {
      unknown: 'Unknown error',
      details: 'Something went wrong when fetching PowerBI reports info',
    },
  },
};
