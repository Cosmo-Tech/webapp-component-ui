// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { ScenarioNode } from '../../../../cards';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
    padding: theme.spacing(0.5, 1),
    margin: theme.spacing(0.2, 0),
    [`& .${treeItemClasses.label}`]: {
      fontSize: '0.8rem',
      fontWeight: 500,
    },
  },
  [`& .${treeItemClasses.groupTransition}`]: {
    marginLeft: 15,
    paddingLeft: theme.spacing(2),
    borderLeft: `1px dashed ${theme.palette.text.primary}`,
  },
  ...theme.applyStyles('light', {
    color: theme.palette.grey[800],
  }),
}));

// Ignore MUI events in the MUI tree items to prevent keyboard navigation based on scenario names (this feature breaks
// input fields in the scenario node cards, plus the scenario manager view renders several trees, which means users
// can't navigate to all scenarios with only keyboard anyway)
const ignoreMuiEvents = (event) => (event.defaultMuiPrevented = true);

export const ScenarioSortableTree = ({
  treeExpandedNodes,
  setTreeExpandedNodes,
  detailExpandedNodes,
  setDetailExpandedNodes,
  scenarioTree,
}) => {
  const toggleNodeAccordionState = (scenarioId, newIsExpanded) => {
    if (newIsExpanded) setDetailExpandedNodes((prevNodeIds) => [...prevNodeIds, scenarioId]);
    else setDetailExpandedNodes((prevNodeIds) => prevNodeIds.filter((nodeId) => nodeId !== scenarioId));
  };

  const formatScenarioTreeNodeToRtsNode = (scenarioTreeNode) => {
    const { scenarioNodeProps, children: treeNodeChildren } = scenarioTreeNode;

    const itemId = scenarioTreeNode.id;
    const itemLabel = (
      <ScenarioNode
        isExpanded={detailExpandedNodes.includes(itemId)}
        setIsExpanded={(newIsExpanded) => toggleNodeAccordionState(itemId, newIsExpanded)}
        {...scenarioNodeProps}
      />
    );

    if (treeNodeChildren && treeNodeChildren.length > 0) {
      const children = treeNodeChildren.map((treeNodeChild) => formatScenarioTreeNodeToRtsNode(treeNodeChild));

      return (
        <CustomTreeItem key={itemId} itemId={itemId} label={itemLabel} onKeyDown={ignoreMuiEvents}>
          {children}
        </CustomTreeItem>
      );
    }

    return <CustomTreeItem key={itemId} itemId={itemId} label={itemLabel} onKeyDown={ignoreMuiEvents} />;
  };

  const [treeData, setTreeData] = useState([formatScenarioTreeNodeToRtsNode(scenarioTree)]);

  useEffect(() => {
    setTreeData([formatScenarioTreeNodeToRtsNode(scenarioTree)]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarioTree, detailExpandedNodes]);

  return (
    <Paper
      key={scenarioTree.id}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        margin: '12px',
        padding: '16px',
        width: '65%',
        ...(scenarioTree.children.length !== 0
          ? {}
          : {
              // FIXME: class below is no longer used since replacing RST
              '& .rst__lineBlock': {
                width: '0px !important',
                marginLeft: '43px', // Need 43px to align left side with scenarios that have children
              },
            }),
      }}
    >
      <SimpleTreeView
        disableSelection
        expandedItems={treeExpandedNodes}
        onExpandedItemsChange={(event, itemIds) => setTreeExpandedNodes(itemIds)}
        expansionTrigger="iconContainer"
      >
        {treeData}
      </SimpleTreeView>
    </Paper>
  );
};

ScenarioSortableTree.propTypes = {
  /**
   * array of ids of the scenarios with children tree collapsed
   */
  treeExpandedNodes: PropTypes.array.isRequired,
  setTreeExpandedNodes: PropTypes.func.isRequired,
  /**
   * array of ids of the scenarios with accordion details expanded
   */
  detailExpandedNodes: PropTypes.array.isRequired,
  setDetailExpandedNodes: PropTypes.func.isRequired,
  /**
   * tree of scenario
   */
  scenarioTree: PropTypes.object.isRequired,
};
