// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { SimpleTreeView, TreeItem, treeItemClasses } from '@mui/x-tree-view';
import { ScenarioNode } from '../../../../cards';

const CustomTreeItem = styled(TreeItem)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  const cardBg = isDark ? alpha(theme.palette.background.paper, 0.9) : theme.palette.grey[50];
  const cardBorder = alpha(theme.palette.common.white, isDark ? 0.08 : 0.2);

  const bracketColor = alpha(isDark ? theme.palette.common.white : theme.palette.text.primary, 0.18);

  return {
    [`& .${treeItemClasses.content}`]: {
      borderRadius: theme.spacing(0.5),
      padding: theme.spacing(0.5, 1),
      margin: theme.spacing(0.2, 0),
      border: `1px solid ${cardBorder}`,

      // Horizontal “bracket” line from the left rail into the card
      '&::before': {
        content: '""',
        position: 'absolute',
        left: -18,
        top: '50%',
        width: 18,
        borderBottom: `1px solid ${bracketColor}`,
        transform: 'translateY(-50%)',
      },
    },
    // Remove horizontal connector for root level
    '&[data-tree-item-level="0"]': {
      [`& > .${treeItemClasses.content}::before`]: {
        borderBottom: 'none',
      },
    },

    // Subtle interaction states
    [`& .${treeItemClasses.content}:hover`]: {
      backgroundColor: alpha(cardBg, isDark ? 0.9 : 0.96),
      boxShadow: theme.shadows[2],
    },

    [`&.${treeItemClasses.focused} > .${treeItemClasses.content}`]: {
      outline: `1px solid ${alpha(theme.palette.primary.main, 0.7)}`,
      outlineOffset: 1,
      boxShadow: theme.shadows[3],
    },

    [`&.${treeItemClasses.selected} > .${treeItemClasses.content}`]: {
      backgroundColor: alpha(theme.palette.primary.main, 0.18),
      borderColor: alpha(theme.palette.primary.main, 0.6),
    },

    // Vertical bracket rail for children
    [`& .${treeItemClasses.groupTransition}`]: {
      marginLeft: 18,
      paddingLeft: theme.spacing(2),
      borderLeft: `1px solid ${bracketColor}`,
    },
  };
});

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
