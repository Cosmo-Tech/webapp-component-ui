import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';
import withStyles from '@mui/styles/withStyles';

const Tooltip = ({ children, title, useSpan, spanProps, ...other }) => {
  return title ? (
    <MuiTooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={title} {...other}>
      {
        // div to prevent warning from triggering when button is disabled (see
        // https://mui.com/material-ui/react-tooltip/#disabled-elements for more details)
      }

      {useSpan ? <span {...spanProps}>{children}</span> : <div>{children}</div>}
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
  /**
   * Boolean value, if set to true, children component will be wrapped in span tag
   */
  useSpan: PropTypes.bool,
  /**
   * Props to be applied to span element if useSpan is set to true
   */
  spanProps: PropTypes.object,
};

Tooltip.defaultProps = {
  useSpan: false,
  spanProps: {},
};

export const FadingTooltip = withStyles((theme) => ({
  tooltip: {
    whiteSpace: 'pre-wrap',
    maxWidth: '600px',
  },
}))(Tooltip);
