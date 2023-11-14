/* eslint-disable react/prop-types */
// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import { ContainerTesting, ButtonTesting, TypographyTesting } from '../../../tests/MuiComponentsTesting';
import { getByDataCy, renderInMuiThemeProvider } from '../../../tests/utils';
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants';
import { UploadFile } from './UploadFile';

const mockOnFileUpload = jest.fn();
const mockOnFileDelete = jest.fn();
const mockOnFileDownload = jest.fn();
const uploadFileInputContainer = new ContainerTesting({ dataCy: 'file-upload-dataset' });
const defaultProps = {
  id: 'dataset',
  error: undefined,
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

const propsFileReadyToDownload = {
  ...defaultProps,
  file: {
    name: 'file.csv',
    status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
  },
};

const propsFileReadyToUpload = {
  ...defaultProps,
  file: {
    name: 'file.csv',
    status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
  },
};

const propsHiddenFileNameReadyToDownload = {
  ...defaultProps,
  shouldHideFileName: true,
  file: {
    name: 'file.csv',
    status: UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD,
  },
};

const propsHiddenFileNameReadyToUpload = {
  ...defaultProps,
  shouldHideFileName: true,
  file: {
    name: 'file.csv',
    status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
  },
};

const propsInvalidFileFormat = {
  ...defaultProps,
  error: {
    message: 'File format not supported',
  },
  file: {
    name: 'invalid_file_format.png',
    status: UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD,
  },
};

const propsFileActionProcessing = {
  ...defaultProps,
  file: {
    name: 'file.csv',
    status: UPLOAD_FILE_STATUS_KEY.DOWNLOADING,
  },
};

const setUp = (props) => {
  renderInMuiThemeProvider(<UploadFile {...props} />);
};

const downloadButton = new ButtonTesting({ dataCy: 'download-button' });
const deleteButton = new ButtonTesting({ dataCy: 'delete-button' });
const fileName = new TypographyTesting({ dataCy: 'file-name' });
const fileErrorMessage = new TypographyTesting({ dataCy: 'file-error-message' });

describe('Checks file upload input in edit mode', () => {
  beforeEach(() => {
    mockOnFileUpload.mockClear();
    mockOnFileDelete.mockClear();
    mockOnFileDownload.mockClear();
  });

  test('dirtyInput class is applied when isDirty is true', () => {
    setUp(propsWithDirtyState);
    expect(uploadFileInputContainer.Container).toHaveDirtyInputClass();
  });

  test("Component is displayed in edit mode, dirtyInput class isn't applied when isDirty is false", () => {
    setUp(defaultProps);
    expect(downloadButton.Button).not.toBeInTheDocument();
    expect(deleteButton.Button).not.toBeInTheDocument();
    expect(getByDataCy('circular-progress')).not.toBeInTheDocument();
    expect(uploadFileInputContainer.Container).toBeInTheDocument();
    expect(uploadFileInputContainer.Container).not.toHaveDirtyInputClass();
    expect(fileErrorMessage.Typography).not.toBeInTheDocument();
  });

  test('Component is correctly displayed when file is ready to upload', async () => {
    setUp(propsFileReadyToUpload);
    expect(fileName.Typography).toHaveTextContent('file.csv');
    expect(deleteButton.Button).toBeInTheDocument();
    expect(downloadButton.Button).not.toBeInTheDocument();
    expect(getByDataCy('circular-progress')).not.toBeInTheDocument();
    expect(fileErrorMessage.Typography).not.toBeInTheDocument();

    await deleteButton.click();
    expect(mockOnFileDelete).toHaveBeenCalled();
  });

  test('Component is correctly displayed when file is ready to download', async () => {
    setUp(propsFileReadyToDownload);
    expect(fileName.Typography).toHaveTextContent('file.csv');
    expect(downloadButton.Button).toBeInTheDocument();
    expect(deleteButton.Button).toBeInTheDocument();
    expect(getByDataCy('circular-progress')).not.toBeInTheDocument();
    expect(fileErrorMessage.Typography).not.toBeInTheDocument();

    await downloadButton.click();
    expect(mockOnFileDownload).toHaveBeenCalled();
    await deleteButton.click();
    expect(mockOnFileDelete).toHaveBeenCalled();
  });

  test('should hide the name of the file to upload when shouldHideFileName is true', async () => {
    setUp(propsHiddenFileNameReadyToUpload);
    expect(fileName.Typography).toHaveTextContent('CSV file');
    expect(fileName.Typography).not.toHaveTextContent('file.csv');
  });

  test('should hide the name of the file to download when shouldHideFileName is true', async () => {
    setUp(propsHiddenFileNameReadyToDownload);
    expect(fileName.Typography).toHaveTextContent('CSV file');
    expect(fileName.Typography).not.toHaveTextContent('file.csv');
  });

  test('Component is correctly displayed when a file action is processing', () => {
    setUp(propsFileActionProcessing);
    expect(getByDataCy('circular-progress')).toBeInTheDocument();
    expect(fileName.Typography).not.toBeInTheDocument();
    expect(downloadButton.Button).not.toBeInTheDocument();
    expect(deleteButton.Button).not.toBeInTheDocument();
    expect(fileErrorMessage.Typography).not.toBeInTheDocument();
  });

  test('Component is correctly displayed when file format is invalid', async () => {
    setUp(propsInvalidFileFormat);
    expect(fileName.Typography).toBeInTheDocument();
    expect(deleteButton.Button).toBeInTheDocument();
    expect(fileErrorMessage.text).toEqual('File format not supported');
    expect(downloadButton.Button).not.toBeInTheDocument();
    expect(getByDataCy('circular-progress')).not.toBeInTheDocument();

    await deleteButton.click();
    expect(mockOnFileDelete).toHaveBeenCalled();
  });
});
