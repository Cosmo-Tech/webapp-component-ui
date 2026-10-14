// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LABELS = {
  header: 'Group members:',
  emptyGroup: 'This group is empty',
  otherMembers: 'other member(s)',
};

const MAX_VISIBLE_USER_COUNT = 20;

export const GroupMembersTooltipContent = ({ members = [], labels: tmpLabels = {} }) => {
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  const isGroupEmpty = members.length === 0;
  const visibleMembers = members.slice(0, MAX_VISIBLE_USER_COUNT);
  const otherMembersCount = members.length - visibleMembers.length;

  return (
    <div>
      {!isGroupEmpty && <div>{labels.header}</div>}
      {isGroupEmpty ? (
        <i>{labels.emptyGroup}</i>
      ) : (
        <>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            {visibleMembers.map((member, index) => (
              <li key={`${member}-${index}`}>{member}</li>
            ))}
          </ul>
          {otherMembersCount > 0 && (
            <div style={{ marginTop: '0.5em' }}>
              <i>
                +{otherMembersCount} {labels.otherMembers}
              </i>
            </div>
          )}
        </>
      )}
    </div>
  );
};

GroupMembersTooltipContent.propTypes = {
  members: PropTypes.arrayOf(PropTypes.string),
  labels: PropTypes.shape({
    header: PropTypes.string,
    emptyGroup: PropTypes.string,
    otherMembers: PropTypes.string,
  }),
};
