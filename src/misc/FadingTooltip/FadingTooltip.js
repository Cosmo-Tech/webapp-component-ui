import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const Tooltip = ({ children, ...other }) => {
  return (
    <MuiTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} {...other}>
      {
        // div to prevent warning from triggering when button is disabled
        // see https://mui.com/material-ui/react-tooltip/#disabled-elements
      }
      <div>{children}</div>
    </MuiTooltip>
  );
};

Tooltip.propTypes = {
  /**
   * Elements that trigger the tooltip when hovered
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export const FadingTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
    maxWidth: '600px',
  },
}))(Tooltip);
