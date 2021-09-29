// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CircularProgress
} from '@material-ui/core';
import useStyles from './style';

const STATUS = {
  IDLE: 'IDLE',
  GENERATING: 'GENERATING',
  READY: 'READY'
};

const SelfDestructLinkButton = (props) => {
  const classes = useStyles();
  const {
    generate,
    download,
    height,
    width,
    labels,
    timeout
  } = props;

  const [status, setStatus] = useState(STATUS.IDLE);
  const [downloadLink, setDownloadLink] = useState(null);
  const timeoutRef = useRef(null);

  const reset = () => {
    setStatus(STATUS.IDLE);
    setDownloadLink(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startTimeout = () => {
    timeoutRef.current = setTimeout(function () { reset(); }, timeout * 1000);
  };

  const startLinkGeneration = async () => {
    setStatus(STATUS.GENERATING);
    const downloadLink = await generate();
    if (downloadLink) {
      setDownloadLink(downloadLink);
      setStatus(STATUS.READY);
      startTimeout();
    }
  };

  const startDownload = async () => {
    download(downloadLink);
    reset();
  };

  const dimensions = { height: height, width: width };

  return (
    <div className={classes.root} style={dimensions}>
      { status === STATUS.IDLE &&
        <Button variant="contained" color="primary" onClick={startLinkGeneration} style={dimensions}>
          { labels.generateLink }
        </Button>
      }
      { status === STATUS.GENERATING &&
        <CircularProgress size={30}/>
      }
      { status === STATUS.READY &&
        <Button variant="contained" color="primary" onClick={startDownload} style={dimensions}>
          { labels.download }
        </Button>
      }
    </div>
  );
};

SelfDestructLinkButton.propTypes = {
  generate: PropTypes.func.isRequired,
  download: PropTypes.func.isRequired,
  height: PropTypes.string,
  width: PropTypes.string,
  labels: PropTypes.object,
  timeout: PropTypes.number // Expressed in seconds
};

SelfDestructLinkButton.defaultProps = {
  height: '40px',
  width: '143px',
  labels: {
    generateLink: 'Generate link',
    download: 'Download'
  },
  timeout: 15 // Expressed in seconds
};

export default SelfDestructLinkButton;
