// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { render } from '@testing-library/react';
import { MockTheme } from '../MuiComponentsTesting';

export const renderInMuiThemeProvider = (children) => {
  return render(<MockTheme>{children}</MockTheme>);
};
