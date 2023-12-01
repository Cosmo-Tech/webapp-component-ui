// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import userEvent from '@testing-library/user-event';
import { getByDataCy } from '../utils';

export class SliderTesting {
  constructor({ dataCy }) {
    this._dataCy = dataCy;
    this.user = userEvent.setup();
  }

  get Slider() {
    return getByDataCy(this._dataCy);
  }

  get SliderValue() {
    return this.Slider.querySelector('input');
  }

  get SliderMarks() {
    return document.getElementsByClassName('MuiSlider-markLabel');
  }

  get SliderMarksValue() {
    return Array.from(document.getElementsByClassName('MuiSlider-markLabel')).map((mark) => mark.textContent);
  }
}
