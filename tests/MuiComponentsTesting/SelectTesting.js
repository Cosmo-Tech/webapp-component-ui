// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import { getByRole, queryByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getByDataCy } from '../utils';

export class SelectTesting {
  constructor({ dataCy, dataCyMenu }) {
    this._dataCy = dataCy;
    this._dataCyMenu = dataCyMenu;
  }

  get Select() {
    return getByDataCy(this._dataCy);
  }

  get Button() {
    return getByRole(this.Select, 'combobox');
  }

  get Menu() {
    return getByDataCy(this._dataCyMenu);
  }

  get text() {
    return this.Button.textContent;
  }

  get disabled() {
    return this.Button.getAttribute('aria-disabled');
  }

  async openMenu() {
    await userEvent.click(this.Button);
  }

  getMenuItem(menuItemLabel) {
    return queryByText(this.Menu, menuItemLabel);
  }

  getMenuChild(dataCyChild) {
    return getByDataCy(dataCyChild, this.Menu);
  }

  async selectMenuItem(menuItemLabel) {
    const MenuItemToSelect = this.getMenuItem(menuItemLabel);
    await userEvent.click(MenuItemToSelect);
  }
}
