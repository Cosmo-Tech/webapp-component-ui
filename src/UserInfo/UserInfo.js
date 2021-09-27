// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Menu, MenuItem, makeStyles } from '@material-ui/core';
import {
  ArrowRight as ArrowRightIcon,
  Check as CheckIcon
} from '@material-ui/icons';
import profilePlaceholder from '../../assets/profile_placeholder.png';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  menuTrigger: {
    backgroundRepeat: 'no-repeat',
    minWidth: '32px',
    height: '32px',
    backgroundSize: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'box-shadow ease-in-out 0.2s',
    '&:hover': {
      cursor: 'pointer'
    },
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  profilePic: {
    width: '32px',
    height: '32px'
  },
  userName: {
    textAlign: 'center',
    lineHeight: '32px',
    height: '32px',
    marginLeft: '8px',
    color: theme.palette.text.primary
  },
  menu: {
    transform: 'translate3d(0,30px,0) !important'
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  menuIcon: {
    marginLeft: '20px'
  },
  docLink: {
    color: theme.palette.primary.contrastText
  }
}));

const UserInfo = (props) => {
  const classes = useStyles();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isLangMenuOpened, setLangIsMenuOpened] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const { t, i18n } = useTranslation();

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
    i18n.changeLanguage(lang);
  };

  const { userName, profilePictureUrl, languages, documentationUrl, onLogout } = props;

  const userProfilePictureUrl = profilePictureUrl || profilePlaceholder;

  return (
    <React.Fragment>
      <Box
        data-cy="user-profile-menu"
        aria-controls="user-profile-button"
        aria-haspopup="true"
        onClick={handleClick}
        className={`${classes.menuTrigger} ${isMenuOpened ? 'active' : ''}`}>
        <img className={classes.profilePic} src={userProfilePictureUrl}/>
        <span className={classes.userName}>{userName}</span>
      </Box>
      <Menu
        className={classes.menu}
        data-cy="main-menu"
        keepMounted
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClick}>
        {
          languages &&
            (<MenuItem data-cy="change-language"
              onClick={handleLanguageMenuClick}
              className={classes.menuContainer}>
              { t('genericcomponent.userinfo.button.change.language', 'Change language') }
              <ArrowRightIcon className={classes.menuIcon}/>
            </MenuItem>)
        }
        {
          documentationUrl &&
           (<MenuItem data-cy="download-documentation">
              <a href={documentationUrl}
                className={classes.docLink}
                target="_blank"
                rel="noreferrer">
                  {t('genericcomponent.userinfo.button.download.documentation', 'Download documentation')}
              </a>
            </MenuItem>)
        }
        <MenuItem data-cy="logout" onClick={onLogout} >
          { t('genericcomponent.userinfo.button.logout', 'Log out') }
        </MenuItem>
      </Menu>
      {
        languages &&
          (<Menu
            className={classes.menu}
            id="simple-menu"
            keepMounted
            anchorEl={langAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'center', horizontal: 'right' }}
            open={isLangMenuOpened}
            onClose={handleLanguageMenuClick}>
            {
              // Language menu items
              Object.entries(languages).map(([langKey, langLabel]) =>
                <MenuItem
                  data-cy={ 'set-lang-' + langKey }
                  key={langKey}
                  onClick={ () => setLanguage(langKey) }
                  className={classes.menuContainer}>
                  {langLabel}
                  {
                    // Add a check mark for the currently selected language
                    langKey === i18n.language &&
                    (<CheckIcon className={classes.menuIcon}/>)
                  }
                </MenuItem>
              )
            }
          </Menu>)
      }
    </React.Fragment>
  );
};

UserInfo.propTypes = {
  documentationUrl: PropTypes.string,
  languages: PropTypes.objectOf(PropTypes.string),
  profilePictureUrl: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default UserInfo;
