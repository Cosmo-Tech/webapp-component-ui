// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import '@testing-library/jest-dom';

export function toHaveDirtyInputClass(received) {
  if (this.isNot) {
    expect(received).not.toHaveAttribute('class', expect.stringContaining('dirtyInput'));
  } else {
    expect(received).toHaveAttribute('class', expect.stringContaining('dirtyInput'));
  }
  return { pass: !this.isNot };
}
