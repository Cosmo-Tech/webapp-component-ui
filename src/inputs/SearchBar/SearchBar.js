// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';

export const SearchBar = ({ onSearchChange, className, label, icon, id, debounceDelay = 500, ...otherProps }) => {
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
    if (debounceDelay > 0) {
      setTextValue(newValue);
      clearCurrentTimeout();

      timeoutHandle.current = setTimeout(() => {
        onSearchChange(newValue);
      }, debounceDelay);
    } else {
      setTextValue(newValue);
      onSearchChange(newValue);
    }
  };

  return (
    <TextField
      data-cy={id}
      id={id}
      label={label}
      type="search"
      className={className}
      value={textValue}
      onChange={onTextChange}
      onKeyDown={onKeyDown}
      color="primary"
      {...otherProps}
      slotProps={{
        input: {
          endAdornment: <InputAdornment position="end">{icon}</InputAdornment>,
        },
      }}
    />
  );
};

SearchBar.propTypes = {
  /**
   * id of the input
   */
  id: PropTypes.string,
  /**
   * Callback called after debounce when the value of the search input text field has changed
   */
  onSearchChange: PropTypes.func.isRequired,
  /**
   * Debounce delay in ms before triggering the onSearchChange callback (default: 500 ms)
   */
  debounceDelay: PropTypes.number,
  /**
   * className for TextField style (optional)
   */
  className: PropTypes.string,
  /**
   * label of TextField
   */
  label: PropTypes.string,
  /**
   * optional icon to be appended in the end of the TextField
   */
  icon: PropTypes.node,
};
