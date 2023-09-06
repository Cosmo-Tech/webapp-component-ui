// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy, getById } from '../utils';
import { getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class TextFieldTesting {
  constructor({ dataCy, id }) {
    this._dataCy = dataCy;
    this._id = id;
  }

  get TextField() {
    return getByDataCy(this._dataCy);
  }

  get TextFieldInput() {
    return getById(this._id, this.TextField);
  }

  get TextFieldValue() {
    return getByRole(this.TextField, 'textbox');
  }

  async type(textInput) {
    await userEvent.type(this.TextFieldInput, textInput);
  }
}
