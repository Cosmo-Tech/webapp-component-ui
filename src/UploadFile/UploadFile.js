// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Link,
  Tooltip,
  Typography
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import GetAppIcon from '@material-ui/icons/GetApp';
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants';

const UploadFile = (props) => {
  const {
    acceptedFileTypes,
    handleUploadFile,
    handleDeleteFile,
    handleDownloadFile,
    file,
    editMode,
    isFileValid
  } = props;
  const { t } = useTranslation();

  return (
    <div>
      <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
        <Grid item>
          <Button disabled={!editMode} variant="contained" component="label" onChange={handleUploadFile}>
            {t('genericcomponent.uploadfile.button.browse', 'Browse')}
            <input type="file" accept={acceptedFileTypes} hidden />
          </Button>
        </Grid>
        <Grid item>
          { (file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD ||
            file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD) &&
            <Grid container spacing={3} direction="row" justifyContent="flex-start" alignItems="center">
              <Grid item>
                { file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD &&
                  <Link component="button" onClick={handleDownloadFile} download>
                    <Grid container spacing={2} direction="row" justifyContent="flex-start" alignItems="center">
                      <Grid item>
                        <GetAppIcon/>
                      </Grid>
                      <Grid item>
                        <Typography>
                          {file.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Link>
                }
                { file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD &&
                  <Typography>
                    {file.name}
                  </Typography>
                }
              </Grid>
              <Grid item>
                <IconButton disabled={!editMode} aria-label="delete" onClick={handleDeleteFile}>
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
            </Grid>
          }
        </Grid>
        <Grid item>
          { (file.status === UPLOAD_FILE_STATUS_KEY.UPLOADING ||
            file.status === UPLOAD_FILE_STATUS_KEY.DOWNLOADING ||
            file.status === UPLOAD_FILE_STATUS_KEY.DELETING) &&
            <CircularProgress color="secondary" />
          }
        </Grid>
          { (isFileValid === false) &&
            <Grid item>
              <Tooltip title="genericcomponent.uploadfile.tooltip.isvalidfile" placement="right-end">
                <ErrorIcon color="error" />
              </Tooltip>
            </Grid>
          }
      </Grid>
    </div>
  );
};

UploadFile.propTypes = {
  acceptedFileTypes: PropTypes.string,
  handleUploadFile: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
  file: PropTypes.object,
  editMode: PropTypes.bool.isRequired,
  isFileValid: PropTypes.bool
};

UploadFile.defaultProps = {
  acceptedFileTypes: '*'
};

export default UploadFile;
