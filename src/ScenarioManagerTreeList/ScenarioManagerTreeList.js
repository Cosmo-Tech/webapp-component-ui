// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree from '@nosferatu500/react-sortable-tree';
import { ScenarioUtils } from '@cosmotech/core';
import { ScenarioNode } from './components';
import useStyles from './style';

export const ScenarioManagerTreeList = (props) => {
  const classes = useStyles();
  const {
    datasets,
    scenarios,
    deleteScenario,
    moveScenario,
    userId,
    buildSearchInfo,
    buildDatasetInfo,
    labels
  } = props;

  // Memoize the full scenarios tree in a ReactSortableTree-compatible format
  const expandedNodes = useRef([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rstScenarios = useMemo(() => formatScenariosToRSTList(scenarios), [datasets, scenarios, labels]);

  const [searchText, setSearchText] = useState('');
  const [treeData, setTreeData] = useState(rstScenarios);

  // On scenarios list update, re-apply current filter on the new list of scenarios
  useEffect(() => {
    filterScenarios(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios, searchText, labels]);

  function formatScenariosToRSTList (treeScenarios) {
    const rstScenarios = treeScenarios.map((scenario) => {
      const showDeleteIcon = scenario.ownerId === userId;
      labels.dataset = buildDatasetInfo(scenario.datasetList);
      return {
        expanded: expandedNodes.current[scenario.id] || false,
        parentId: scenario.parentId,
        id: scenario.id,
        name: scenario.name,
        title: <ScenarioNode
          datasets={datasets}
          scenario={scenario}
          showDeleteIcon={showDeleteIcon}
          deleteScenario={deleteScenario}
          labels={labels}
        />
      };
    });
    return ScenarioUtils.getScenarioTree(rstScenarios, (scenA, scenB) => (scenA.name.localeCompare(scenB.name)));
  }

  function filterScenarios (searchStr) {
    // Reset scenario list if search field is empty
    if (!searchStr || searchStr.length === 0) {
      setTreeData(rstScenarios);
      return;
    }
    // Otherwise, filter scenarios based on their name
    const filtered = [];
    for (const scenario of scenarios) {
      if (scenario.name.toLowerCase().indexOf(searchStr.toLowerCase()) !== -1) {
        filtered.push(scenario);
      }
    }
    // Format list and set as tree data
    setTreeData(formatScenariosToRSTList(filtered));
  }

  function buildSearchInfoLabel () {
    return buildSearchInfo(ScenarioUtils.countScenariosInTree(treeData));
  }

  function onSearchTextChange (event) {
    setSearchText(event.target.value);
    filterScenarios(event.target.value);
  }

  // Function to generate the buttons in the scenario tree
  function generateNodeProps ({ node, path }) {
    return {
      className: classes.scenarioCard
    };
  }

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <TextField
          data-cy="scenario-manager-search-field"
          id="standard-search"
          label={labels.searchField}
          type="search"
          className={classes.searchField}
          value={searchText}
          onChange={onSearchTextChange}/>
        <Typography className={classes.searchInfo}>
          <em>{ buildSearchInfoLabel() }</em>
        </Typography>
      </div>
      <div className={classes.treeContainer}
          onDragEnter={ignoreEvent}
          onDragOver={ignoreEvent}
          onDrop={ignoreEvent}>
        <SortableTree
          treeData={treeData}
          generateNodeProps={generateNodeProps}
          onChange={ (treeData) => { setTreeData(treeData); } }
          getNodeKey={ ({ node }) => node.id }
          onMoveNode={ (moveData) => { moveScenario(moveData); } }
          onVisibilityToggle={ ({ node, expanded }) => { expandedNodes.current[node.id] = expanded; } }
          canDrag={false}
          rowHeight={150}
        />
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
   * Function bound to handle a scenario deletion
   */
  deleteScenario: PropTypes.func.isRequired,
  /**
   * Function bound to handle a scenario movement (moving a scenario = changing its parent)
   */
  moveScenario: PropTypes.func.isRequired,
  /**
   * Current user id
   */
  userId: PropTypes.string.isRequired,
  /**
   * Function building scenario search label
   */
  buildSearchInfo: PropTypes.func.isRequired,
  /**
   * Function building scenario dataset label
   */
  buildDatasetInfo: PropTypes.func.isRequired,
  /**
   * Structure
   * <pre>
   {
    status: 'string',
    successful: 'string',
    failed: 'string',
    created: 'string',
    dataset: 'string',
    searchField: 'string'
  }
   * </pre>
   */
  labels: PropTypes.object
};

ScenarioManagerTreeList.defaultProps = {
  labels: {
    status: 'Run status',
    successful: 'Successful',
    failed: 'Failed',
    created: 'Created',
    dataset: 'Dataset',
    searchField: 'Search'
  }
};

// Function to ignore drag & drop events in the parent div, to prevent
// some behaviors such as text drag & drop opening a new tab in the browser
function ignoreEvent (event) {
  event.preventDefault();
}
