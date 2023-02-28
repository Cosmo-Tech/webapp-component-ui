import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const Tooltip = ({ children, title, ...other }) => {
  return title ? (
    <MuiTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={title} {...other}>
      {
        // div to prevent warning from triggering when button is disabled (see
        // https://mui.com/material-ui/react-tooltip/#disabled-elements for more details)
      }
      <div>{children}</div>
    </MuiTooltip>
  ) : (
    children
  );
};

Tooltip.propTypes = {
  /**
   * Elements that trigger the tooltip when hovered
   */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  /**
   * Tooltip text
   */
  title: PropTypes.string,
};

export const FadingTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
    maxWidth: '600px',
  },
}))(Tooltip);
