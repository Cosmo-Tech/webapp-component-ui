// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';
import { getByRole } from '@testing-library/react';

export class SliderTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
  }

  get Slider() {
    return getByDataCy(this._dataCy);
  }

  get SliderValue() {
    return document.querySelector('#slider-input input');
  }

  get SliderMarks() {
    return document.getElementsByClassName('MuiSlider-markLabel');
  }

  get SliderMarksValue() {
    return Array.from(document.getElementsByClassName('MuiSlider-markLabel')).map((mark) => mark.textContent);
  }

  get SliderTracker() {
    return getByRole(this.Slider, 'slider');
  }
}
