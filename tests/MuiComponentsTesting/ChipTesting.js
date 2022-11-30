// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';

export class ChipTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Chip() {
    return getByDataCy(this._dataCy);
  }

  get disabled() {
    return this.Chip.getAttribute('aria-disabled');
  }
}
