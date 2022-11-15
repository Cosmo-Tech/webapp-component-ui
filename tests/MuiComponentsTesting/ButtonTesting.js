// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';
import userEvent from '@testing-library/user-event';

export class ButtonTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Button() {
    return getByDataCy(this._dataCy);
  }

  async click() {
    await userEvent.click(this.Button);
  }
}
