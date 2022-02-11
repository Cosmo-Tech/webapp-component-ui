// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';

const _generateAttributeDetails = (classes, attributeName, attributeValue) => {
  const attributesToIgnore = ['label', 'Label', 'parent'];
  if (attributesToIgnore.indexOf(attributeName) !== -1) {
    return null;
  }
  if (typeof attributeValue === 'object' && 0 in attributeValue) {
    // List represented as an object
    return (
      <div key={attributeName} className={classes.attributeColumnContainer}>
        <div className={classes.attributeLabel}>{attributeName}:</div>
        <div className={classes.tableContainer}>
          <table className={classes.table}>
            <thead>
              <tr>
                <th className={classes.th}>Iteration</th>
                <th className={classes.th}>Value</th>
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
        <span className={classes.attributeLabel}>{attributeName}:</span>
        <span className={classes.attributeValue}>{JSON.stringify(attributeValue)}</span>
      </div>
    );
  }
};

const NodeData = (props) => {
  const classes = useStyles();
  const { data } = props;
  if (!data) {
    return 'No data to display for this node.';
  }

  return (
    <div className={classes.nodeDetailsContainer}>
      {Object.keys(data).map((key) => _generateAttributeDetails(classes, key, data[key]))}
    </div>
  );
};

NodeData.propTypes = {
  data: PropTypes.object,
};

export default NodeData;
