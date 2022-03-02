// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';

const _generateAttributeDetails = (classes, labels, attributeName, attributeValue) => {
  const attributeLabel = labels?.attributes?.[attributeName] || attributeName;
  const attributesToIgnore = ['label', 'Label', 'parent', 'source', 'target'];
  if (attributesToIgnore.indexOf(attributeName) !== -1) {
    return null;
  }
  if (typeof attributeValue === 'object' && 0 in attributeValue) {
    // List represented as an object
    return (
      <div key={attributeName} className={classes.attributeColumnContainer}>
        <div className={classes.attributeLabel}>{attributeLabel}:</div>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th}>{labels.dictKey}</th>
                <th className={classes.th}>{labels.dictValue}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(attributeValue).map((key) => (
                <tr key={key}>
                  <td className={classes.td}>{key}</td>
                  <td className={classes.td}>{attributeValue[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    // List represented as an object
    return (
      <div key={attributeName} className={classes.attributeRowContainer}>
        <span className={classes.attributeLabel}>{attributeLabel}:</span>
        <span className={classes.attributeValue}>{JSON.stringify(attributeValue)}</span>
      </div>
    );
  }
};

const NodeData = (props) => {
  const classes = useStyles();
  const { data, labels } = props;
  if (!data) {
    return 'No data to display for this node.';
  }

  return (
    <div className={classes.nodeDetailsContainer}>
      {Object.keys(data).map((key) => _generateAttributeDetails(classes, labels, key, data[key]))}
    </div>
  );
};

NodeData.propTypes = {
  data: PropTypes.object,
  labels: PropTypes.object,
};

NodeData.defaultProps = {
  data: PropTypes.object,
  labels: {
    dictKey: 'Key',
    dictValue: 'Value',
    attributes: {},
  },
};

export default NodeData;
