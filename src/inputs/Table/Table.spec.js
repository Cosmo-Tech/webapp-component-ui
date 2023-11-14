/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { ContainerTesting } from '../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../tests/utils';
import { Table } from './Table';

const mockOnClearErrors = jest.fn();
const tableInputContainer = new ContainerTesting({ dataCy: 'table-input' });
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
    expect(tableInputContainer.Container).toBeInTheDocument();
    expect(tableInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(tableInputContainer.Container).toHaveDirtyInputClass();
  });
});
