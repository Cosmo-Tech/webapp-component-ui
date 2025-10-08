// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SHRUNK_NODE_HEIGHT, EXPANDED_NODE_HEIGHT } from './constants';

const PREFIX = 'ScenarioNode';
export const classes = {
  rootShrunkScenarioContainer: `${PREFIX}-rootShrunkScenarioContainer`,
  rootExpandedScenarioContainer: `${PREFIX}-rootExpandedScenarioContainer`,
  statusUnknown: `${PREFIX}-statusUnknown`,
  statusCreated: `${PREFIX}-statusCreated`,
  statusRunning: `${PREFIX}-statusRunning`,
  statusSuccessful: `${PREFIX}-statusSuccessful`,
  statusFailed: `${PREFIX}-statusFailed`,
  statusSuccessfulIcon: `${PREFIX}-statusSuccessfulIcon`,
  statusFailedIcon: `${PREFIX}-statusFailedIcon`,
  statusRunningIcon: `${PREFIX}-statusRunningIcon`,
  statusUnknownIcon: `${PREFIX}-statusUnknownIcon`,
  clickableValidationStatusChip: `${PREFIX}-clickableValidationStatusChip`,
  nonClickableValidationStatusChip: `${PREFIX}-nonClickableValidationStatusChip`,
};

export const Root = styled(Paper)(({ theme }) => ({
  [`& .${classes.rootShrunkScenarioContainer}`]: {
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
  [`& .${classes.rootExpandedScenarioContainer}`]: {
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
  [`& .${classes.statusUnknown}`]: {
    marginLeft: '5px',
    color: theme.palette.warning.main,
    fontWeight: 'bold',
  },
  [`& .${classes.statusCreated}`]: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  [`& .${classes.statusRunning}`]: {
    marginLeft: '5px',
    fontWeight: 'bold',
  },
  [`& .${classes.statusSuccessful}`]: {
    marginLeft: '5px',
    color: theme.palette.success.main,
    fontWeight: 'bold',
  },
  [`& .${classes.statusFailed}`]: {
    marginLeft: '5px',
    color: theme.palette.error.main,
    fontWeight: 'bold',
  },
  [`& .${classes.statusSuccessfulIcon}`]: {
    marginLeft: '10px',
    color: theme.palette.success.main,
  },
  [`& .${classes.statusFailedIcon}`]: {
    marginLeft: '10px',
    color: theme.palette.error.main,
  },
  [`& .${classes.statusRunningIcon}`]: {
    marginLeft: '15px',
    color: theme.palette.text.primary,
  },
  [`& .${classes.statusUnknownIcon}`]: {
    marginLeft: '10px',
    color: theme.palette.warning.main,
  },
  [`& .${classes.clickableValidationStatusChip}`]: {
    marginLeft: '10px',
    height: '24px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  [`& .${classes.nonClickableValidationStatusChip}`]: {
    marginLeft: '10px',
    height: '24px',
  },
}));
