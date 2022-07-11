// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Menu,
  MenuItem,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Link,
  makeStyles,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles((theme) => ({
  menuLink: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export const HelpMenu = (props) => {
  const classes = useStyles();

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAboutDialog, setShowAboutDialog] = useState(false);

  const handleClose = () => {
    setMenuOpen(false);
    setShowAboutDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.target);
    setMenuOpen(!isMenuOpen);
  };

  const { documentationUrl, supportUrl, about, labels } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Box data-cy="help-menu" aria-haspopup="true" onClick={handleClick}>
          <IconButton aria-label="help" color="inherit">
            <HelpOutlineIcon />
          </IconButton>
        </Box>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleClick}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {documentationUrl && (
            <MenuItem data-cy="documentation-link" onClick={handleClick}>
              <Link href={documentationUrl} target="_blank" rel="noreferrer" color="inherit" underline="none">
                {labels.documentation}
              </Link>
            </MenuItem>
          )}
          {supportUrl && (
            <MenuItem data-cy="support-link" onClick={handleClick}>
              <Link href={supportUrl} target="_blank" rel="noreferrer" color="inherit" underline="none">
                {labels.support}
              </Link>
            </MenuItem>
          )}
          {about && (
            <MenuItem data-cy="about-button" onClick={() => setShowAboutDialog(true)}>
              {labels.aboutTitle}
            </MenuItem>
          )}
        </Menu>
        {about && (
          <Dialog data-cy="about-dialog" open={showAboutDialog} onClose={handleClose}>
            {about}
          </Dialog>
        )}
      </div>
    </ClickAwayListener>
  );
};

HelpMenu.propTypes = {
  /**
   * Documentation url
   */
  documentationUrl: PropTypes.string.isRequired,
  /**
   * Support page url
   */
  supportUrl: PropTypes.string.isRequired,
  /**
   * About component
   */
  about: PropTypes.element,
  /**
   * Component's labels:
   * Structure:
   * <pre>
   {
      documentation: 'string',
      suuport: 'string',
      aboutTitle: 'string',
      close: 'string',
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    documentation: PropTypes.string,
    support: PropTypes.string,
    aboutTitle: PropTypes.string,
    close: PropTypes.string,
  }),
};

HelpMenu.defaultProps = {
  labels: {
    documentation: 'Documentation',
    support: 'Contact support',
    aboutTitle: 'About',
    close: 'Close',
  },
  about: null,
};
