// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Menu, MenuItem, makeStyles } from '@material-ui/core';
import { ArrowRight as ArrowRightIcon, Check as CheckIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuTrigger: {
    backgroundRepeat: 'no-repeat',
    minWidth: '32px',
    height: '32px',
    backgroundSize: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'box-shadow ease-in-out 0.2s',
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  profilePic: {
    width: '32px',
    height: '32px',
  },
  userName: {
    fontSize: '16px',
    textAlign: 'center',
    lineHeight: '32px',
    height: '32px',
    marginLeft: '8px',
    color: theme.palette.text.primary,
  },
  menu: {
    transform: 'translate3d(0,30px,0) !important',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuIcon: {
    marginLeft: '20px',
  },
  docLink: {
    color: theme.palette.primary.contrastText,
  },
}));

export const UserInfo = (props) => {
  const classes = useStyles();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isLangMenuOpened, setLangIsMenuOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);

  const handleClick = (e) => {
    setAnchorEl(e.target);
    setIsMenuOpened(!isMenuOpened);
  };

  const handleLanguageMenuClick = (e) => {
    setLangAnchorEl(e.target);
    setLangIsMenuOpened(!isLangMenuOpened);
  };

  const setLanguage = (lang) => {
    setIsMenuOpened(false);
    setLangIsMenuOpened(false);
    changeLanguage(lang);
  };

  const { userName, profilePlaceholder, languages, documentationUrl, onLogout, changeLanguage, language, labels } =
    props;

  return (
    <React.Fragment>
      <Box
        data-cy="user-profile-menu"
        aria-controls="user-profile-button"
        aria-haspopup="true"
        onClick={handleClick}
        className={`${classes.menuTrigger} ${isMenuOpened ? 'active' : ''}`}
      >
        <img className={classes.profilePic} src={profilePlaceholder} />
        <span className={classes.userName}>{userName}</span>
      </Box>
      <Menu
        className={classes.menu}
        data-cy="main-menu"
        keepMounted
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClick}
      >
        {languages && (
          <MenuItem data-cy="change-language" onClick={handleLanguageMenuClick} className={classes.menuContainer}>
            {labels.language}
            <ArrowRightIcon className={classes.menuIcon} />
          </MenuItem>
        )}
        {documentationUrl && (
          <MenuItem data-cy="download-documentation">
            <a href={documentationUrl} className={classes.docLink} target="_blank" rel="noreferrer">
              {labels.documentation}
            </a>
          </MenuItem>
        )}
        <MenuItem data-cy="logout" onClick={onLogout}>
          {labels.logOut}
        </MenuItem>
      </Menu>
      {languages && (
        <Menu
          className={classes.menu}
          id="simple-menu"
          keepMounted
          anchorEl={langAnchorEl}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'center', horizontal: 'right' }}
          open={isLangMenuOpened}
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
    </React.Fragment>
  );
};

UserInfo.propTypes = {
  /**
   * Documentation url
   */
  documentationUrl: PropTypes.string,
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
      documentation: 'string',
      logOut: 'string'
    }
   *   </pre>
   */
  labels: PropTypes.shape({
    language: PropTypes.string.isRequired,
    documentation: PropTypes.string.isRequired,
    logOut: PropTypes.string.isRequired,
  }),
};

UserInfo.defaultProps = {
  profilePictureUrl: '../../assets/profile_placeholder.png',
  labels: {
    language: 'Change language',
    documentation: 'Download documentation',
    logOut: 'Log out',
  },
};
