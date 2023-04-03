// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';

export class StackContainerTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Stack() {
    return getByDataCy(this._dataCy);
  }
}
