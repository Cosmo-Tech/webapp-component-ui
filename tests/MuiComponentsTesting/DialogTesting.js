// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export class DialogTesting {
  constructor({ labelledby }) {
    this._labelledby = labelledby;
  }

  get Dialog() {
    return document.querySelector(`[aria-labelledby="${this._labelledby}"]`);
  }

  get DialogRoot() {
    return this.Dialog.parentNode.parentNode;
  }

  get Backdrop() {
    return this.DialogRoot.querySelector('.MuiModal-backdrop');
  }
}
