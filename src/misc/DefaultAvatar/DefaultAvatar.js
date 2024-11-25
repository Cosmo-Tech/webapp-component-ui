import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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

export const DefaultAvatar = ({ userName, size, variant }) => {
  const avatarBackgroundColor = stringToColor(userName);
  const letter = String.fromCodePoint(userName.codePointAt(0)).toUpperCase();

  const classes = useStyles({ avatarBackgroundColor, size });

  return (
    <Avatar className={classes.avatar} variant={variant}>
      {letter}
    </Avatar>
  );
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
  /**
   * Shape of the avatar.
   * See the Material UI documentation for the available variants : https://mui.com/material-ui/api/avatar/
   */
  variant: PropTypes.string,
};

DefaultAvatar.defaultProps = {
  size: 24,
  variant: 'circular',
};
