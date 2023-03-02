// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardActions,
  Tooltip,
  Fade,
} from '@mui/material';
import { DefaultAvatar } from '../../misc';
import useStyles from './style';

export const ResourceCard = ({ id, name, description, action, style }) => {
  const classes = useStyles();

  const actionButton = action ? (
    <CardActions sx={{ padding: '16px', justifyContent: 'right' }}>
      <Button
        color="primary"
        variant="contained"
        disableElevation
        sx={{ borderRadius: '20px' }}
        onClick={action.callback}
      >
        {action.label}
      </Button>
    </CardActions>
  ) : null;

  return (
    <Card key={id} data-cy={'resource-card-' + id} variant="outlined" className={classes.card} style={style}>
      <CardActionArea sx={{ height: '100%' }}>
        <CardHeader
          data-cy={'resource-header'}
          avatar={<DefaultAvatar size={40} userName={name} variant="rounded" />}
          titleTypographyProps={{ variant: 'body1' }}
          title={name}
        />
        <CardContent data-cy={'resource-content'}>
          <Tooltip
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
            key="resource-description-tooltip"
            title={description ?? ''}
          >
            <div className={classes.description}>
              <Typography noWrap={true} color="textSecondary" variant="body2">
                {description}
              </Typography>
            </div>
          </Tooltip>
        </CardContent>
        {actionButton}
      </CardActionArea>
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

ResourceCard.defaultProps = {
  action: null,
  description: '',
};
