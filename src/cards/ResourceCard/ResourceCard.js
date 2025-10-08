// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Button, Card, CardHeader, CardContent, CardActions } from '@mui/material';
import { DefaultAvatar } from '../../misc';

export const ResourceCard = ({ id, name, description = '', action = null, style }) => {
  const actionButton = action ? (
    <CardActions>
      <Button color="primary" variant="contained" fullWidth={true} onClick={action.callback}>
        {action.label}
      </Button>
    </CardActions>
  ) : null;

  return (
    <Card
      key={id}
      data-cy={'resource-card-' + id}
      elevation={1}
      sx={{
        height: '100%',
        width: '320px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        ...style,
      }}
    >
      <CardHeader
        data-cy={'resource-header'}
        avatar={<DefaultAvatar size={40} userName={name} variant="rounded" />}
        titleTypographyProps={{ variant: 'body1' }}
        title={name}
      />
      <CardContent data-cy={'resource-content'}>
        <div style={{ height: '70px', overflow: 'auto' }}>
          <Typography color="textSecondary" variant="body2">
            {description}
          </Typography>
        </div>
      </CardContent>
      {actionButton}
    </Card>
  );
};

ResourceCard.propTypes = {
  /**
   * Resource id
   */
  id: PropTypes.string.isRequired,
  /**
   * Resource name
   */
  name: PropTypes.string.isRequired,
  /**
   * Resource description
   */
  description: PropTypes.string,
  /**
   *  Action.
   *
   *  Structure:
   * <pre>
   *   {
        label: 'string',
        callback: 'func',
   *   }
   * </pre>
   */
  action: PropTypes.shape({
    label: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
  }),
  /**
   * Style override
   */
  style: PropTypes.object,
};
