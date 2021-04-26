// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/styles'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import microsoftLogo from '../../assets/microsoft_logo.png'

const useStyles = makeStyles(theme => ({
  root: {
    border: 0,
    background: '#2F2F2F',
    boxShadow: 'none',
    borderRadius: '0px',
    height: '41px',
    paddingRight: '12px',
    cursor: 'pointer'
  },
  logo: {
    height: '21px',
    width: '21px',
    marginLeft: '12px',
    marginRight: '12px'
  },
  signin: {
    fontSize: '15px',
    font: 'Sogoe UI Regular',
    weight: 600,
    color: '#FFFFFF'
  }
}))

const SignInButton = (props) => {
  const { t } = useTranslation()

  const classes = useStyles()

  return (
    <button className={classes.root} onClick={props.onClick} data-cy="sign-in-with-microsoft-button">
      <Grid
        container
        spacing={0}
        className={classes.mainGrid}
        direction="row"
        alignItems="center"
        justify="flex-start"
      >
        <Grid item>
          <Avatar
            className={classes.logo}
            variant="square"
            src={microsoftLogo}
          />
        </Grid>
        <Grid item zeroMinWidth>
          <Typography noWrap className={classes.signin}>
            {t('genericcomponent.button.login.msal.title', 'Sign in with Microsoft')}
          </Typography>
        </Grid>
      </Grid>
    </button>
  )
}

SignInButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default withStyles(useStyles)(SignInButton)
