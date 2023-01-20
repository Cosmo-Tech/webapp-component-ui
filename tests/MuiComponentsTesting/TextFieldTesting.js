// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';
import { getByRole } from '@testing-library/react';

export class TextFieldTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get TextField() {
    return getByDataCy(this._dataCy);
  }

  get TextFieldValue() {
    return getByRole(this.TextField, 'textbox');
  }
}
