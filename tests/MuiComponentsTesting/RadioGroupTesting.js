// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { queryAllByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getByDataCy } from '../utils';

export class RadioGroupTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get RadioGroup() {
    return getByDataCy(this._dataCy);
  }

  get Radios() {
    return queryAllByRole(this.RadioGroup, 'radio');
  }

  get CheckedRadio() {
    return this.Radios.find((radio) => radio.checked);
  }

  getRadio(value) {
    return this.Radios.find((radio) => radio.value === value);
  }

  async check(value) {
    const radioToSelect = this.getRadio(value);
    await userEvent.click(radioToSelect);
  }
}
