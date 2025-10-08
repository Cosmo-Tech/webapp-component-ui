// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight as ArrowRightIcon, Check as CheckIcon } from '@mui/icons-material';
import { Box, ClickAwayListener, IconButton, Menu, MenuItem } from '@mui/material';
import { DefaultAvatar, FadingTooltip } from '../../misc';

const DEFAULT_LABELS = {
  language: 'Change language',
  logOut: 'Log out',
};

export const UserInfo = (props) => {
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

  const { userName, profilePlaceholder, languages, onLogout, changeLanguage, language, labels: tmpLabels } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <Box data-cy="user-profile-menu" aria-controls="user-profile-button" aria-haspopup="true" onClick={handleClick}>
          <FadingTooltip key="user-name-tooltip" title={userName}>
            {profilePlaceholder ? (
              <img src={profilePlaceholder} />
            ) : (
              <IconButton aria-label="account" size="large">
                <DefaultAvatar userName={userName} />
              </IconButton>
            )}
          </FadingTooltip>
        </Box>

        <Menu
          sx={{ transform: 'translate3d(0,30px,0) !important' }}
          data-cy="main-menu"
          id="main-menu"
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={isMenuOpen}
          onClose={handleClick}
        >
          {languages && (
            <MenuItem
              data-cy="change-language"
              onClick={handleLanguageMenuClick}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              {labels.language}
              <ArrowRightIcon sx={{ marginLeft: '20px' }} />
            </MenuItem>
          )}
          <MenuItem data-cy="logout" onClick={onLogout}>
            {labels.logOut}
          </MenuItem>
        </Menu>
        {languages && (
          <Menu
            sx={{ transform: 'translate3d(0,30px,0) !important' }}
            id="languages-menu"
            keepMounted
            anchorEl={langAnchorEl}
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
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  {langLabel}
                  {
                    // Add a check mark for the currently selected language
                    langKey === language && <CheckIcon sx={{ marginLeft: '20px' }} />
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
