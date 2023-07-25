// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';

export class ContainerTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Container() {
    return getByDataCy(this._dataCy);
  }
}
