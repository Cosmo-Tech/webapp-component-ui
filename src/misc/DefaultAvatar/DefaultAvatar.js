import React from 'react';
import PropTypes from 'prop-types';
import { Avatar } from '@mui/material';

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

export const DefaultAvatar = ({ userName = '?', size = 24, variant = 'circular' }) => {
  const avatarBackgroundColor = stringToColor(userName);
  const letter = userName === '' ? '?' : String.fromCodePoint(userName.codePointAt(0)).toUpperCase();

  return (
    <Avatar
      variant={variant}
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: (theme) => theme.typography.pxToRem(size / 2),
        backgroundColor: avatarBackgroundColor,
        color: (theme) => theme.palette.getContrastText(avatarBackgroundColor),
      }}
    >
      {letter}
    </Avatar>
  );
};

DefaultAvatar.propTypes = {
  /**
   * User name to get first letter and compute avatar's color
   */
  userName: PropTypes.string,
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
