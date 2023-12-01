// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { getByRole, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByDataCy } from '../utils';

export class AutoCompleteTesting {
  constructor({ dataCy, dataCyList }) {
    this._dataCy = dataCy;
    this._dataCyList = dataCyList;
  }

  get Select() {
    return getByDataCy(this._dataCy);
  }

  get Input() {
    return getByRole(this.Select, 'combobox');
  }

  get List() {
    return getByDataCy(this._dataCyList);
  }

  async openList() {
    await userEvent.click(this.Input);
  }

  getOption(optionLabel) {
    return queryByText(this.List, optionLabel);
  }

  async selectOption(optionLabel) {
    const OptionToSelect = this.getOption(optionLabel);
    await userEvent.click(OptionToSelect);
  }
}
