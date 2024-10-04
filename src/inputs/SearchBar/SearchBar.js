// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';

export const SearchBar = ({ onSearchChange, className, label, icon, id, ...otherProps }) => {
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
  /**
   * optional icon to be appended in the end of the TextField
   */
  icon: PropTypes.node,
};
