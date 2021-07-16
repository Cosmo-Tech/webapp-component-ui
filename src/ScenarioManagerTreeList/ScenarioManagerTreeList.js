// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { TextField, Typography } from '@material-ui/core';
import '@nosferatu500/react-sortable-tree/style.css';
import SortableTree from '@nosferatu500/react-sortable-tree';
import { ScenarioUtils } from '@cosmotech/core';
import ScenarioNode from './components';
import useStyles from './style';

const ScenarioManagerTreeList = (props) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    datasets,
    scenarios,
    moveScenario
  } = props;

  // Memoize the full scenarios tree in a ReactSortableTree-compatible format
  const rstScenarios = useMemo(() => formatScenariosToRSTList(datasets, scenarios), [datasets, scenarios]);

  const [searchText, setSearchText] = useState('');
  const [treeData, setTreeData] = useState(rstScenarios);

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
    setTreeData(formatScenariosToRSTList(datasets, filtered));
  }

  function buildSearchInfo () {
    return t('commoncomponents.scenariomanager.treelist.search.info',
      '{{count}} scenarios found',
      { count: ScenarioUtils.countScenariosInTree(treeData) });
  };

  function onSearchTextChange (event) {
    setSearchText(event.target.value);
    filterScenarios(event.target.value);
  };

  // Function to generate the buttons in the scenario tree
  function generateNodeProps ({ node, path }) {
    return {
      className: classes.scenarioCard
    };
  }

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <TextField id="standard-search" label="Search field" type="search"
          className={classes.searchField}
          value={searchText}
          onChange={onSearchTextChange}/>
        <Typography className={classes.searchInfo}>
          <em>{ buildSearchInfo() }</em>
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
          canDrag={false}
          rowHeight={150}
        />
      </div>
    </div>
  );
};

ScenarioManagerTreeList.propTypes = {
  datasets: PropTypes.array.isRequired,
  scenarios: PropTypes.array.isRequired,
  moveScenario: PropTypes.func.isRequired
};

function formatScenariosToRSTList (datasets, scenarios) {
  const rstScenarios = scenarios.map((scenario) => {
    return {
      parentId: scenario.parentId,
      id: scenario.id,
      name: scenario.name,
      title: <ScenarioNode datasets={datasets} scenario={scenario}/>
    };
  });
  return ScenarioUtils.getScenarioTree(rstScenarios,
    (scenA, scenB) => (scenA.name.localeCompare(scenB.name)));
}

// Function to ignore drag & drop events in the parent div, to prevent
// some behavior such as text drag & drop opening a new tab in the browser
function ignoreEvent (event) {
  event.preventDefault();
};

export default ScenarioManagerTreeList;
