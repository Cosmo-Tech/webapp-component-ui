// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Backdrop } from '@mui/material';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { PowerBIUtils } from '@cosmotech/azure';
import { useDashboardPlaceholder } from '../DashboardPlaceholder/useDashboardPlaceholder';

export const SUPERSET_GUEST_TOKEN_STATUS = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
};

export const SupersetReport = ({
  alwaysShowReports = false,
  disabled = false,
  isParentLoading = false,
  downloadLogsFile,
  guestToken,
  noDashboardConfigured = false,
  labels,
  options,
  report,
  scenario,
  style,
  visibleScenarios = [],
}) => {
  const containerRef = useRef(null);
  const tokenRef = useRef(null);
  const previousUiConfigRef = useRef(null);

  const [isEmbedded, setIsEmbedded] = useState(false);
  const [dashboard, setDashboard] = useState(null);

  const { getDashboardPlaceholder } = useDashboardPlaceholder();

  useEffect(() => {
    if (guestToken?.status !== SUPERSET_GUEST_TOKEN_STATUS.SUCCESS) return;

    tokenRef.current = guestToken?.value;
  }, [guestToken?.status, guestToken?.value]);

  useEffect(() => {
    if (!report?.id || !options?.supersetUrl) return;

    const loadSuperset = async () => {
      if (guestToken?.status !== SUPERSET_GUEST_TOKEN_STATUS.SUCCESS) return;

      const forceRefresh = JSON.stringify(report?.uiConfig) !== JSON.stringify(previousUiConfigRef.current);
      if (isEmbedded && !forceRefresh) return;

      previousUiConfigRef.current = report?.uiConfig;
      try {
        const embedded = await embedDashboard({
          id: report.id,
          supersetDomain: options.supersetUrl,
          mountPoint: containerRef.current,
          fetchGuestToken: async () => tokenRef.current,
          dashboardUiConfig: report?.uiConfig ?? {},
        });
        setDashboard(embedded);
        setIsEmbedded(true);
      } catch (error) {
        console.error('Superset embedding failed:', error);
      }
    };

    loadSuperset();

    if (containerRef.current && containerRef.current.children[0]) {
      containerRef.current.children[0].style.width = '100%';
      containerRef.current.children[0].style.height = '100%';
    }

    return () => {
      if (dashboard?.destroy) dashboard.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmbedded, report?.id, report?.uiConfig, options.supersetUrl, guestToken]);

  const { placeholder, showPlaceholder } = useMemo(() => {
    const scenarioDTO = PowerBIUtils.constructScenarioDTO(scenario, visibleScenarios);
    return getDashboardPlaceholder({
      alwaysShowReports,
      disabled,
      downloadLogsFile,
      noDashboardConfigured: report == null,
      scenario,
      scenarioDTO,
      labels,
      hasTokenForBI: guestToken?.status === SUPERSET_GUEST_TOKEN_STATUS.SUCCESS,
    });
  }, [
    guestToken?.status,
    getDashboardPlaceholder,
    alwaysShowReports,
    disabled,
    downloadLogsFile,
    report,
    scenario,
    visibleScenarios,
    labels,
  ]);

  const isReportVisible = isEmbedded && !showPlaceholder;
  const containerHeight = isReportVisible ? (report?.height ?? style?.height ?? '800px') : '100%';
  const containerWidth = isReportVisible ? (report?.width ?? style?.width ?? '100%') : '100%';
  const reportContainerDisplay = isReportVisible ? undefined : 'none';
  const isWaitingForToken = guestToken?.status === SUPERSET_GUEST_TOKEN_STATUS.LOADING && guestToken?.value === '';
  const showLoadingSpinner =
    !isParentLoading &&
    guestToken?.status !== SUPERSET_GUEST_TOKEN_STATUS.ERROR &&
    placeholder == null &&
    (!isEmbedded || isWaitingForToken);

  return (
    <Box sx={{ position: 'relative', width: containerWidth, height: containerHeight, overflow: 'hidden' }}>
      {placeholder}
      <Backdrop
        open={showLoadingSpinner}
        sx={{ position: 'absolute', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" sx={{ position: 'absolute' }} />
      </Backdrop>
      <Box
        data-cy="superset-report-container"
        ref={containerRef}
        sx={{ width: '100%', height: '100%', display: reportContainerDisplay }}
      />
    </Box>
  );
};

SupersetReport.propTypes = {
  alwaysShowReports: PropTypes.bool,
  disabled: PropTypes.bool,
  isParentLoading: PropTypes.bool,
  downloadLogsFile: PropTypes.func,
  // guestToken: object with shape {value, status}
  //  - value: (string) token value
  //  - status: (string) status of the token retrieval process ("IDLE", "LOADING", "ERROR", "SUCCESS")
  guestToken: PropTypes.shape({ value: PropTypes.string.isRequired, status: PropTypes.string.isRequired }).isRequired,
  labels: PropTypes.object,
  noDashboardConfigured: PropTypes.bool,
  options: PropTypes.shape({ supersetUrl: PropTypes.string.isRequired }).isRequired,
  report: PropTypes.shape({
    id: PropTypes.string.isRequired,
    height: PropTypes.string,
    width: PropTypes.string,
    uiConfig: PropTypes.object,
  }).isRequired,
  scenario: PropTypes.object,
  style: PropTypes.object,
  visibleScenarios: PropTypes.array,
};
