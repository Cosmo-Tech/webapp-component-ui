// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

const DIRTY_INPUT_FIELD_SX = {
  paddingLeft: '16px',
  borderLeft: (theme) => `${theme.palette.info.main} solid 3px`,
};
const PRISTINE_INPUT_FIELD_SX = {
  paddingLeft: '19px',
};

export const getCommonInputSxProps = (isDirty) => {
  if (isDirty == null) return {}; // Don't change style if isDirty is undefined
  return isDirty ? DIRTY_INPUT_FIELD_SX : PRISTINE_INPUT_FIELD_SX;
};
