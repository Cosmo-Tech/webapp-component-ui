// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import { Chip, Grid, TextField, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const DEFAULT_LABELS = {
  header: 'Tags',
  placeholder: 'Enter a new tag',
};

const useStyles = makeStyles((theme) => ({
  addTagIcon: {
    width: '16px',
    height: '16px',
  },
}));

export const TagsEditor = (props) => {
  const {
    id = 'tags-editor',
    values: tmpValues,
    readOnly = false,
    onChange = () => {},
    labels: tmpLabels,
    chipProps = {},
    textFieldProps = {},
    editIconProps = {},
    headerStyle = {},
  } = props;
  const classes = useStyles();

  const values = useMemo(() => tmpValues ?? [], [tmpValues]);
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };

  const [isEditing, setIsEditing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const startEdition = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsEditing(true);
  }, []);

  const stopEdition = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    setIsEditing(false);
  }, []);

  const addNewTag = useCallback(
    (newTag) => {
      setIsEditing(false);
      if (newTag.trim().length === 0) return;
      onChange([...values, newTag]);
    },
    [onChange, values]
  );

  const deleteTag = useCallback(
    (removedTagIndex) => {
      const newTags = [...values];
      newTags.splice(removedTagIndex, 1);
      onChange(newTags);
    },
    [onChange, values]
  );

  const newTagInput = useMemo(() => {
    if (readOnly || !isEditing) return null;
    return (
      <TextField
        data-cy="new-tag-textfield"
        sx={{ maxWidth: '150px' }}
        variant="outlined"
        size="small"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            addNewTag(event.target.value);
            event.preventDefault();
          } else if (event.key === 'Escape') {
            stopEdition(event);
          }
        }}
        onBlur={(event) => addNewTag(event.target.value)}
        placeholder={labels.placeholder}
        inputRef={(input) => input && input.focus()}
        {...textFieldProps}
        slotProps={{
          input: { sx: { maxHeight: '25px' } },
          htmlInput: { id: 'new-tag-input' },
        }}
      />
    );
  }, [isEditing, addNewTag, readOnly, stopEdition, labels.placeholder, textFieldProps]);

  const addTagIcon = useMemo(() => {
    if (readOnly || isEditing || !isHovered) return null;
    return (
      <EditIcon data-cy="add-tag" className={classes.addTagIcon} onClick={startEdition} {...editIconProps}></EditIcon>
    );
  }, [readOnly, isEditing, isHovered, classes.addTagIcon, startEdition, editIconProps]);

  return (
    <Grid
      id={id}
      key={id}
      container
      spacing={1}
      sx={{ flexFlow: 'column nowrap', alignItems: 'stretch' }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Grid item>
        <Grid
          container
          sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'nowrap' }}
        >
          <Typography color="textSecondary" sx={{ pr: 1, ...headerStyle }}>
            {labels.header}:
          </Typography>
          {values.length === 0 ? addTagIcon : null}
        </Grid>
      </Grid>
      <Grid item data-cy={`${id}-tags`} sx={{ ml: 1 }}>
        <Grid
          data-cy="tags-container"
          container
          spacing={1}
          sx={{ flexFlow: 'row wrap', alignItems: 'center', gap: 0.5 }}
        >
          {values.map((tag, index) => (
            <Chip
              key={`${id}-tag-${index}`}
              data-cy={`${id}-tag-${index}`}
              label={tag}
              onDelete={readOnly ? null : () => deleteTag(index)}
              color="primary"
              size="small"
              {...chipProps}
            />
          ))}
          {newTagInput}
          {values.length !== 0 ? addTagIcon : null}
        </Grid>
      </Grid>
    </Grid>
  );
};

TagsEditor.propTypes = {
  /**
   * Optional id. Can be useful to identify the component and customize data-cy metadata.
   */
  id: PropTypes.string,
  /**
   * Array of string values, representing the list of tags to edit
   */
  values: PropTypes.arrayOf(PropTypes.string),
  /**
   * Boolean value defining whether tags can be edited
   */
  readOnly: PropTypes.bool,
  /**
   * Callback function called when tags are edited. This function takes a single parameter: the new list of tags
   */
  onChange: PropTypes.func,
  /**
   * Text field Labels
   *
   * Structure:
   * <pre>
   *   {
   *     header: 'string',
   *     placeholder: 'string',
   *   }
   * </pre>
   */
  labels: PropTypes.shape({
    header: PropTypes.string,
    placeholder: PropTypes.string,
  }),
  /**
   * Props to add to Chip items
   */
  chipProps: PropTypes.object,
  /**
   * Props to add to the TextField component used when adding a new tag
   */
  textFieldProps: PropTypes.object,
  /**
   * Props to add to the Icon component used to start the creation of a new tag
   */
  editIconProps: PropTypes.object,
  /**
   * Props to override header style
   */
  headerStyle: PropTypes.object,
};
