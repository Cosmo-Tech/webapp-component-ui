// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledTable = styled('table')(({ theme }) => ({
  margin: '5px',
  border: `1px solid ${theme.palette.text.primary}`,
  borderCollapse: 'collapse',
}));
const StyledTableHeader = styled('th')(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  padding: '5px',
}));
const StyledTableDataCell = styled('td')(({ theme }) => ({
  border: `1px solid ${theme.palette.text.primary}`,
  padding: '5px',
}));

const _generateAttributeDetails = (labels, attributeName, attributeValue) => {
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
        style={{ margin: '4px', display: 'flex', flexDirection: 'column' }}
      >
        <div data-cy="cytoviz-element-attribute-name" style={{ marginRight: '4px', fontWeight: 'bold' }}>
          {attributeLabel}:
        </div>
        <div data-cy="cytoviz-element-attribute-value" style={{ margin: '4px' }}>
          <StyledTable>
            <thead>
              <tr>
                <StyledTableHeader>{labels.dictKey}</StyledTableHeader>
                <StyledTableHeader>{labels.dictValue}</StyledTableHeader>
              </tr>
            </thead>
            <tbody>
              {Object.keys(attributeValue).map((key) => (
                <tr key={key}>
                  <StyledTableDataCell>{key}</StyledTableDataCell>
                  <StyledTableDataCell>{attributeValue[key]}</StyledTableDataCell>
                </tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </div>
    );
  } else {
    // Non-list attribute, serialize to JSON
    return (
      <div
        data-cy={`cytoviz-element-attribute-${attributeName.toLowerCase()}`}
        key={attributeName}
        style={{
          margin: '4px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <span data-cy="cytoviz-element-attribute-name" style={{ marginRight: '4px', fontWeight: 'bold' }}>
          {attributeLabel}:
        </span>
        <span data-cy="cytoviz-element-attribute-value">{JSON.stringify(attributeValue)}</span>
      </div>
    );
  }
};

const DEFAULT_LABELS = {
  attributes: {},
  dictKey: 'Key',
  dictValue: 'Value',
  noData: 'No data to display for this element.',
};

const getSortedAttributeNames = (expectedKeys, allKeys) => {
  // Start with expected keys in desired order
  const sortedKeys = expectedKeys.filter((key) => allKeys.includes(key));
  allKeys.filter((key) => !expectedKeys.includes(key)).forEach((key) => sortedKeys.push(key)); // Add unknown keys
  return sortedKeys;
};

const ElementData = (props) => {
  const { data = {}, labels: tmpLabels, metadata = {}, type } = props;
  const labels = { ...DEFAULT_LABELS, ...tmpLabels };
  if (!data) return labels.noData;

  const attributesOrderConfig = metadata?.attributesOrder;
  const desiredAttributesOrder = type && (attributesOrderConfig?.nodes?.[type] ?? attributesOrderConfig?.edges?.[type]);

  let sortedElementAttributeNames = Object.keys(data);
  if (desiredAttributesOrder != null)
    sortedElementAttributeNames = getSortedAttributeNames(desiredAttributesOrder, Object.keys(data));

  let filteredElementAttributes = sortedElementAttributeNames
    .map((key) => _generateAttributeDetails(labels, key, data[key]))
    .filter((el) => el !== null);
  if (filteredElementAttributes.length === 0) {
    filteredElementAttributes = labels.noData;
  }

  return <div style={{ display: 'flex', flexDirection: 'column' }}>{filteredElementAttributes}</div>;
};

ElementData.propTypes = {
  data: PropTypes.object,
  labels: PropTypes.object,
  metadata: PropTypes.object,
  type: PropTypes.string,
};

export default ElementData;
