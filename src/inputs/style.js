// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const getCommonInputStyles = (theme) => ({
  dirtyInput: {
    paddingLeft: '16px',
    borderLeft: `${theme.palette.info.main} solid 3px`,
  },
  notDirtyInput: {
    paddingLeft: '19px',
  },
});
