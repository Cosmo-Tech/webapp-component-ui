// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { TableToolbar } from './TableToolbar';
import { renderInMuiThemeProvider } from '../../../../../tests/utils';
import { StackContainerTesting } from '../../../../../tests/MuiComponentsTesting';

const tableToolbarInputContainer = new StackContainerTesting({ dataCy: 'table-toolbar' });
const FullscreenButtonContainer = new StackContainerTesting({ dataCy: 'grid-fullscreen-button' });
const ImportButtonContainer = new StackContainerTesting({ dataCy: 'import-file-button' });
const ExportButtonContainer = new StackContainerTesting({ dataCy: 'export-button' });
const AddRowButtonContainer = new StackContainerTesting({ dataCy: 'add-row-button' });
const DeleteRowButtonContainer = new StackContainerTesting({ dataCy: 'delete-rows-button' });

const defaultProps = {
  isFullscreen: false,
  toggleFullscreen: () => {},
  isReady: false,
  editMode: true,
};
const setUp = (props) => {
  renderInMuiThemeProvider(<TableToolbar {...props} />);
};

describe('Check if TableToolbar buttons is displayed or not', () => {
  test('Check if tableToolbar is displayed with default data', () => {
    setUp(defaultProps);
    expect(tableToolbarInputContainer.Stack).toBeInTheDocument();
  });
  test('Check if open fullscreen button is displayed with default values', () => {
    setUp(defaultProps);
    expect(FullscreenButtonContainer.Stack).toBeInTheDocument();
  });

  describe('Check if ImportButton is displayed or not', () => {
    test('Check if ImportButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(ImportButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if ImportButton is not displayed with just editMode=false', () => {
      setUp({ ...defaultProps, editMode: false });
      expect(ImportButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if ImportButton is disabled with onImport function and default value', () => {
      setUp({ ...defaultProps, onImport: () => {} });
      expect(ImportButtonContainer.Stack).toBeInTheDocument();
      expect(ImportButtonContainer.Stack).not.toHaveAttribute('aria-disabled');
    });
    test('Check if ImportButton is disabled with editMode=false and onImport function', () => {
      setUp({ ...defaultProps, editMode: false, onImport: () => {} });
      expect(ImportButtonContainer.Stack).toHaveAttribute('aria-disabled');
    });
  });

  describe('Check if ExportButton is displayed or not', () => {
    test('Check if ExportButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(ExportButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if ExportButton is displayed with onExport function and default value', () => {
      setUp({ ...defaultProps, onExport: () => {} });
      expect(ExportButtonContainer.Stack).toBeInTheDocument();
      expect(ExportButtonContainer.Stack);
    });
  });

  describe('Check if AddRowButton is displayed or not', () => {
    test('Check if AddRowButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(AddRowButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if AddRowButton is not displayed with onAddRow function and default value', () => {
      setUp({ ...defaultProps, onAddRow: () => {} });
      expect(AddRowButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if AddRowButton is not displayed with enableAddRow=true and default value', () => {
      setUp({ ...defaultProps, enableAddRow: true });
      expect(AddRowButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if AddRowButton is displayed with onAddRow function, enableAddRow=true and default value', () => {
      setUp({ ...defaultProps, onAddRow: () => {}, enableAddRow: true });
      expect(AddRowButtonContainer.Stack).toBeInTheDocument();
    });
    test('Check if AddRowButton is disabled with onAddRow function, enableAddRow editMode=false', () => {
      setUp({ ...defaultProps, onAddRow: () => {}, enableAddRow: true, editMode: false });
      expect(AddRowButtonContainer.Stack).toBeInTheDocument();
      expect(AddRowButtonContainer.Stack).toHaveAttribute('aria-disabled');
    });
  });

  describe('Check if DeleteRowButton is displayed or not', () => {
    test('Check if DeleteRowButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(DeleteRowButtonContainer.Stack).not.toBeInTheDocument();
    });
    test('Check if DeleteRowButton is disabled with onDeleteRow function and default value', () => {
      setUp({ ...defaultProps, onDeleteRow: () => {} });
      expect(DeleteRowButtonContainer.Stack).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Stack).toHaveAttribute('aria-disabled');
    });
    test('Check if DeleteRowButton is disabled with onDeleteRow function, enableAddRow editMode=false', () => {
      setUp({ ...defaultProps, onDeleteRow: () => {}, editMode: false });
      expect(DeleteRowButtonContainer.Stack).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Stack).toHaveAttribute('aria-disabled');
    });
    test('Check if DeleteRowButton is disabled with onDeleteRow function, enableAddRow isReady=true', () => {
      setUp({ ...defaultProps, onDeleteRow: () => {}, isReady: true });
      expect(DeleteRowButtonContainer.Stack).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Stack).not.toHaveAttribute('aria-disabled');
    });
  });
});
