// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from '@material-ui/core';
import { BasicInputWrapper } from '../BasicInputWrapper';

export const BasicToggleInput = (props) => {
  const { label, tooltipText, value, switchProps, changeSwitchType, containerProps, labelProps, ...otherProps } = props;

  return (
    <BasicInputWrapper
      label={label}
      tooltipText={tooltipText}
      containerProps={containerProps}
      labelProps={labelProps}
      {...otherProps}
    >
      <Switch
        color="secondary"
        onChange={(event) => changeSwitchType(event.target.checked)}
        checked={value}
        {...switchProps}
      />
    </BasicInputWrapper>
  );
};

BasicToggleInput.propTypes = {
  /**
   * BasicToggleInput's label
   */
  label: PropTypes.string,
  /**
   * Tooltip text
   */
  tooltipText: PropTypes.string,
  /**
   * BasicToggleInput's checked
   */
  value: PropTypes.bool.isRequired,
  /**
   * Function used when the user changes the BasicToggleInput value
   */
  changeSwitchType: PropTypes.func.isRequired,
  /**
   * Additional props that you can specify for the BasicToggleInput's toggle
   */
  switchProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicToggleInput's Grid container that displays both label and input
   */
  containerProps: PropTypes.object,
  /**
   * Additional props that you can specify for the BasicToggleInput's label
   */
  labelProps: PropTypes.object,
};

BasicToggleInput.defaultProps = {
  containerProps: {
    direction: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    spacing: 2,
  },
  labelProps: {
    variant: 'subtitle2',
  },
};
