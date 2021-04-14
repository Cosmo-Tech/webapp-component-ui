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
    width: '32px',
    height: '32px',
    backgroundSize: '32px',
    borderRadius: '50%',
    flexShrink: 0,
    transition: 'box-shadow ease-in-out 0.2s',
    '&:hover': {
      cursor: 'pointer'
    },
    '&.active': {
      boxShadow: 'inset 0 0 0 1.5px orange'
    }
  },
  profilePic: {
    width: '32px',
    height: '32px'
  },
  menu: {
    transform: 'translate3d(0,30px,0) !important'
  },
  menuHead: {
    borderBottom: '1px solid #313030'
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
      </Box>
      <Menu
        className={classes.menu}
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        open={isMenuOpened}
        onClose={handleClick}
      >
        <MenuItem className={classes.menuHead} disabled>{name}</MenuItem>
        <MenuItem data-cy="logout" onClick={() => {
          Auth.signOut()
        }}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  )
}

UserInfo.propTypes = {
  classes: PropTypes.any
}

export default withStyles(useStyles)(UserInfo)
