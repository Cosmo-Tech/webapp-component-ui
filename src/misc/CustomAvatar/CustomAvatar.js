import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
} from '@material-ui/core/colors/';

const COLORS = [
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
];

function getHash(s) {
  if (s === undefined || s === null || s.length === 0) return 0;
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < s.length; ++i) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

const getColorFromInt = (h) => {
  const hash = (h + 64) % 128;

  const col = hash % 16;
  const colorName = COLORS[col];

  const row = (hash - col) / 16;
  return colorName[(row + 1) * 100];
};

const useStyles = makeStyles((theme) => ({
  avatar: {
    borderRadius: '50%',
    width: '24px',
    backgroundColor: (props) => props.avatarBackgroundColor,
    color: (props) => theme.palette.getContrastText(props.avatarBackgroundColor),
  },
}));

export const CustomAvatar = (props) => {
  const { userName } = props;

  const avatarBackgroundColor = getColorFromInt(getHash(userName));
  const userLetter = userName.charAt(0).toUpperCase();

  const classes = useStyles({ avatarBackgroundColor });

  return (
    <Box component="span" display="flex" justifyContent="center" className={classes.avatar}>
      <Typography>{userLetter}</Typography>
    </Box>
  );
};

CustomAvatar.propTypes = {
  /**
   * User name to get first letter and compute avatar's color
   */
  userName: PropTypes.string.isRequired,
};
