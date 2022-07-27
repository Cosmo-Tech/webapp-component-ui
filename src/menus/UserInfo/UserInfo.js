// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Menu, MenuItem, ClickAwayListener, IconButton, Tooltip } from '@material-ui/core';
import {
  ArrowRight as ArrowRightIcon,
  AccountCircle as AccountCircleIcon,
  Check as CheckIcon,
} from '@material-ui/icons';

import useStyles from './style';

export const UserInfo = (props) => {
  const classes = useStyles();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setLanguangeMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const handleClose = () => {
    setMenuOpen(false);
    setLanguangeMenuOpen(false);
  };

  const handleClick = (e) => {
    setAnchorEl(e.target);
    setMenuOpen(!isMenuOpen);
  };

  const handleLanguageMenuClick = (e) => {
    setLangAnchorEl(e.target);
    setLanguangeMenuOpen(!isLanguageMenuOpen);
  };

  const setLanguage = (lang) => {
    changeLanguage(lang);
    handleClose();
  };

  const { userName, profilePlaceholder, languages, onLogout, changeLanguage, language, labels } = props;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Box
          data-cy="user-profile-menu"
          aria-controls="user-profile-button"
          aria-haspopup="true"
          onClick={handleClick}
          className={`${classes.menuTrigger} ${isMenuOpen ? 'active' : ''}`}
        >
          <Tooltip key="user-name-tooltip" title={userName}>
            {profilePlaceholder ? (
              <img src={profilePlaceholder} />
            ) : (
              <IconButton aria-label="account" color="inherit">
                <AccountCircleIcon />
              </IconButton>
            )}
          </Tooltip>
        </Box>

        <Menu
          className={classes.menu}
          data-cy="main-menu"
          id="main-menu"
          keepMounted
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleClick}
        >
          {languages && (
            <MenuItem data-cy="change-language" onClick={handleLanguageMenuClick} className={classes.menuContainer}>
              {labels.language}
              <ArrowRightIcon className={classes.menuIcon} />
            </MenuItem>
          )}
          <MenuItem data-cy="logout" onClick={onLogout}>
            {labels.logOut}
          </MenuItem>
        </Menu>
        {languages && (
          <Menu
            className={classes.menu}
            id="languages-menu"
            keepMounted
            anchorEl={langAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            open={isLanguageMenuOpen}
            onClose={handleLanguageMenuClick}
          >
            {
              // Language menu items
              Object.entries(languages).map(([langKey, langLabel]) => (
                <MenuItem
                  data-cy={'set-lang-' + langKey}
                  key={langKey}
                  onClick={() => setLanguage(langKey)}
                  className={classes.menuContainer}
                >
                  {langLabel}
                  {
                    // Add a check mark for the currently selected language
                    langKey === language && <CheckIcon className={classes.menuIcon} />
                  }
                </MenuItem>
              ))
            }
          </Menu>
        )}
      </div>
    </ClickAwayListener>
  );
};

UserInfo.propTypes = {
  /**
   * List of available languages
   */
  languages: PropTypes.objectOf(PropTypes.string),
  /**
   * User's profile picture
   */
  profilePlaceholder: PropTypes.string,
  /**
   * User name
   */
  userName: PropTypes.string.isRequired,
  /**
   * Function bound on log out item's menu
   */
  onLogout: PropTypes.func.isRequired,
  /**
   * Function bound on change language item's menu
   */
  changeLanguage: PropTypes.func.isRequired,
  /**
   * Current language
   */
  language: PropTypes.string.isRequired,
  /**
   * Component's labels:
   * Structure:
   * <pre>
   {
      language: 'string',
      logOut: 'string'
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    language: PropTypes.string.isRequired,
    logOut: PropTypes.string.isRequired,
  }),
};

UserInfo.defaultProps = {
  labels: {
    language: 'Change language',
    logOut: 'Log out',
  },
};
