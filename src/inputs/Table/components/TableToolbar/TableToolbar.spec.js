// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { ButtonTesting } from '../../../../../tests/MuiComponentsTesting';
import { renderInMuiThemeProvider } from '../../../../../tests/utils';
import { TableToolbar } from './TableToolbar';

const FullscreenButtonContainer = new ButtonTesting({ dataCy: 'grid-fullscreen-button' });
const ImportButtonContainer = new ButtonTesting({ dataCy: 'import-file-button' });
const ExportButtonContainer = new ButtonTesting({ dataCy: 'export-button' });
const AddRowButtonContainer = new ButtonTesting({ dataCy: 'add-row-button' });
const DeleteRowButtonContainer = new ButtonTesting({ dataCy: 'delete-rows-button' });

const defaultProps = {
  isFullscreen: false,
  toggleFullscreen: jest.fn(),
  isReady: false,
  editMode: true,
  isLoading: false,
  labels: {
    loading: 'Loading...',
    import: 'Import',
    export: 'Export',
    addRow: 'Add a new row',
    deleteRows: 'Remove selected rows',
    deleteRowsDialog: {
      title: 'Delete selected lines?',
      getBody: () => 'Are you sure you want to delete these lines?',
      cancel: 'Cancel',
      confirm: 'Delete',
      checkbox: "Don't show this message again",
    },
    fullscreen: 'fullscreen',
  },
};
const setUp = (props) => {
  renderInMuiThemeProvider(<TableToolbar {...props} />);
};

describe('Check if TableToolbar buttons are displayed or not', () => {
  test('Check if open fullscreen button is displayed with default values', () => {
    setUp(defaultProps);
    expect(FullscreenButtonContainer.Button).toBeInTheDocument();
  });

  describe('Check if ImportButton is displayed or not', () => {
    test('Check if ImportButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(ImportButtonContainer.Button).not.toBeInTheDocument();
    });
    test('Check if ImportButton is not displayed with just editMode=false', () => {
      setUp({ ...defaultProps, editMode: false });
      expect(ImportButtonContainer.Button).not.toBeInTheDocument();
    });
    test('Check if ImportButton is disabled with onImport function and default value', () => {
      setUp({ ...defaultProps, onImport: jest.fn() });
      expect(ImportButtonContainer.Button).toBeInTheDocument();
      expect(ImportButtonContainer.Button).not.toHaveAttribute('aria-disabled');
    });
    test('Check if ImportButton is disabled with editMode=false and onImport function', () => {
      setUp({ ...defaultProps, editMode: false, onImport: jest.fn() });
      expect(ImportButtonContainer.Button).toHaveAttribute('aria-disabled');
    });
  });

  describe('Check if ExportButton is displayed or not', () => {
    test('Check if ExportButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(ExportButtonContainer.Button).not.toBeInTheDocument();
    });
    test('Check if ExportButton is displayed with onExport function and default value', () => {
      setUp({ ...defaultProps, onExport: jest.fn() });
      expect(ExportButtonContainer.Button).toBeInTheDocument();
      expect(ExportButtonContainer.Button).not.toHaveAttribute('aria-disabled');
    });
  });

  describe('Check if AddRowButton is displayed or not', () => {
    test('Check if AddRowButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(AddRowButtonContainer.Button).not.toBeInTheDocument();
    });
    test('Check if AddRowButton is displayed with onAddRow function and default value', () => {
      setUp({ ...defaultProps, onAddRow: jest.fn() });
      expect(AddRowButtonContainer.Button).toBeInTheDocument();
    });
    test('Check if AddRowButton is disabled with onAddRow function editMode=false', () => {
      setUp({ ...defaultProps, onAddRow: jest.fn(), editMode: false });
      expect(AddRowButtonContainer.Button).toBeInTheDocument();
      expect(AddRowButtonContainer.Button).toHaveAttribute('aria-disabled');
    });
  });

  describe('Check if DeleteRowButton is displayed or not', () => {
    test('Check if DeleteRowButton is not displayed with default data', () => {
      setUp(defaultProps);
      expect(DeleteRowButtonContainer.Button).not.toBeInTheDocument();
    });
    test('Check if DeleteRowButton is disabled with onDeleteRow function and default value', () => {
      setUp({ ...defaultProps, onDeleteRow: jest.fn() });
      expect(DeleteRowButtonContainer.Button).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Button).toHaveAttribute('aria-disabled');
    });
    test('Check if DeleteRowButton is disabled with onDeleteRow function, editMode=false', () => {
      setUp({ ...defaultProps, onDeleteRow: jest.fn(), editMode: false });
      expect(DeleteRowButtonContainer.Button).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Button).toHaveAttribute('aria-disabled');
    });
    test('Check if DeleteRowButton is not disabled with onDeleteRow function, isReady=true', () => {
      setUp({ ...defaultProps, onDeleteRow: jest.fn(), isReady: true });
      expect(DeleteRowButtonContainer.Button).toBeInTheDocument();
      expect(DeleteRowButtonContainer.Button).not.toHaveAttribute('aria-disabled');
    });
  });
});
