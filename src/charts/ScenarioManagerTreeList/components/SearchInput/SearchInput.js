// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useRef } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';

export const SearchInput = ({ onSearchChange, className, label }) => {
  const [textValue, setTextValue] = useState('');

  const timeoutHandle = useRef();

  const clearCurrentTimeout = () => {
    if (timeoutHandle.current) {
      clearTimeout(timeoutHandle.current);
    }
  };

  // clear timeout if enter pressed.
  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      clearCurrentTimeout();
      onSearchChange(textValue);
    }
  };

  const onTextChange = (event) => {
    const newValue = event.target.value;

    setTextValue(newValue);
    clearCurrentTimeout();

    timeoutHandle.current = setTimeout(() => {
      onSearchChange(newValue);
    }, 500);
  };

  return (
    <TextField
      data-cy="scenario-manager-search-field"
      id="standard-search"
      label={label}
      type="search"
      className={className}
      value={textValue}
      onChange={onTextChange}
      onKeyDown={onKeyDown}
      color="primary"
    />
  );
};

SearchInput.propTypes = {
  /**
   * callback for change search value
   */
  onSearchChange: PropTypes.func.isRequired,
  /**
   * className for TextField style (optional)
   */
  className: PropTypes.string,
  /**
   * label of TextField
   */
  label: PropTypes.string,
};
