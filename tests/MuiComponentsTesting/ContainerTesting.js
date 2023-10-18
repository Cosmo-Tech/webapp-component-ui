// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import userEvent from '@testing-library/user-event';
import { getByDataCy } from '../utils';

export class ContainerTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Container() {
    return getByDataCy(this._dataCy);
  }

  async hover() {
    await userEvent.hover(this.Container);
  }
}
