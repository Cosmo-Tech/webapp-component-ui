// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, OutlinedInput, FormHelperText, Link, CircularProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

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
  outlinedInput: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    '& .MuiOutlinedInput-input': {
      minWidth: '300px',
      marginLeft: '4px',
      padding: '4px',
    },
  },
  editIcon: {
    margin: 'auto',
    marginRight: '10px',
    fontWeight: 'bold',
    height: '20px',
    color: theme.palette.primary.main,
  },
}));

export const EditableLink = (props) => {
  const { value, onNewValue, onClick, checkValue, isEditing, setEditing, labels, typographyProps } = props;

  const classes = useStyles();

  const [error, setError] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState(value);

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
    setError(null);
  };

  const getLinkDisplay = () => {
    if (value === textFieldValue) {
      return (
        <Link
          data-cy="scenario-view-redirect"
          component="button"
          underline="hover"
          className={classes.label}
          {...typographyProps}
          onClick={onClick}
        >
          {value}
        </Link>
      );
    } else {
      return <CircularProgress size={25} color="primary" />;
    }
  };

  return (
    <div data-cy="editable-link">
      {isEditing ? (
        <FormControl data-cy="editable-link-in-edition-mode">
          <OutlinedInput
            className={classes.outlinedInput}
            autoFocus
            defaultValue={value}
            error={error != null}
            placeholder={labels.title}
            onChange={checkNewValueOnChange}
            onBlur={(event) => stopEdition(event)}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={(event) => {
              if (event.key === 'Escape') setEditing(false);
              else if (event.key === 'Enter') stopEdition(event);
            }}
            onFocus={(event) => event.stopPropagation()}
          />
          <FormHelperText error>{error}</FormHelperText>
        </FormControl>
      ) : (
        getLinkDisplay()
      )}
    </div>
  );
};

EditableLink.propTypes = {
  /**
   * String value displayed in label
   */
  value: PropTypes.string.isRequired,
  /**
   * Callback function called when a new valid value is set
   */
  onNewValue: PropTypes.func.isRequired,
  /**
   * Function called when the link is clicked
   */
  onClick: PropTypes.func.isRequired,
  /**
   * Function to check if new value is valid.
   * If the value is valid, this function must return null.
   * If the value is invalid, the function must return a string message describing why it is invalid
   */
  checkValue: PropTypes.func,
  /**
   * Boolean value indicating if the label is in edition mode
   */
  isEditing: PropTypes.bool.isRequired,
  /**
   * Function to set the edition mode
   */
  setEditing: PropTypes.func.isRequired,
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
   * Props to forward to the Typography component
   */
  typographyProps: PropTypes.object,
};

EditableLink.defaultProps = {
  labels: {
    title: 'Scenario name',
    errors: {
      emptyValueName: 'Value cannot be empty',
      forbiddenCharsInValue: 'Value is invalid',
    },
  },
  checkValue: () => null,
};
