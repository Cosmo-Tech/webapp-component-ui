// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import fileDownload from 'js-file-download'

const useStyles = theme => ({
});

const UploadFile = (props) => {

  // Props
  const {
    classes,
    acceptedFileTypes,
    uploadFile,
    deleteFile,
    downloadFile
  } = props;

  // Available status
  const UPLOAD_FILE_STATUS_KEY = {
  DOWNLOADING: 'DOWNLOADING',
  UPLOADING: 'UPLOADING',
  DELETING: 'DELETING',
  IDLE: 'IDLE'
};

  // Translation
  const { t } = useTranslation();

  // States
  const [fileToDownload, setFileToDownload] = useState({ name: '' } );
  const [fileCache, setFileCache] = useState(null);
  const [fileStatus, setFileStatus] = useState(UPLOAD_FILE_STATUS_KEY.IDLE);
  const [isFileValid, setFileValid] = useState(true);
  const [isUploadButtonDisabled, setUploadButtonDisabled] = useState(false);

  // Methods
  const handleUploadFile = (event) => {
    const file = event.target.files[0];
    if (file === undefined)
    {
      return;
    }
    const uploadPromise = new Promise((resolve) => {
      setFileStatus(UPLOAD_FILE_STATUS_KEY.UPLOADING);
      setUploadButtonDisabled(true);
      uploadFile(file);
      resolve('File ' + file.name + ' succefully uploaded');
    });
    uploadPromise.then(result => {
      setFileCache(file);
      setFileToDownload(file);
      setFileStatus(UPLOAD_FILE_STATUS_KEY.IDLE);
      setUploadButtonDisabled(false);
    });
  };

  const handleDeleteFile = () => {
    const deletePromise = new Promise((resolve) => {
      setFileStatus(UPLOAD_FILE_STATUS_KEY.DELETING);
      setUploadButtonDisabled(true);
      deleteFile(fileCache.name);
      resolve('File ' + fileCache.name + ' succefully deleted');
    });
    deletePromise.then(result => {
      setFileToDownload({ name: ''})
      setFileCache(null);
      setFileStatus(UPLOAD_FILE_STATUS_KEY.IDLE);
      setUploadButtonDisabled(false);
    });
  };

  const handleDownloadFile = () => {
    const downloadPromise = new Promise((resolve) => {
      setFileStatus(UPLOAD_FILE_STATUS_KEY.DOWNLOADING);
      setUploadButtonDisabled(true);
      downloadFile(fileToDownload.name)
      // setFileCache(downloadFile(fileName));
      resolve('File ' + fileToDownload.name + ' succefully downloaded');
    });
    downloadPromise.then(result =>  {
      setFileStatus(UPLOAD_FILE_STATUS_KEY.IDLE);
      setUploadButtonDisabled(false);
      fileDownload(fileCache, fileCache.name);
    });
  };

  // Render
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <Button disabled={isUploadButtonDisabled} variant="contained" component="label" onChange={handleUploadFile}>
            {fileToDownload.name
              ? t('genericcomponent.uploadfile.button.update')
              : t('genericcomponent.uploadfile.button.browse')
            }
            <input type="file" accept={acceptedFileTypes} hidden />
          </Button>
        </Grid>
        <Grid item>
          { fileToDownload.name && fileStatus === UPLOAD_FILE_STATUS_KEY.IDLE &&
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                <Link component="button" onClick={handleDownloadFile} download>
                  <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
                    <Grid item>
                      <GetAppIcon/>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {fileCache.name}
                      </Typography>
                    </Grid>
                  </Grid>
                </Link>
              </Grid>
              <Grid item>
                <IconButton aria-label="delete" onClick={handleDeleteFile}>
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
            </Grid>
          }
        </Grid>
        <Grid item>
          { fileStatus !== UPLOAD_FILE_STATUS_KEY.IDLE &&
            <CircularProgress color="secondary" />
          }
        </Grid>
          { !isFileValid &&
            <Grid item>
              <Tooltip title="Error: column name must be a string." placement="right-end">
                <ErrorIcon color="error" />
              </Tooltip>
            </Grid>
          }
      </Grid>
    </div>
  );
};

UploadFile.propTypes = {
  classes: PropTypes.any,
  acceptedFileTypes: PropTypes.string,
  uploadFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  downloadFile: PropTypes.func.isRequired
};

UploadFile.defaultProps = {
  acceptedFileTypes: '*'
};

export default withStyles(useStyles)(UploadFile);
