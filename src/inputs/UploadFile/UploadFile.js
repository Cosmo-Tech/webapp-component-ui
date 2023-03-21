// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, IconButton, Link, Stack, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ErrorIcon from '@mui/icons-material/Error';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import GetAppIcon from '@mui/icons-material/GetApp';
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants';
import { FadingTooltip, TooltipInfo } from '../../misc';
import { getCommonInputStyles } from '../style';

const useStyles = makeStyles(getCommonInputStyles);

export const UploadFile = (props) => {
  const {
    id,
    acceptedFileTypes,
    handleUploadFile,
    handleDeleteFile,
    handleDownloadFile,
    file,
    editMode,
    isFileValid,
    labels,
    tooltipText,
    isDirty,
  } = props;

  const classes = useStyles();
  // TODO: create a generic component to truncate texts in Typography elements
  const smartFileName = useMemo(() => {
    const fileNameLength = file?.name?.length ?? 0;
    if (fileNameLength > 20)
      return (
        <FadingTooltip title={file.name}>
          <Typography data-cy="file-name" noWrap sx={{ maxWidth: '20ch' }}>
            {file.name}
          </Typography>
        </FadingTooltip>
      );
    return (
      <Typography data-cy="file-name" noWrap sx={{ maxWidth: '20ch' }}>
        {file.name}
      </Typography>
    );
  }, [file.name]);

  return (
    <Stack data-cy={`file-upload-${id}`} className={isDirty ? classes.dirtyInput : classes.notDirtyInput}>
      <Stack spacing={1} direction="row" alignItems="center">
        <Typography data-cy="label-disabled-input" variant="subtitle2" color="textSecondary">
          {labels.label}
        </Typography>
        <TooltipInfo title={tooltipText} variant="small" />
      </Stack>
      <Stack direction="row" alignItems="center" spacing={1}>
        {!editMode && (file.status === 'EMPTY' || Object.keys(file).length === 0) && (
          <Typography sx={{ fontStyle: 'italic', ml: 1 }} color="textSecondary">
            {labels.noFileMessage}
          </Typography>
        )}
        {editMode && (
          <Button
            data-cy="browse-button"
            id="browse-button"
            variant="soft"
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
            {smartFileName}
          </Link>
        )}
        {file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD && smartFileName}
        {(file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD ||
          file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD) &&
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
        {(file.status === UPLOAD_FILE_STATUS_KEY.UPLOADING ||
          file.status === UPLOAD_FILE_STATUS_KEY.DOWNLOADING ||
          file.status === UPLOAD_FILE_STATUS_KEY.DELETING) && <CircularProgress />}
        {isFileValid === false && (
          <FadingTooltip title={labels.invalidFileMessage} placement="right-end">
            <ErrorIcon color="error" />
          </FadingTooltip>
        )}
      </Stack>
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
  handleDownloadFile: PropTypes.func.isRequired,
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
   *  Define the UploadFile's state:
   *  - true : the button is enabled
   *  - false : the button is disabled
   */
  editMode: PropTypes.bool.isRequired,
  /**
   *  Defines if the uploaded file is valid or not
   */
  isFileValid: PropTypes.bool,
  /**
   * Component's labels:
   * Structure:
   * <pre>
     {
      button: 'string',
      invalidFileMessage: 'string',
      label: 'string',
      delete: 'string'
    }
   </pre>
   */
  labels: PropTypes.shape({
    button: PropTypes.string.isRequired,
    invalidFileMessage: PropTypes.string.isRequired,
    label: PropTypes.string,
    delete: PropTypes.string,
    noFileMessage: PropTypes.string,
  }),
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * Boolean value that defines whether the input has been modified or not; if true, a special css class is applied.
   */
  isDirty: PropTypes.bool,
};

UploadFile.defaultProps = {
  acceptedFileTypes: '*',
  labels: {
    label: '',
    button: 'Browse',
    invalidFileMessage: 'Your file is invalid',
    delete: 'Delete file',
    noFileMessage: 'None',
  },
  isDirty: false,
};
