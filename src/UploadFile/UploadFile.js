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

const useStyles = theme => ({
});

const UploadFile = (props) => {

  // Props
  const {
    classes,
    acceptedFiles,
    propFileName
  } = props;

  // Translation
  const { t } = useTranslation();

  // States
  const [fileName, setFileName] = useState(propFileName);
  const [fileStatus, setFileStatus] = useState('IDLE');
  const [isFileValid, setFileValid] = useState(true);

  // Methods
  const uploadFile = (event) => {
    const file = event.target.files[0]
    setFileName(file.name)
  };

  const deleteFile = () => {
    setFileName(null);
  };

  const downloadFile = () => {

  };

  // Render
  return (
    <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
      <Grid item>
        <Button variant="contained" component="label" onChange={uploadFile}>
          {t('genericcomponent.uploadfile.button.browse', 'Browse')}
          <input type="file" accept={acceptedFiles} hidden />
        </Button>
      </Grid>
      <Grid item>
      { fileName &&
        <Grid container spacing={3} direction="row" justify="flex-start" alignItems="center">
          <Grid item>
            <GetAppIcon style={{ color: '#FFFFFF', fontSize: 20 }} />
          </Grid>
          <Grid item>
            <Typography>
              <Link href="#" onClick={downloadFile}>
                {fileName}
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="delete" onClick={deleteFile}>
              <DeleteForeverIcon />
            </IconButton>
          </Grid>
          { fileStatus != 'IDLE' &&
            <Grid item>
              <CircularProgress color="secondary" />
            </Grid>
          }
          { !isFileValid &&
          <Grid item>
            <Tooltip title="Error: column name must be a string." placement="right-end">
              <ErrorIcon color="error" />
            </Tooltip>
          </Grid>
          }
        </Grid>
      }
      </Grid>
    </Grid>
  );
};

UploadFile.propTypes = {
  classes: PropTypes.any,
  acceptedFiles: PropTypes.string,
  propFileName: PropTypes.string
};

UploadFile.defaultProps = {
  acceptedFiles: '*',
  propFileName: null
};

export default withStyles(useStyles)(UploadFile);
