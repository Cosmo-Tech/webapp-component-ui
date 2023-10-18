// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { queryByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByDataCy } from '../utils';

export class ChipTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Chip() {
    return getByDataCy(this._dataCy);
  }

  get CancelIcon() {
    return queryByTestId(this.Chip, 'CancelIcon');
  }

  get disabled() {
    return this.Chip.classList.contains('Mui-disabled');
  }

  async cancel() {
    await userEvent.click(this.CancelIcon);
  }
}
