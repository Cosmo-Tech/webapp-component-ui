// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import makeStyles from '@mui/styles/makeStyles';

import { SHRUNK_NODE_HEIGHT, EXPANDED_NODE_HEIGHT } from './constants';

const useStyles = makeStyles((theme) => ({
  rootShrunkScenarioContainer: {
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    width: '100%',
    '& .MuiAccordion-root': {
      height: `${SHRUNK_NODE_HEIGHT}px`,
    },
  },
  rootExpandedScenarioContainer: {
    borderColor: theme.palette.divider,
    '&:hover': {
      borderColor: theme.palette.text.primary,
    },
    borderWidth: '1px',
    borderStyle: 'solid',
    width: '100%',
    '& .MuiAccordion-root': {
      height: `${EXPANDED_NODE_HEIGHT}px`,
    },
    '& .MuiCollapse-root': {
      height: `calc(100% - ${SHRUNK_NODE_HEIGHT}px) !important`,
      '& .MuiCollapse-wrapper': {
        height: '100%',
        '& .MuiCollapse-wrapperInner': {
          height: '100%',
          '& div[role=region]': {
            height: '100%',
          },
        },
      },
    },
  },
  accordionSummary: {
    height: `${SHRUNK_NODE_HEIGHT}px !important`,
    minHeight: `${SHRUNK_NODE_HEIGHT}px !important`,
    alignItems: 'center',
    '& .MuiAccordionSummary-expandIcon': {
      color: theme.palette.primary.main,
    },
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
    },
  },
  cardLabel: {
    fontWeight: 'bold',
  },
  statusRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  scenarioDeleteButton: {
    color: theme.palette.error.main,
  },
  scenarioHeader: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scenarioHeaderItem: {
    marginRight: '24px',
  },
  scenarioDetailsContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  scenarioDetailsNameLine: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  scenarioDetailsStatusContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  scenarioTitle: {
    maxWidth: '500px',
    color: theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  statusUnknown: {
    marginLeft: '5px',
    color: theme.palette.warning.main,
    fontWeight: 'bold',
  },
  statusCreated: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  statusRunning: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  statusSuccessful: {
    marginLeft: '5px',
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  statusFailed: {
    marginLeft: '5px',
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  statusSuccessfulIcon: {
    marginLeft: '10px',
    color: theme.palette.success.main,
  },
  statusFailedIcon: {
    marginLeft: '10px',
    color: theme.palette.error.main,
  },
  statusRunningIcon: {
    marginLeft: '15px',
    color: theme.palette.text.primary,
  },
  statusUnknownIcon: {
    marginLeft: '10px',
    color: theme.palette.warning.main,
  },
  datasets: {
    marginLeft: '15px',
  },
  clickableValidationStatusChip: {
    marginLeft: '10px',
    height: '24px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  nonClickableValidationStatusChip: {
    marginLeft: '10px',
    height: '24px',
  },
}));

export default useStyles;
