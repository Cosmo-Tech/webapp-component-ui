// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton, Paper, TextField } from '@material-ui/core';
import {
  UnfoldMore as UnfoldMoreIcon,
  UnfoldLess as UnfoldLessIcon,
  AccountTree as AccountTreeIcon,
} from '@material-ui/icons';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree from '@nosferatu500/react-sortable-tree';
import { ScenarioUtils } from '@cosmotech/core';
import useStyles from './style';
import { ScenarioNode } from '../../cards';
import { FadingTooltip } from '../../misc';
import { SHRUNK_NODE_HEIGHT, EXPANDED_NODE_HEIGHT } from '../../cards/ScenarioNode/constants';

const initNodesDict = (scenarios, defaultExpanded) => {
  const nodesDict = {};
  scenarios.forEach((scenario) => {
    nodesDict[scenario.id] = defaultExpanded;
  });
  return nodesDict;
};

const filterMatchesName = (scenario, searchStr) => scenario.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
const filterMatchesValidationStatus = (labels, scenario, searchStr) => {
  if (!scenario.validationStatus) return false;
  const validationStatusLabel = labels.validationStatus?.[scenario.validationStatus.toLowerCase()]?.toLowerCase();
  return validationStatusLabel && validationStatusLabel.indexOf(searchStr.toLowerCase()) !== -1;
};
const filterMatchesRunStatus = (labels, scenario, searchStr) => {
  if (!scenario.state) return false;
  const runStatusLabel = labels?.[scenario.state.toLowerCase()]?.toLowerCase();
  return runStatusLabel && runStatusLabel.indexOf(searchStr.toLowerCase()) !== -1;
};

export const ScenarioManagerTreeList = (props) => {
  const classes = useStyles();
  const {
    datasets,
    scenarios,
    onScenarioRedirect,
    deleteScenario,
    onScenarioRename,
    checkScenarioNameValue,
    moveScenario,
    userId,
    buildSearchInfo,
    buildDatasetInfo,
    labels,
    buildScenarioNameToDelete,
    showDeleteIcon,
    canUserDeleteScenario,
    canUserRenameScenario,
  } = props;
  if (buildSearchInfo) {
    console.warn(
      '"buildSearchInfo" prop is deprecated in ScenarioManagerTreeList. Please consider removing this prop.'
    );
  }
  if (showDeleteIcon != null) {
    console.warn(
      '"showDeleteIcon" prop is deprecated in ScenarioManagerTreeList. Please use "canUserDeleteScenario" instead.'
    );
  }

  // Memoize the full scenarios tree in a ReactSortableTree-compatible format
  const [searchText, setSearchText] = useState('');
  const [nodesExpandedChildren, setNodesExpandedChildren] = useState(initNodesDict(scenarios, true));
  const [nodesExpandedDetails, setNodesExpandedDetails] = useState(initNodesDict(scenarios, false));

  const collapseAll = () => {
    setNodesExpandedChildren(initNodesDict(scenarios, false));
    setNodesExpandedDetails(initNodesDict(scenarios, false));
  };
  const expandTree = () => {
    setNodesExpandedChildren(initNodesDict(scenarios, true));
    setNodesExpandedDetails(initNodesDict(scenarios, false));
  };
  const expandAll = () => {
    setNodesExpandedChildren(initNodesDict(scenarios, true));
    setNodesExpandedDetails(initNodesDict(scenarios, true));
  };

  const changeNodesExpandedChildren = ({ node, expanded }) => {
    setNodesExpandedChildren({
      ...nodesExpandedChildren,
      [node.id]: expanded,
    });
  };
  const changeNodesExpandedDetails = (scenarioId, newIsExpanded) => {
    setNodesExpandedDetails({
      ...nodesExpandedDetails,
      [scenarioId]: newIsExpanded,
    });
  };

  const formatScenariosToRSTList = (treeScenarios) => {
    const rstScenarios = treeScenarios.map((scenario) => {
      // For retro-compatibility, canUserDeleteScenario not defined is equivalent to showDeleteIcon = true
      const displayDeleteIcon =
        canUserDeleteScenario != null
          ? canUserDeleteScenario(scenario)
          : showDeleteIcon !== false && scenario.ownerId === userId;

      labels.dataset = buildDatasetInfo(scenario.datasetList);
      return {
        expanded: nodesExpandedChildren[scenario.id],
        parentId: scenario.parentId,
        id: scenario.id,
        name: scenario.name,
        title: (
          <ScenarioNode
            isExpanded={nodesExpandedDetails[scenario.id]}
            setIsExpanded={(newIsExpanded) => changeNodesExpandedDetails(scenario.id, newIsExpanded)}
            datasets={datasets}
            scenario={scenario}
            showDeleteIcon={displayDeleteIcon}
            onScenarioRedirect={onScenarioRedirect}
            deleteScenario={deleteScenario}
            checkScenarioNameValue={checkScenarioNameValue}
            canRenameScenario={canUserRenameScenario(scenario)}
            onScenarioRename={onScenarioRename}
            labels={labels}
            buildScenarioNameToDelete={buildScenarioNameToDelete}
          />
        ),
      };
    });
    return ScenarioUtils.getScenarioTree(rstScenarios, (scenA, scenB) => scenA.name.localeCompare(scenB.name));
  };

  const rstScenarios = useMemo(
    () => formatScenariosToRSTList(scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [datasets, scenarios, labels, nodesExpandedDetails, nodesExpandedChildren]
  );

  const [treeData, setTreeData] = useState(rstScenarios);

  // On scenarios list update, re-apply current filter on the new list of scenarios
  useEffect(() => {
    filterScenarios(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios, searchText, labels, nodesExpandedDetails, nodesExpandedChildren]);

  const filterScenarios = (searchStr) => {
    // Reset scenario list if search field is empty
    if (!searchStr || searchStr.length === 0) {
      setTreeData(rstScenarios);
      return;
    }
    // Otherwise, filter scenarios based on their name
    const filtered = scenarios.filter(
      (scenario) =>
        filterMatchesName(scenario, searchStr) ||
        filterMatchesValidationStatus(labels, scenario, searchStr) ||
        filterMatchesRunStatus(labels, scenario, searchStr)
    );
    // Format list and set as tree data
    setTreeData(formatScenariosToRSTList(filtered));
  };

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
    filterScenarios(event.target.value);
  };

  const generateNodeProps = ({ node, path }) => {
    return {
      className: classes.scenarioCard,
    };
  };

  const changeTreeDataAtIndex = (newDataIndex, newTreeData) => {
    setTreeData(
      treeData.map((treeElement, elementIndex) =>
        newDataIndex === elementIndex ? newTreeData[0] : treeData[elementIndex]
      )
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <TextField
          data-cy="scenario-manager-search-field"
          id="standard-search"
          variant="outlined"
          label={labels.searchField}
          type="search"
          className={classes.searchField}
          value={searchText}
          onChange={onSearchTextChange}
          color="primary"
        />
        <div className={classes.toolbar}>
          <FadingTooltip title={labels?.toolbar?.collapseAll || 'Collapse all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={collapseAll}>
              <UnfoldLessIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandAll || 'Expand all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandAll}>
              <UnfoldMoreIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandTree || 'Expand tree'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandTree}>
              <AccountTreeIcon color="primary" />
            </IconButton>
          </FadingTooltip>
        </div>
      </div>
      <div data-cy="scenario-manager-view" className={classes.treesContainer}>
        {treeData.map((rootScenario, rootScenarioIndex) => {
          return (
            <Paper
              key={rootScenario.id}
              className={clsx(classes.treeContainer, {
                [classes.rootScenarioHiddenLineBlock]: rootScenario.children.length === 0,
              })}
              onDragEnter={ignoreEvent}
              onDragOver={ignoreEvent}
              onDrop={ignoreEvent}
            >
              <SortableTree
                treeData={[rootScenario]}
                generateNodeProps={generateNodeProps}
                onChange={(newData) => changeTreeDataAtIndex(rootScenarioIndex, newData)}
                getNodeKey={({ node }) => node.id}
                onMoveNode={(moveData) => {
                  moveScenario(moveData);
                }}
                onVisibilityToggle={changeNodesExpandedChildren}
                canDrag={false}
                canDrop={() => false}
                isVirtualized={false} // Required to prevent bug when rowHeight is a function
                rowHeight={({ treeIndex, node, path }) => {
                  return 12 + (nodesExpandedDetails[node.id] ? EXPANDED_NODE_HEIGHT : SHRUNK_NODE_HEIGHT);
                }}
              />
            </Paper>
          );
        })}
      </div>
    </div>
  );
};

ScenarioManagerTreeList.propTypes = {
  /**
   * Datasets list
   */
  datasets: PropTypes.array.isRequired,
  /**
   * Scenarios list
   */
  scenarios: PropTypes.array.isRequired,
  /**
   * Function bound to redirect to scenario view with matching current scenario
   */
  onScenarioRedirect: PropTypes.func,
  /**
   * Function bound to handle a scenario deletion
   */
  deleteScenario: PropTypes.func.isRequired,
  /**
   * Function to handle scenario renaming
   */
  onScenarioRename: PropTypes.func.isRequired,
  /**
   * Function to check potential errors in scenario new name
   */
  checkScenarioNameValue: PropTypes.func,
  /**
   * Function bound to handle a scenario movement (moving a scenario = changing its parent)
   */
  moveScenario: PropTypes.func.isRequired,
  /**
   * Current user id
   */
  userId: PropTypes.string.isRequired,
  /**
   * DEPRECATED: Function building scenario search label
   */
  buildSearchInfo: PropTypes.func,
  /**
   * Function building scenario dataset label
   */
  buildDatasetInfo: PropTypes.func.isRequired,
  /**
   * DEPRECATED: this prop is deprecated, use 'canUserDeleteScenario' instead
   * Boolean value to define whether or not scenario delete buttons must be shown in ScenarioNode elements:
   *  - false: delete buttons are always hidden
   *  - true: delete buttons are shown if the user id matches the scenario owner id
   */
  showDeleteIcon: PropTypes.bool,
  /**
   * Function returning whether or not the current user can delete a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserDeleteScenario: PropTypes.func,
  /**
   * Function returning whether or not the current user can rename a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserRenameScenario: PropTypes.func,
  /**
   * Structure
   * <pre>
   {
    status: 'string',
    successful: 'string',
    running: 'string',
    failed: 'string',
    created: 'string',
    delete: 'string',
    redirect: 'string',
    scenarioRename: {
      title: 'string'
      errors: {
        emptyScenarioName: 'string'
        forbiddenCharsInScenarioName: 'string'
      },
    },
    dataset: 'string',
    searchField: 'string',
    toolbar : {
      expandAll: 'string',
      expantTree: 'string'
      collapseAll: 'string',
    }
  }
   * </pre>
   */
  labels: PropTypes.object,
  /**
   * Function to store the scenario's name selected for delete, used in confirmation dialog
   */
  buildScenarioNameToDelete: PropTypes.func.isRequired,
};

ScenarioManagerTreeList.defaultProps = {
  onScenarioRedirect: null,
  labels: {
    status: 'Run status',
    successful: 'Successful',
    running: 'Running',
    failed: 'Failed',
    created: 'Created',
    delete: 'Delete this scenario',
    redirect: 'Redirect to scenario view',
    scenarioRename: {
      title: 'Scenario name',
      errors: {
        emptyScenarioName: 'Scenario name cannot be empty',
        forbiddenCharsInScenarioName:
          'Scenario name has to start with a letter, and can only contain ' +
          'letters, digits, spaces, underscores, hyphens and dots.',
      },
    },
    dataset: 'Dataset',
    searchField: 'Filter',
    toolbar: {
      expandAll: 'Expand all',
      expandTree: 'Expand tree',
      collapseAll: 'Collapse all',
    },
    validationStatus: {
      rejected: 'Rejected',
      validated: 'Validated',
    },
  },
  checkScenarioNameValue: () => null,
  canUserRenameScenario: () => true,
};

// Function to ignore drag & drop events in the parent div, to prevent
// some behaviors such as text drag & drop opening a new tab in the browser
const ignoreEvent = (event) => {
  event.preventDefault();
};
