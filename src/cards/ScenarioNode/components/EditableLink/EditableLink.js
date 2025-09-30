// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Edit as EditIcon } from '@mui/icons-material';
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  Link,
  CircularProgress,
  IconButton,
  Grid,
  Typography,
} from '@mui/material';
import { FadingTooltip } from '../../../../misc';

const DEFAULT_LABELS = {
  title: 'Scenario name',
  edit: 'Edit',
  errors: {
    emptyValueName: 'Value cannot be empty',
    forbiddenCharsInValue: 'Value is invalid',
  },
};

export const EditableLink = (props) => {
  const {
    value,
    onNewValue,
    onClick,
    checkValue = () => null,
    labels: tmpLabels,
    typographyProps,
    canRenameScenario,
  } = props;

  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  const [error, setError] = useState(null);
  const [textFieldValue, setTextFieldValue] = useState(value);
  const [isEditing, setEditing] = useState(false);

  const checkNewValueOnChange = (event) => {
    const newValue = event.target.value.trimEnd();
    const error = newValue !== value ? checkValue(newValue) : null;
    setError(error);
  };
  const startEdition = (event) => {
    event.stopPropagation();
    event.preventDefault();
    setEditing(true);
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
        <Grid
          container
          sx={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'nowrap',
          }}
        >
          <FadingTooltip key="scenario-name-tooltip" title={value}>
            <Link data-cy="scenario-view-redirect" component="button" underline="hover" onClick={onClick}>
              <Typography
                sx={{
                  maxWidth: 'max-content',
                  wordBreak: 'break-all',
                  color: (theme) => theme.palette.primary.main,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  textAlign: 'left',
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                }}
                {...typographyProps}
              >
                {value}
              </Typography>
            </Link>
          </FadingTooltip>
          {canRenameScenario && (
            <FadingTooltip title={labels.edit}>
              <IconButton
                data-cy="rename-scenario-button"
                aria-label="rename scenario"
                size="small"
                onClick={startEdition}
              >
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            </FadingTooltip>
          )}
        </Grid>
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
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'stretch',
              '& .MuiOutlinedInput-input': {
                minWidth: '300px',
                marginLeft: '4px',
                padding: '4px',
              },
            }}
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
   * Boolean value defining whether user can rename scenario
   */
  canRenameScenario: PropTypes.bool,
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
    edit: PropTypes.string,
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
