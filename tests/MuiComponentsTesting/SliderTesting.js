// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import { getByDataCy } from '../utils';
import { getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export class SliderTesting {
  constructor({ dataCy, user }) {
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

  get SliderTracker() {
    return getByRole(this.Slider, 'slider');
  }

  async moveSliderToTheRight(handlingFunction, sentValue) {
    await this.user.click(this.SliderTracker);
    await this.user.keyboard('[ArrowRight]');
    expect(handlingFunction).toBeCalled();
    expect(handlingFunction).toHaveBeenCalledWith(sentValue);
  }

  async moveSliderToTheLeft(handlingFunction, sentValue) {
    await this.user.click(this.SliderTracker);
    await this.user.keyboard('[ArrowLeft]');
    expect(handlingFunction).toBeCalled();
    expect(handlingFunction).toHaveBeenCalledWith(sentValue);
  }
}
