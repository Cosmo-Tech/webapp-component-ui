// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { render } from '@testing-library/react';
import React from 'react';
import { MockTheme } from '../MuiComponentsTesting';

export const renderInMuiThemeProvider = (children) => {
  return render(<MockTheme>{children}</MockTheme>);
};
