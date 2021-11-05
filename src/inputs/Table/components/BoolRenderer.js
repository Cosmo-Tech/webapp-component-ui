// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';
import { BasicEnumInput } from '../../BasicInputs/BasicEnumInput/BasicEnumInput.js';

export const BoolRenderer = forwardRef((props, ref) => {
  console.log(props);

  const [value, setValue] = useState(props.value);

  useEffect(() => {
    focus();
  }, []);

  useImperativeHandle(ref, () => {
    return {
      getValue() {
        return value;
      },

      isPopup() {
        return true;
      },
    };
  });

  const textFieldProps = {
    // disabled: !editMode,
    // id: parameterData.id,
    disabled: false,
    id: 'test',
  };
  const enumValues = [
    {
      key: 'true',
      value: 'true',
    },
    {
      key: 'false',
      value: 'false',
    },
  ];

  return (
    <BasicEnumInput
      key="test"
      value={value}
      changeEnumField={(value) => {
        setValue(value);
        // props.stopEditing();
      }}
      textFieldProps={textFieldProps}
      enumValues={enumValues}
    />
  );
});

BoolRenderer.propTypes = {
  value: PropTypes.string.isRequired,
  stopEditing: PropTypes.func.isRequired,
};

BoolRenderer.displayName = 'BoolRenderer';
