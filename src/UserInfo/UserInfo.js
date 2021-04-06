import React from 'react'
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

class UserInfo extends React.Component {
  constructor (props) {
    super(props)
    this._isMounted = false
    this.state = {
      id: '',
      name: '',
      picUrl: profilePlaceholder,
      isMenuOpened: false,
      anchorEl: null
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this._isMounted = true
    // Bind callback to update component on authentication data change
    Auth.onAuthStateChanged(authData => {
      if (authData && this._isMounted) {
        this.setState({
          id: Auth.getUserId(),
          name: Auth.getUserName(),
          picUrl: Auth.getUserPicUrl()
        })
      }
    })
    // Get user data if authenticated
    const id = Auth.getUserId()
    const name = Auth.getUserName()
    const picUrl = Auth.getUserPicUrl()
    const newState = {}
    if (id !== undefined) {
      newState.id = id
    }
    if (name !== undefined) {
      newState.name = name
    }
    if (picUrl !== undefined) {
      newState.picUrl = picUrl
    }
    this.setState(newState)
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  handleClick (e) {
    this.setState({ anchorEl: e.target })
    this.setState({ isMenuOpened: !this.state.isMenuOpened })
  }

  render () {
    const { classes } = this.props
    return (
      <React.Fragment>
        <Box
          aria-controls="simple-menu"
          aria-haspopup="true"
          data-cy="user-profile-menu"
          onClick={this.handleClick}
          className={`${classes.menuTrigger} ${this.state.isMenuOpened ? 'active' : ''}`}
        >
          <img className={classes.profilePic} src={this.state.picUrl}/>
        </Box>
        <Menu
          className={classes.menu}
          id="simple-menu"
          keepMounted
          anchorEl={this.state.anchorEl}
          open={this.state.isMenuOpened}
          onClose={this.handleClick}
        >
          <MenuItem className={classes.menuHead} disabled>{this.state.name}</MenuItem>
          <MenuItem data-cy="logout" onClick={() => {
            Auth.signOut()
          }}>Logout</MenuItem>
        </Menu>
      </React.Fragment>
    )
  }
}

UserInfo.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.any,
  'classes.menuTrigger': PropTypes.any,
  'classes.menu': PropTypes.any,
  'classes.menuHead': PropTypes.any
}

export default withStyles(useStyles)(UserInfo)
