// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ErrorIcon from '@mui/icons-material/Error';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Button, CircularProgress, IconButton, Link, Stack, Typography } from '@mui/material';
import { PathUtils } from '@cosmotech/core';
import { FadingTooltip, TooltipInfo } from '../../misc';
import { getCommonInputSxProps } from '../style';
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants';

const DEFAULT_LABELS = {
  label: '',
  button: 'Browse',
  invalidFileMessage: 'File format not supported',
  delete: 'Delete file',
  noFileMessage: 'None',
};
export const UploadFile = (props) => {
  const {
    id,
    acceptedFileTypes = '*',
    handleUploadFile,
    handleDeleteFile,
    handleDownloadFile,
    file,
    editMode,
    isFileValid,
    error,
    labels: tmpLabels,
    tooltipText,
    isDirty,
    shouldHideFileName = false,
  } = props;
  if (isFileValid) {
    console.warn('"isFileValid" prop is deprecated in UploadFile. Please use "error" instead.');
  }

  const labels = useMemo(() => {
    return { ...DEFAULT_LABELS, ...tmpLabels };
  }, [tmpLabels]);

  // TODO: create a generic component to truncate texts in Typography elements
  const fileNameElement = useMemo(() => {
    let fullLabel = file?.name;
    if (shouldHideFileName) {
      const extension = PathUtils.getExtensionFromFileName(file?.name)?.toUpperCase();
      fullLabel =
        labels?.getFileNamePlaceholder !== undefined ? labels.getFileNamePlaceholder(extension) : `${extension} file`;
    }

    const fileName = (
      <Typography data-cy="file-name" noWrap sx={{ maxWidth: '20ch' }}>
        {fullLabel}
      </Typography>
    );

    return (fullLabel?.length ?? 0 > 20) ? <FadingTooltip title={fullLabel}>{fileName}</FadingTooltip> : fileName;
  }, [file?.name, labels, shouldHideFileName]);

  return (
    <Stack data-cy={`file-upload-${id}`} sx={getCommonInputSxProps(isDirty)}>
      <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
        <Typography
          data-cy="label-disabled-input"
          variant="subtitle2"
          color={error != null ? 'error' : 'textSecondary'}
        >
          {labels.label}
        </Typography>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {!editMode && (file.status === UPLOAD_FILE_STATUS_KEY.EMPTY || Object.keys(file).length === 0) && (
          <Typography color="textSecondary" sx={{ fontStyle: 'italic', ml: 1 }}>
            {labels.noFileMessage}
          </Typography>
        )}
        {editMode && (
          <Button
            data-cy="browse-button"
            id="browse-button"
            variant="outlined"
            color="primary"
            component="label"
            onChange={handleUploadFile}
            sx={{ ml: 1, my: 1 }}
          >
            {labels.button}
            <input type="file" accept={acceptedFileTypes} hidden />
          </Button>
        )}
        {file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD && (
          <Link
            data-cy="download-button"
            id="download-button"
            component="button"
            underline="none"
            onClick={handleDownloadFile}
            download
            sx={{ display: 'inline-flex' }}
          >
            <GetAppIcon />
            {fileNameElement}
          </Link>
        )}
        {file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD && fileNameElement}
        {(file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD ||
          file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD ||
          error != null) &&
          editMode && (
            <FadingTooltip title={labels.delete}>
              <IconButton
                data-cy="delete-button"
                id="delete-button"
                aria-label="delete"
                onClick={handleDeleteFile}
                size="large"
                color="error"
              >
                <DeleteForeverIcon />
              </IconButton>
            </FadingTooltip>
          )}
        {isFileValid === false && (
          <FadingTooltip title={labels.invalidFileMessage} placement="right-end">
            <ErrorIcon color="error" />
          </FadingTooltip>
        )}
        {(file.status === UPLOAD_FILE_STATUS_KEY.UPLOADING ||
          file.status === UPLOAD_FILE_STATUS_KEY.DOWNLOADING ||
          file.status === UPLOAD_FILE_STATUS_KEY.DELETING) && <CircularProgress data-cy="circular-progress" />}
      </Stack>
      {error != null && (
        <Typography color="error" data-cy="file-error-message" sx={{ fontSize: 'small', ml: 1 }}>
          {error?.message}
        </Typography>
      )}
    </Stack>
  );
};

UploadFile.propTypes = {
  /**
   * Component's id that is used as test selector
   */
  id: PropTypes.string,
  /**
   * Pre-filter extension files for upload
   */
  acceptedFileTypes: PropTypes.string,
  /**
   * Function bound on "upload" button
   */
  handleUploadFile: PropTypes.func.isRequired,
  /**
   * Function bound on "delete" icon
   */
  handleDeleteFile: PropTypes.func.isRequired,
  /**
   * Function bound on "download" icon
   */
  handleDownloadFile: PropTypes.func,
  /**
   * Uploaded file data:
   * Structure :
   * <pre>
    {
      name: '',
      status: One Of UPLOAD_FILE_STATUS_KEY.*
    }
    </pre>
   */
  file: PropTypes.object,
  /**
   * Define the UploadFile's state:
   * - true : the button is enabled
   * - false : the button is disabled
   */
  editMode: PropTypes.bool.isRequired,
  /**
   * DEPRECATED: this prop is deprecated, Please consider removing this prop
   * Defines if the uploaded file is valid or not
   */
  isFileValid: PropTypes.bool,
  /**
   * Error object that contains the type of error and its message
   */
  error: PropTypes.object,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      button: 'string',
      invalidFileMessage: 'string',
      label: 'string',
      delete: 'string',
      noFileMessage: 'string',
      getFileNamePlaceholder: 'func',
    }
   </pre>
   */
  labels: PropTypes.shape({
    button: PropTypes.string.isRequired,
    invalidFileMessage: PropTypes.string.isRequired,
    label: PropTypes.string,
    delete: PropTypes.string,
    noFileMessage: PropTypes.string,
    getFileNamePlaceholder: PropTypes.func,
  }),
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
  /**
   * Boolean value that defines whether the file name must be hidden and replaced by a placeholder only stating the
   * file extension.
   */
  shouldHideFileName: PropTypes.bool,
};
