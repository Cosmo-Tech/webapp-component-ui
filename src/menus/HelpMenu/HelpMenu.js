// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import useStyles from './style';
import { FadingTooltip } from '../../misc';

export const HelpMenu = (props) => {
  const classes = useStyles();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAboutDialog, setShowAboutDialog] = useState(false);
  const [showTechnicalInfoDialog, setShowTechnicalInfoDialog] = useState(false);

  const handleClose = () => {
    setMenuOpen(false);
    setShowAboutDialog(false);
    setShowTechnicalInfoDialog(false);
  };

  const handleCloseAboutDialog = () => {
    setMenuOpen(false);
    setShowAboutDialog(false);
  };

  const handleCloseTechnicalInfoDialog = () => {
    setMenuOpen(false);
    setShowTechnicalInfoDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.target);
    setMenuOpen(!isMenuOpen);
  };

  const { documentationUrl, supportUrl, about, technicalInfo, labels } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Box
          data-cy="help-menu"
          aria-haspopup="true"
          onClick={handleClick}
          className={`${classes.menuTrigger} ${isMenuOpen ? 'active' : ''}`}
        >
          <FadingTooltip title={labels.title}>
            <IconButton aria-label="help" color="inherit" size="large">
              <HelpOutlineIcon />
            </IconButton>
          </FadingTooltip>
        </Box>
        <Menu
          className={classes.menu}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          keepMounted
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleClick}
        >
          {documentationUrl && (
            <MenuItem data-cy="documentation-link" className={classes.link} onClick={handleClick}>
              <a href={documentationUrl} className={classes.link} target="_blank" rel="noreferrer">
                {labels.documentation}
              </a>
            </MenuItem>
          )}
          {supportUrl && (
            <MenuItem data-cy="support-link" className={classes.link} onClick={handleClick}>
              <a href={supportUrl} className={classes.link} target="_blank" rel="noreferrer">
                {labels.support}
              </a>
            </MenuItem>
          )}
          {technicalInfo && (
            <MenuItem data-cy="technical-info-button" onClick={() => setShowTechnicalInfoDialog(true)}>
              {labels.technicalInfoTitle}
            </MenuItem>
          )}
          {about && (
            <MenuItem data-cy="about-button" onClick={() => setShowAboutDialog(true)}>
              {labels.aboutTitle}
            </MenuItem>
          )}
        </Menu>
        {about && (
          <Dialog data-cy="about-dialog" open={showAboutDialog} onClose={handleCloseAboutDialog}>
            <DialogTitle>{labels.aboutTitle}</DialogTitle>
            <DialogContent>{about}</DialogContent>
            <DialogActions>
              <Button
                data-cy="about-dialog-close-button"
                autoFocus
                color="primary"
                onClick={() => {
                  handleCloseAboutDialog();
                }}
              >
                {labels.close}
              </Button>
            </DialogActions>
          </Dialog>
        )}
        {technicalInfo && (
          <Dialog
            data-cy="technical-info-dialog"
            open={showTechnicalInfoDialog}
            onClose={handleCloseTechnicalInfoDialog}
          >
            <DialogTitle>{labels.technicalInfoTitle}</DialogTitle>
            <DialogContent sx={{ minWidth: '500px' }}>{technicalInfo}</DialogContent>
            <DialogActions>
              <Button
                data-cy="technical-info-dialog-close-button"
                autoFocus
                color="primary"
                onClick={() => {
                  handleCloseTechnicalInfoDialog();
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
   * Technical information component
   */
  technicalInfo: PropTypes.element,
  /**
   * Component's labels:
   * Structure:
   * <pre>
   {
      documentation: 'string',
      support: 'string',
      aboutTitle: 'string',
      close: 'string',
      title: 'string',
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    documentation: PropTypes.string,
    support: PropTypes.string,
    aboutTitle: PropTypes.string,
    technicalInfoTitle: PropTypes.string,
    close: PropTypes.string,
    title: PropTypes.string,
  }),
};

HelpMenu.defaultProps = {
  labels: {
    documentation: 'Documentation',
    support: 'Contact support',
    aboutTitle: 'About',
    technicalInfoTitle: 'Technical information',
    close: 'Close',
    title: 'Help',
  },
  about: null,
};
