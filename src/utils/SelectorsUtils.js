// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export function getIdentifierFromUserEmail(userName) {
  return userName.replace(/[@.]/g, '');
}
