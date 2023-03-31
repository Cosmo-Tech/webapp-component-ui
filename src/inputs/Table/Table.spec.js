/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { Table } from './Table';
import { renderInMuiThemeProvider } from '../../../tests/utils';
import { StackContainerTesting } from '../../../tests/MuiComponentsTesting';

const mockOnClearErrors = jest.fn();
const tableInputContainer = new StackContainerTesting({ dataCy: 'table-input' });
const defaultProps = {
  editMode: true,
  columns: [
    { field: 'a', type: ['string'] },
    { field: 'b', type: ['int'] },
    { field: 'c', type: ['bool'] },
  ],
  rows: [
    { a: 'foo', b: '12', c: 'false' },
    { a: 'bar', b: '53', c: 'true' },
  ],
  onClearErrors: mockOnClearErrors,
};

const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const setUp = (props) => {
  renderInMuiThemeProvider(<Table {...props} />);
};

describe('Checks table input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(tableInputContainer.Stack).toBeInTheDocument();
    expect(tableInputContainer.Stack).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(tableInputContainer.Stack).toHaveDirtyInputClass();
  });
});
