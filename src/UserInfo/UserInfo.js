// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Auth } from '@cosmotech/core'
import { Box, Menu, MenuItem, withStyles } from '@material-ui/core'
import profilePlaceholder from '../../assets/profile_placeholder.png'

const useStyles = theme => ({
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
    marginLeft: '8px'
  },
  menu: {
    transform: 'translate3d(0,30px,0) !important'
  },
  docLink: {
    color: theme.palette.primary.contrastText
  }
})

const UserInfo = (props) => {
  const [id, setId] = useState('') // eslint-disable-line no-unused-vars
  const [name, setName] = useState('')
  const [picUrl, setPicUrl] = useState(profilePlaceholder)
  const [isMenuOpened, setIsMenuOpened] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  useEffect(() => {
    // Bind callback to update component on authentication data change
    Auth.onAuthStateChanged(authData => {
      if (authData) {
        setId(Auth.getUserId())
        setName(Auth.getUserName())
        setPicUrl(Auth.getUserPicUrl())
      }
    })
    // Get user data if authenticated
    if (Auth.getUserId() !== undefined) {
      setId(Auth.getUserId())
    }
    if (Auth.getUserName() !== undefined) {
      setName(Auth.getUserName())
    }
    if (Auth.getUserPicUrl() !== undefined) {
      setPicUrl(Auth.getUserPicUrl())
    }
  })

  const handleClick = (e) => {
    setAnchorEl(e.target)
    setIsMenuOpened(!isMenuOpened)
  }

  const { classes } = props
  return (
    <React.Fragment>
      <Box
        aria-controls="simple-menu"
        aria-haspopup="true"
        data-cy="user-profile-menu"
        onClick={handleClick}
        className={`${classes.menuTrigger} ${isMenuOpened ? 'active' : ''}`}
      >
        <img className={classes.profilePic} src={picUrl}/>
        <span className={classes.userName}>{name}</span>
      </Box>
      <Menu
        className={classes.menu}
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClick}
      >
        {
          props.documentationUrl
            ? <MenuItem data-cy="downloadDocumentation">
                <a href={props.documentationUrl}
                  className={classes.docLink}
                  target="_blank"
                  rel="noreferrer">Download documentation</a>
              </MenuItem>
            : null
        }
        <MenuItem data-cy="logout" onClick={() => {
          Auth.signOut()
        }}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

UserInfo.propTypes = {
  classes: PropTypes.any,
  documentationUrl: PropTypes.string
}

export default withStyles(useStyles)(UserInfo)
