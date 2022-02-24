// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Link,
  Menu,
  MenuItem,
  ClickAwayListener,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
} from '@material-ui/core';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import useStyles from './style';

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
              <Link href={documentationUrl} className={classes.link} target="_blank" rel="noreferrer">
                {labels.documentation}
              </Link>
            </MenuItem>
          )}
          {supportUrl && (
            <MenuItem data-cy="support" className={classes.link} onClick={handleClick}>
              <Link href={supportUrl} className={classes.link} target="_blank" rel="noreferrer">
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
            <DialogTitle>{labels.aboutTitle}</DialogTitle>
            <DialogContent>{about}</DialogContent>
            <DialogActions>
              <Button
                data-cy="about-dialog-close-button"
                autoFocus
                color="primary"
                onClick={() => {
                  handleClose();
                }}
              >
                {labels.close}
              </Button>
            </DialogActions>
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
