// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';
import userEvent from '@testing-library/user-event';

export class SliderTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
    this.user = userEvent.setup();
  }

  get Slider() {
    return getByDataCy(this._dataCy);
  }

  get SliderValue() {
    return document.querySelector('#slider-root input');
  }

  get SliderMarks() {
    return document.getElementsByClassName('MuiSlider-markLabel');
  }

  get SliderMarksValue() {
    return Array.from(document.getElementsByClassName('MuiSlider-markLabel')).map((mark) => mark.textContent);
  }
}
