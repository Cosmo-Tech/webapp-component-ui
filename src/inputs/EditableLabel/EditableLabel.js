// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  labelDisplayContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  label: {
    maxWidth: '500px',
    color: theme.palette.primary.main,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  textField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    '& .MuiOutlinedInput-input': {
      borderWidth: '2px',
      outline: 'none',
      padding: '8px',
    },
    '& .MuiOutlinedInput-root': {
      minWidth: '300px',
    },
  },
  editIcon: {
    marginRight: '10px',
    fontWeight: 'bold',
    height: '20px',
    color: theme.palette.primary.main,
  },
  circularLoading: {
    marginLeft: '15px',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.background.card,
  },
}));

export const EditableLabel = (props) => {
  const { value, onNewValue, checkValue, labels, typographyProps, textFieldProps } = props;

  const classes = useStyles();

  const [isEditing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isHovered, setHovered] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState(value);

  const startEdition = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setEditing(true);
  };

  const checkNewValueOnChange = (event) => {
    const newValue = event.target.value.trimEnd();
    const error = newValue !== value ? checkValue(newValue) : null;
    setError(error);
  };

  const stopEdition = (event) => {
    event.stopPropagation();
    const newValue = event.target.value.trimEnd();
    if (newValue !== value) {
      if (error == null) {
        onNewValue(newValue);
        setTextFieldValue(newValue);
      }
    }
    setEditing(false);
    setHovered(false);
    setError(null);
  };

  const getLabelDisplay = () => {
    if (value === textFieldValue) {
      return (
        <div
          className={classes.labelDisplayContainer}
          onMouseLeave={() => setHovered(false)}
          onMouseOver={() => setHovered(true)}
          onClick={startEdition}
        >
          {isHovered && <EditIcon className={classes.editIcon} />}
          <Typography className={classes.label} {...typographyProps}>
            {value}
          </Typography>
        </div>
      );
    } else {
      return <CircularProgress size={25} className={classes.circularLoading} />;
    }
  };

  return (
    <div data-cy="editable-label">
      {isEditing ? (
        <TextField
          className={classes.textField}
          autoFocus
          defaultValue={value}
          error={error != null}
          helperText={error}
          placeholder={labels.title}
          onChange={checkNewValueOnChange}
          onBlur={(event) => {
            stopEdition(event);
          }}
          onClick={(event) => event.stopPropagation()}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              stopEdition(event);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setEditing(false);
            }
          }}
          onFocus={(event) => {
            event.stopPropagation();
          }}
          {...textFieldProps}
        />
      ) : (
        getLabelDisplay()
      )}
    </div>
  );
};

EditableLabel.propTypes = {
  /**
   * String value displayed in label
   */
  value: PropTypes.string.isRequired,
  /**
   * Callback function called when a new valid value is set
   */
  onNewValue: PropTypes.func.isRequired,
  /**
   * Function to check if new value is valid.
   * If the value is valid, this function must return null.
   * If the value is invalid, the function must return a string message describing why it is invalid
   */
  checkValue: PropTypes.func,
  /**
   * Text field Labels
   *
   * Structure:
   * <pre>
   *   {
        title: 'string'
        errors: {
          emptyValueName: 'string'
          forbiddenCharsInValue: 'string'
        },
   *   }
   * </pre>
   */
  labels: PropTypes.shape({
    title: PropTypes.string,
    errors: PropTypes.shape({
      emptyValueName: PropTypes.string,
      forbiddenCharsInValue: PropTypes.string,
    }),
  }),
  /**
   * Props to forwrad to the Typography component
   */
  typographyProps: PropTypes.object,
  /**
   * Props to forwrad to the TextField component
   */
  textFieldProps: PropTypes.object,
};

EditableLabel.defaultValue = {
  labels: {
    title: 'Scenario name',
    errors: {
      emptyValueName: 'Value cannot be empty',
      forbiddenCharsInValue: 'Value is invalid',
    },
  },
  checkValue: () => null,
};