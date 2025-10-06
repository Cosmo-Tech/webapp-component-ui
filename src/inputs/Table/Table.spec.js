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

const setUp = (props) => {
  renderInMuiThemeProvider(<Table {...props} />);
};

describe('Checks table input in edit mode', () => {
  test('Component is displayed', () => {
    setUp(defaultProps);
    expect(tableInputContainer.Container).toBeInTheDocument();
  });
});
