// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React from 'react';
import PropTypes from 'prop-types';
import useStyles from './style';

const _generateAttributeDetails = (classes, labels, attributeName, attributeValue) => {
  const attributeLabel = labels?.attributes?.[attributeName] || attributeName;
  const attributesToIgnore = [
    'label',
    'Label',
    'parent',
    'source',
    'target',
    'asOutEdgeHighlighted',
    'asInEdgeHighlighted',
    'hidden',
  ];
  if (attributesToIgnore.indexOf(attributeName) !== -1) {
    return null;
  }
  if (typeof attributeValue === 'object' && 0 in attributeValue) {
    // List represented as an object
    return (
      <div
        data-cy={`cytoviz-element-attribute-${attributeName.toLowerCase()}`}
        key={attributeName}
        className={classes.attributeColumnContainer}
      >
        <div data-cy="cytoviz-element-attribute-name" className={classes.attributeLabel}>
          {attributeLabel}:
        </div>
        <div data-cy="cytoviz-element-attribute-value" className={classes.tableContainer}>
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
    // Non-list attribute, serialize to JSON
    return (
      <div
        data-cy={`cytoviz-element-attribute-${attributeName.toLowerCase()}`}
        key={attributeName}
        className={classes.attributeRowContainer}
      >
        <span data-cy="cytoviz-element-attribute-name" className={classes.attributeLabel}>
          {attributeLabel}:
        </span>
        <span data-cy="cytoviz-element-attribute-value" className={classes.attributeValue}>
          {JSON.stringify(attributeValue)}
        </span>
      </div>
    );
  }
};

const ElementData = (props) => {
  const classes = useStyles();
  const { data, labels } = props;
  if (!data) {
    return labels.noData;
  }

  let filteredElementAttributes = Object.keys(data)
    .map((key) => _generateAttributeDetails(classes, labels, key, data[key]))
    .filter((el) => el !== null);
  if (filteredElementAttributes.length === 0) {
    filteredElementAttributes = labels.noData;
  }

  return <div className={classes.elementDetailsContainer}>{filteredElementAttributes}</div>;
};

ElementData.propTypes = {
  data: PropTypes.object,
  labels: PropTypes.object,
};

ElementData.defaultProps = {
  data: PropTypes.object,
  labels: {
    attributes: {},
    dictKey: 'Key',
    dictValue: 'Value',
    noData: 'No data to display for this element.',
  },
};

export default ElementData;
