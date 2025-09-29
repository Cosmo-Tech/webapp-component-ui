// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  UnfoldMore as UnfoldMoreIcon,
  UnfoldLess as UnfoldLessIcon,
  AccountTree as AccountTreeIcon,
} from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ScenarioUtils } from '@cosmotech/core';
import { SearchBar } from '../../inputs';
import { FadingTooltip } from '../../misc';
import { ScenarioSortableTree } from './components';
import { DEFAULT_LABELS } from './labels';
import useStyles from './style';

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
const filterMatchesDescription = (scenario, searchString) =>
  scenario.description?.toLowerCase().includes(searchString.toLowerCase());
const filterMatchesTag = (scenario, searchString) =>
  scenario.tags?.join(' ').toLowerCase().includes(searchString.toLowerCase());
const filterMatchesOwner = (scenario, searchString) =>
  scenario.ownerName?.toLowerCase().includes(searchString.toLowerCase());

const doesScenarioMatchFilter = (labels, scenario, searchStr) =>
  filterMatchesName(scenario, searchStr) ||
  filterMatchesValidationStatus(labels, scenario, searchStr) ||
  filterMatchesRunStatus(labels, scenario, searchStr) ||
  filterMatchesDescription(scenario, searchStr) ||
  filterMatchesTag(scenario, searchStr) ||
  filterMatchesOwner(scenario, searchStr);

export const ScenarioManagerTreeList = (props) => {
  const classes = useStyles();
  const {
    datasets,
    scenarios,
    onScenarioRedirect = null,
    deleteScenario,
    onScenarioRename,
    checkScenarioNameValue = () => null,
    buildDatasetInfo,
    labels: tmpLabels,
    buildScenarioNameToDelete,
    canUserDeleteScenario,
    canUserRenameScenario = () => true,
    canUpdateScenario,
    onScenarioUpdate = () => null,
  } = props;

  const labels = useMemo(() => ({ ...DEFAULT_LABELS, ...tmpLabels }), [tmpLabels]);
  const allScenarioIds = useMemo(() => scenarios.map((scenario) => scenario.id), [scenarios]);

  const [searchText, setSearchText] = useState('');
  const [treeExpandedNodes, setTreeExpandedNodes] = useState(allScenarioIds);
  const [detailExpandedNodes, setDetailExpandedNodes] = useState([]);

  const formatScenariosToScenariosTree = (scenariosToFormat) => {
    const scenarioList = scenariosToFormat.map((scenario) => {
      labels.dataset = buildDatasetInfo(scenario.datasetList);

      return {
        parentId: scenario.parentId,
        id: scenario.id,
        name: scenario.name,
        scenarioNodeProps: {
          datasets,
          scenario,
          showDeleteIcon: canUserDeleteScenario(scenario),
          onScenarioRedirect,
          deleteScenario,
          checkScenarioNameValue,
          canRenameScenario: canUserRenameScenario(scenario),
          canUpdateScenario: canUpdateScenario(scenario),
          onScenarioRename,
          onScenarioUpdate,
          labels,
          buildScenarioNameToDelete,
        },
      };
    });
    return ScenarioUtils.getScenarioTree(scenarioList, (scenA, scenB) => scenA.name.localeCompare(scenB.name));
  };

  const scenarioTreeFull = useMemo(
    () => formatScenariosToScenariosTree(scenarios),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [datasets, scenarios, labels]
  );

  const [scenariosTree, setScenariosTree] = useState(scenarioTreeFull);

  // On scenarios list update, re-apply current filter on the new list of scenarios
  useEffect(() => {
    filterScenarios(searchText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenarios, searchText, labels]);

  const collapseAll = () => {
    setTreeExpandedNodes([]);
    setDetailExpandedNodes([]);
  };
  const expandTree = () => {
    setTreeExpandedNodes(allScenarioIds);
    setDetailExpandedNodes([]);
  };
  const expandAll = () => {
    setTreeExpandedNodes(allScenarioIds);
    setDetailExpandedNodes(allScenarioIds);
  };

  const filterScenarios = (searchStr) => {
    // Reset scenario list if search field is empty
    if (!searchStr || searchStr.length === 0) {
      setScenariosTree(scenarioTreeFull);
      return;
    }
    // Otherwise, filter scenarios based on their name
    const filtered = scenarios.filter((scenario) => doesScenarioMatchFilter(labels, scenario, searchStr));
    // Format list and set as tree data
    setScenariosTree(formatScenariosToScenariosTree(filtered));
  };

  return (
    <div className={classes.root}>
      <div className={classes.searchContainer}>
        <SearchBar
          label={labels.searchField}
          className={classes.searchField}
          onSearchChange={setSearchText}
          id="scenario-manager-search-field"
        />
        <div className={classes.toolbar}>
          <FadingTooltip title={labels?.toolbar?.collapseAll || 'Collapse all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={collapseAll} size="large">
              <UnfoldLessIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandAll || 'Expand all'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandAll} size="large">
              <UnfoldMoreIcon color="primary" />
            </IconButton>
          </FadingTooltip>
          <FadingTooltip title={labels?.toolbar?.expandTree || 'Expand tree'}>
            <IconButton className={classes.toolbarPrimaryAction} onClick={expandTree} size="large">
              <AccountTreeIcon color="primary" />
            </IconButton>
          </FadingTooltip>
        </div>
      </div>
      <div data-cy="scenario-manager-view" className={classes.treesContainer}>
        {scenariosTree.map((rootScenario) => {
          return (
            <ScenarioSortableTree
              key={rootScenario.id}
              classes={classes}
              treeExpandedNodes={treeExpandedNodes}
              setTreeExpandedNodes={setTreeExpandedNodes}
              detailExpandedNodes={detailExpandedNodes}
              setDetailExpandedNodes={setDetailExpandedNodes}
              scenarioTree={rootScenario}
            />
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
   * Function building scenario dataset label
   */
  buildDatasetInfo: PropTypes.func.isRequired,
  /**
   * Function returning whether the current user can delete a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserDeleteScenario: PropTypes.func,
  /**
   * Function returning whether the current user can rename a given scenario. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUserRenameScenario: PropTypes.func,
  /**
   * Function returning whether the current user can edit scenario's metadata. This function receives as parameter
   * the scenario data and must return a boolean.
   */
  canUpdateScenario: PropTypes.func,
  /**
   * Structure
   * <pre>
   {
    status: 'string',
    runTemplateLabel: 'string',
    successful: 'string',
    running: 'string',
    failed: 'string',
    created: 'string',
    delete: 'string',
    edit: 'string',
    scenarioRename: {
      title: 'string'
      errors: {
        emptyScenarioName: 'string'
        forbiddenCharsInScenarioName: 'string'
      },
    },
    dataset: 'string',
   noDataset: 'string',
   datasetNotFound: 'string'
    searchField: 'string',
    toolbar : {
      expandAll: 'string',
      expandTree: 'string'
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
  /**
   * Function to handle the update of scenario metadata
   */
  onScenarioUpdate: PropTypes.func,
};
