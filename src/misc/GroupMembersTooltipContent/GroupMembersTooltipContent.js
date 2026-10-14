// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LABELS = {
  header: 'Group members:',
  emptyGroup: 'This group is empty',
};

export const GroupMembersTooltipContent = ({ members = [], labels: tmpLabels = {} }) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const isGroupEmpty = members.length === 0;

  return (
    <div>
      {!isGroupEmpty && <div>{labels.header}</div>}
      {isGroupEmpty ? (
        <i>{labels.emptyGroup}</i>
      ) : (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {members.map((member, index) => (
            <li key={`${member}-${index}`}>{member}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

GroupMembersTooltipContent.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.shape({
    header: PropTypes.string,
    emptyGroup: PropTypes.string,
  }),
};
