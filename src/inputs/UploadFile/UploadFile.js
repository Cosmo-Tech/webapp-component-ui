// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress, Grid, IconButton, Link, Typography, makeStyles } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants';
import { BasicInputWrapper } from '../.';
import { FadingTooltip } from '../../misc/FadingTooltip';

const useStyles = makeStyles((theme) => ({
  uploadFileContainer: {
    '& > div': {
      margin: '0',
    },
  },
}));

export const UploadFile = (props) => {
  const {
    acceptedFileTypes,
    handleUploadFile,
    handleDeleteFile,
    handleDownloadFile,
    file,
    editMode,
    isFileValid,
    labels,
    tooltipText,
    ...otherProps
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.uploadFileContainer} {...otherProps}>
      <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item>
          <BasicInputWrapper label={labels.label} tooltipText={tooltipText} {...otherProps} />
        </Grid>
        <Grid item>
          <Button
            data-cy="browse-button"
            id="browse-button"
            disabled={!editMode}
            variant="outlined"
            color="primary"
            component="label"
            onChange={handleUploadFile}
          >
            {labels.button}
            <input type="file" accept={acceptedFileTypes} hidden />
          </Button>
        </Grid>
        <Grid item>
          {(file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD ||
            file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD) && (
            <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item>
                {file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD && (
                  <Link
                    data-cy="download-button"
                    id="download-button"
                    component="button"
                    onClick={handleDownloadFile}
                    download
                  >
                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                      <Grid item>
                        <GetAppIcon />
                      </Grid>
                      <Grid item>
                        <Typography data-cy="file-name">{file.name}</Typography>
                      </Grid>
                    </Grid>
                  </Link>
                )}
                {file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD && (
                  <Typography data-cy="file-name">{file.name}</Typography>
                )}
              </Grid>
              <Grid item>
                <FadingTooltip title={labels.delete}>
                  <IconButton
                    data-cy="delete-button"
                    id="delete-button"
                    disabled={!editMode}
                    aria-label="delete"
                    onClick={handleDeleteFile}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </FadingTooltip>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item>
          {(file.status === UPLOAD_FILE_STATUS_KEY.UPLOADING ||
            file.status === UPLOAD_FILE_STATUS_KEY.DOWNLOADING ||
            file.status === UPLOAD_FILE_STATUS_KEY.DELETING) && <CircularProgress />}
        </Grid>
        {isFileValid === false && (
          <Grid item>
            <FadingTooltip title={labels.invalidFileMessage} placement="right-end">
              <ErrorIcon color="error" />
            </FadingTooltip>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

UploadFile.propTypes = {
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
  }),
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
};

UploadFile.defaultProps = {
  acceptedFileTypes: '*',
};

UploadFile.defaultProps = {
  labels: {
    label: '',
    button: 'Browse',
    invalidFileMessage: 'Your file is invalid',
    delete: 'Delete file',
  },
};
