import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Menu, MenuItem, ClickAwayListener } from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import useStyles from './style';

export const HelpMenu = (props) => {
  const classes = useStyles();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setMenuOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.target);
    setMenuOpen(!isMenuOpen);
  };

  const { documentationUrl, supportUrl, labels } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Box
          data-cy="help-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={`${classes.menuTrigger} ${isMenuOpen ? 'active' : ''}`}
        >
          <HelpOutlineIcon className={classes.menuIcon} />
        </Box>
        <Menu className={classes.menu} keepMounted anchorEl={anchorEl} open={isMenuOpen} onClose={handleClick}>
          {documentationUrl && (
            <MenuItem data-cy="download-documentation" className={classes.link} onClick={handleClick}>
              <a href={documentationUrl} className={classes.link} target="_blank" rel="noreferrer">
                {labels.documentation}
              </a>
            </MenuItem>
          )}
          {supportUrl && (
            <MenuItem data-cy="support" className={classes.link} onClick={handleClick}>
              <a href={supportUrl} className={classes.link} target="_blank" rel="noreferrer">
                {labels.support}
              </a>
            </MenuItem>
          )}
        </Menu>
      </div>
    </ClickAwayListener>
  );
};

HelpMenu.propTypes = {
  /**
   * Documentation url
   */
  documentationUrl: PropTypes.string,
  /**
   * Support page url
   */
  supportUrl: PropTypes.string,
  /**
   * Component's labels:
   * Structure:
   * <pre>
   {
      documentation: 'string',
      suuport: 'string',
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    documentation: PropTypes.string.isRequired,
    support: PropTypes.string,
  }),
};

HelpMenu.defaultProps = {
  supportUrl: null,
  labels: {
    documentation: 'Documentation',
    support: 'Contact support',
  },
};
