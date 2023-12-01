// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import '@testing-library/jest-dom';
import { toHaveDirtyInputClass } from './tests/extensions';

expect.extend({
  toHaveDirtyInputClass,
});
