// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { Grid, Stack, TextField, Typography } from '@mui/material';

const DEFAULT_LABELS = {
  label: 'Description',
  placeholder: 'Description of you scenario',
};
export const DescriptionEditor = (props) => {
  const { onChange, readOnly = false, value = '', labels: tmpLabels } = props;

  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [descriptionText, setDescriptionText] = useState(value);

  useEffect(() => {
    if (value !== descriptionText) setDescriptionText(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const startEdition = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsEditing(true);
  }, []);

  const cancelEdition = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsEditing(false);
  }, []);

  const stopEdition = useCallback(
    (event) => {
      event.stopPropagation();
      event.preventDefault();
      setIsEditing(false);

      if (onChange && event.target.value !== value) {
        onChange(event.target.value);
      }
    },
    [onChange, value]
  );
  const editIcon = useMemo(() => {
    if (readOnly || isEditing || !isHovered) return null;
    return <EditIcon data-cy="edit-scenario-description" onClick={startEdition} fontSize="inherit" />;
  }, [readOnly, isEditing, isHovered, startEdition]);

  const description = useMemo(() => {
    if (readOnly || !isEditing)
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
          <Typography
            data-cy={'scenario-description-disabled'}
            sx={{
              maxHeight: '75px',
              overflowY: 'auto',
            }}
            onClick={startEdition}
            gutterBottom={true}
          >
            {descriptionText ?? ''}
          </Typography>
        </Grid>
      );

    return (
      <TextField
        data-cy={'scenario-description'}
        variant="outlined"
        fullWidth={true}
        multiline
        rows={3}
        value={descriptionText ?? ''}
        onChange={(event) => setDescriptionText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            cancelEdition(event);
            setDescriptionText(value);
          } else if (event.ctrlKey && event.key === 'Enter') {
            stopEdition(event);
          }
        }}
        onBlur={stopEdition}
        placeholder={labels.placeholder}
        inputRef={(input) => input && input.focus()}
        inputProps={{ id: 'description-input' }}
      />
    );
  }, [isEditing, readOnly, descriptionText, value, startEdition, stopEdition, cancelEdition, labels.placeholder]);

  return (
    <Stack spacing={0} onMouseOver={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Typography sx={{ fontWeight: '700' }}>
        {labels.label} {editIcon}
      </Typography>
      {description}
    </Stack>
  );
};

DescriptionEditor.propTypes = {
  /**
   * Callback function called when description is edited. This function takes a single parameter:
   * a string representing the new description
   */
  onChange: PropTypes.func,
  /**
   * Boolean value defining whether description can be edited
   */
  readOnly: PropTypes.bool,
  /**
   * String representing the description of a scenario
   */
  value: PropTypes.string,
  /**
   * Labels
   *
   * Structure:
   * <pre>
   *   {
   *     label: 'string',
   *     placeholder: 'string',
   *   }
   * </pre>
   */
  labels: PropTypes.shape({
    label: PropTypes.string,
    placeholder: PropTypes.string,
  }),
};
