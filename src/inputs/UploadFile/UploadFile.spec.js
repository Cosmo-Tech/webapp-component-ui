/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import { UploadFile } from './UploadFile';
import { renderInMuiThemeProvider } from '../../../tests/utils';
import { ContainerTesting } from '../../../tests/MuiComponentsTesting';

const mockOnFileUpload = jest.fn();
const mockOnFileDelete = jest.fn();
const mockOnFileDownload = jest.fn();
const uploadFileInputContainer = new ContainerTesting({ dataCy: 'file-upload-dataset' });
const defaultProps = {
  id: 'dataset',
  file: {},
  handleUploadFile: mockOnFileUpload,
  handleDeleteFile: mockOnFileDelete,
  handleDownloadFile: mockOnFileDownload,
  editMode: true,
};

const propsWithDirtyState = {
  ...defaultProps,
  isDirty: true,
};
const setUp = (props) => {
  renderInMuiThemeProvider(<UploadFile {...props} />);
};

describe('Checks file upload input in edit mode', () => {
  test("Component is displayed in edit mode and dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(uploadFileInputContainer.Container).toBeInTheDocument();
    expect(uploadFileInputContainer.Container).not.toHaveDirtyInputClass();
  });
  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(uploadFileInputContainer.Container).toHaveDirtyInputClass();
  });
});
