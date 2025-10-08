// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const _formatAsPercentage = (val) => {
  return (val * 100).toFixed(1) + '%';
};

const _countElementsWithAttribute = (cytoElements, attributeKey) => {
  return cytoElements.filter((element) => element.data(attributeKey)).length;
};

const _getElementsCount = (elemCount, hiddenFractionCount, elemName) => {
  return (
    <p>
      {elemName}: {elemCount}
      {hiddenFractionCount > 0 ? ` ( ${_formatAsPercentage(hiddenFractionCount / elemCount)} hidden)` : ''}
    </p>
  );
};

const StyledDiv = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  top: '15px',
  textAlign: 'right',
  right: '15px',
  position: 'absolute',
  'z-index': '7',
}));

const StatsHUD = (props) => {
  const { cytoAsState } = props;
  const hiddenParamName = 'hidden';
  const compoundsCount = cytoAsState.nodes().parent().length;
  const childrenCount = cytoAsState.nodes().nonorphans().length;
  const notCompoundNodes = cytoAsState
    .nodes()
    .nonorphans()
    .union(cytoAsState.nodes().orphans())
    .subtract(cytoAsState.nodes().parent());
  const edgesCount = cytoAsState.edges().length;
  const hiddenCompounds = _countElementsWithAttribute(cytoAsState.nodes().parent(), hiddenParamName);
  const hiddenNodesCount = _countElementsWithAttribute(notCompoundNodes, hiddenParamName);
  const hiddenEdgesCount = _countElementsWithAttribute(cytoAsState.edges(), hiddenParamName);

  return (
    <StyledDiv>
      {_getElementsCount(compoundsCount, hiddenCompounds, 'compounds')}
      {childrenCount / notCompoundNodes.length > 0
        ? `${_formatAsPercentage(childrenCount / notCompoundNodes.length)} of all nodes are inside compounds`
        : null}
      {_getElementsCount(notCompoundNodes.length, hiddenNodesCount, 'nodes')}
      {_getElementsCount(edgesCount, hiddenEdgesCount, 'edges')}
    </StyledDiv>
  );
};

StatsHUD.propTypes = {
  cytoAsState: PropTypes.object.isRequired,
};

export default StatsHUD;
