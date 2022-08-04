import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, makeStyles } from '@material-ui/core';

function stringToColor(str) {
  let hash = 0;

  for (let i = 0; i < str.length; ++i) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';
  for (let i = 0; i < 3; ++i) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: (props) => `${props.size}px`,
    height: (props) => `${props.size}px`,
    fontSize: (props) => theme.typography.pxToRem(props.size / 2),
    backgroundColor: (props) => props.avatarBackgroundColor,
    color: (props) => theme.palette.getContrastText(props.avatarBackgroundColor),
  },
}));

export const DefaultAvatar = ({ userName, size }) => {
  const avatarBackgroundColor = stringToColor(userName);
  const letter = userName.charAt(0).toUpperCase();

  const classes = useStyles({ avatarBackgroundColor, size });

  return <Avatar className={classes.avatar}>{letter}</Avatar>;
};

DefaultAvatar.propTypes = {
  /**
   * User name to get first letter and compute avatar's color
   */
  userName: PropTypes.string.isRequired,
  /**
   * Icon size in pixels
   */
  size: PropTypes.number,
};

DefaultAvatar.defaultProps = {
  size: 24,
};
