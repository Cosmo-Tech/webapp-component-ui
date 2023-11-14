// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import SortableTree from '@nosferatu500/react-sortable-tree';
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import clsx from 'clsx';
import { ScenarioNode } from '../../../../cards/ScenarioNode/ScenarioNode';
import { SHRUNK_NODE_HEIGHT, EXPANDED_NODE_HEIGHT } from '../../../../cards/ScenarioNode/constants';

export const ScenarioSortableTree = ({
  nodesExpandedChildrenRef,
  nodesExpandedDetailsRef,
  scenarioTree,
  classes,
  refreshTick,
}) => {
  const [nodesExpandedChildren, setNodesExpandedChildren] = useState(nodesExpandedChildrenRef.current);
  const [nodesExpandedDetails, setNodesExpandedDetails] = useState(nodesExpandedDetailsRef.current);

  const changeNodesExpandedChildren = ({ node, expanded }) => {
    const newValue = {
      ...nodesExpandedChildrenRef.current,
      [node.id]: expanded,
    };
    nodesExpandedChildrenRef.current = newValue;
    setNodesExpandedChildren(newValue);
  };

  const changeNodesExpandedDetails = (scenarioId, expanded) => {
    const newValue = {
      ...nodesExpandedDetailsRef.current,
      [scenarioId]: expanded,
    };
    nodesExpandedDetailsRef.current = newValue;
    setNodesExpandedDetails(newValue);
  };

  const formatScenarioTreeNodeToRtsNode = (scenarioTreeNode) => {
    const { scenarioNodeProps, children: treeNodeChildren, ...rtsScenario } = scenarioTreeNode;

    rtsScenario.expanded = nodesExpandedChildren[rtsScenario.id];
    rtsScenario.expandedDetail = nodesExpandedDetails[rtsScenario.id];
    rtsScenario.title = (
      <ScenarioNode
        isExpanded={nodesExpandedDetails[rtsScenario.id]}
        setIsExpanded={(newIsExpanded) => changeNodesExpandedDetails(rtsScenario.id, newIsExpanded)}
        {...scenarioNodeProps}
      />
    );

    if (treeNodeChildren && treeNodeChildren.length > 0) {
      rtsScenario.children = treeNodeChildren.map((treeNodeChild) => formatScenarioTreeNodeToRtsNode(treeNodeChild));
    }

    return rtsScenario;
  };

  const [treeData, setTreeData] = useState(formatScenarioTreeNodeToRtsNode(scenarioTree));

  const updateTreeData = () => {
    setTreeData(formatScenarioTreeNodeToRtsNode(scenarioTree));
  };

  const refreshTickOnLoad = useRef(refreshTick);
  useEffect(() => {
    // prevent double render on load
    if (refreshTick !== refreshTickOnLoad.current) {
      setNodesExpandedChildren(nodesExpandedChildrenRef.current);
      setNodesExpandedDetails(nodesExpandedDetailsRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTick]);

  useEffect(() => {
    updateTreeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioTree, nodesExpandedChildren, nodesExpandedDetails]);

  const generateNodeProps = () => {
    return {
      className: classes.scenarioCard,
    };
  };

  const ignoreEvent = (event) => {
    event.preventDefault();
  };

  return (
    <Paper
      key={scenarioTree.id}
      className={clsx(classes.treeContainer, {
        [classes.rootScenarioHiddenLineBlock]: scenarioTree.children.length === 0,
      })}
      onDragEnter={ignoreEvent}
      onDragOver={ignoreEvent}
      onDrop={ignoreEvent}
    >
      <SortableTree
        treeData={[treeData]}
        generateNodeProps={generateNodeProps}
        getNodeKey={({ node }) => node.id}
        onVisibilityToggle={changeNodesExpandedChildren}
        canDrag={false}
        onChange={() => null}
        canDrop={() => false}
        isVirtualized={false} // Required to prevent bug when rowHeight is a function
        rowHeight={({ treeIndex, node, path }) => {
          return 12 + (node.expandedDetail ? EXPANDED_NODE_HEIGHT : SHRUNK_NODE_HEIGHT);
        }}
      />
    </Paper>
  );
};

ScenarioSortableTree.propTypes = {
  /**
   * react ref object contains all nodes with children expended
   */
  nodesExpandedChildrenRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  /**
   * react ref object contains all nodes details expended
   */
  nodesExpandedDetailsRef: PropTypes.shape({ current: PropTypes.any }).isRequired,
  /**
   * classes for styles
   */
  classes: PropTypes.object.isRequired,
  /**
   * tree of scenario
   */
  scenarioTree: PropTypes.object.isRequired,
  /**
   * a refresh tick number for force tree to refresh by refs values
   */
  refreshTick: PropTypes.number.isRequired,
};
