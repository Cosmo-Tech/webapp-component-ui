// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@mui/material';

const STATUS = {
  IDLE: 'IDLE',
  GENERATING: 'GENERATING',
  READY: 'READY',
};
const DEFAULT_LABELS = {
  generateLink: 'Generate link',
  download: 'Download',
};
export const SelfDestructLinkButton = (props) => {
  const { generate, height = '40px', width = '143px', labels: tmpLabels, timeout = 15 } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
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
    timeoutRef.current = setTimeout(function () {
      reset();
    }, timeout * 1000);
  };

  const startLinkGeneration = async () => {
    setStatus(STATUS.GENERATING);
    const downloadLink = await generate();
    if (downloadLink && downloadLink.length > 0) {
      setDownloadLink(downloadLink);
      setStatus(STATUS.READY);
      startTimeout();
    } else {
      setStatus(STATUS.IDLE);
    }
  };

  const startDownload = async () => {
    reset();
  };

  const dimensions = { height, width };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...dimensions }}>
      {status === STATUS.IDLE && (
        <Button variant="contained" color="primary" onClick={startLinkGeneration} style={dimensions}>
          {labels.generateLink}
        </Button>
      )}
      {status === STATUS.GENERATING && <CircularProgress size={30} />}
      {status === STATUS.READY && (
        <Button
          variant="outlined"
          color="primary"
          onClick={startDownload}
          style={dimensions}
          target="_blank"
          href={downloadLink}
        >
          {labels.download}
        </Button>
      )}
    </div>
  );
};

SelfDestructLinkButton.propTypes = {
  /**
   * Function bound on button
   */
  generate: PropTypes.func.isRequired,
  /**
   * Button's height
   */
  height: PropTypes.string,
  /**
   * Button's width
   */
  width: PropTypes.string,
  /**
   *  Labels.
   *
   *  Structure:
   * <pre>
   *   {
        generateLink: 'string',
        download: 'string'
   *   }
   *    </pre>
   */
  labels: PropTypes.object,
  /**
   * Timeout before download link is unavailable
   */
  timeout: PropTypes.number, // Expressed in seconds
};
