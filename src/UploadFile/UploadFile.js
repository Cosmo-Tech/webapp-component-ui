// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, {useState} from 'react';
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
import { UPLOAD_FILE_STATUS_KEY } from './StatusConstants'

const useStyles = theme => ({
});

const UploadFile = (props) => {

  // Props
  const {
    classes,
    acceptedFileTypes,
    handleUploadFile,
    handleDeleteFile,
    handleDownloadFile,
    file,
    editMode
  } = props;

  // Translation
  const { t } = useTranslation();
  // States
  //TODO manage this state correctly or pass it through props
  const [isFileValid, setFileValid] = useState(true);

  // Render
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
        <Grid item>
          <Button disabled={!editMode} variant="contained" component="label" onChange={handleUploadFile}>
            {t('genericcomponent.uploadfile.button.browse', 'Browse')}
            <input type="file" accept={acceptedFileTypes} hidden />
          </Button>
        </Grid>
        <Grid item>
          { (file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD
            || file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_UPLOAD) &&
            <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
              <Grid item>
                { file.status === UPLOAD_FILE_STATUS_KEY.READY_TO_DOWNLOAD &&
                  <Link component="button" onClick={handleDownloadFile} download>
                    <Grid container spacing={2} direction="row" justify="flex-start" alignItems="center">
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
          { file.status === UPLOAD_FILE_STATUS_KEY.UPLOADING
            || file.status === UPLOAD_FILE_STATUS_KEY.DOWNLOADING
            || file.status === UPLOAD_FILE_STATUS_KEY.DELETING &&
            <CircularProgress color="secondary" />
          }
        </Grid>
          { !isFileValid &&
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
  classes: PropTypes.any,
  acceptedFileTypes: PropTypes.string,
  handleUploadFile: PropTypes.func.isRequired,
  handleDeleteFile: PropTypes.func.isRequired,
  handleDownloadFile: PropTypes.func.isRequired,
  file: PropTypes.object,
  editMode: PropTypes.bool.isRequired
};

UploadFile.defaultProps = {
  acceptedFileTypes: '*'
};

export default withStyles(useStyles)(UploadFile);
