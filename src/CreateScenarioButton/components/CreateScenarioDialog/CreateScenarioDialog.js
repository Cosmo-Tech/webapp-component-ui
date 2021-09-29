// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ScenarioUtils } from '@cosmotech/core';
import {
  Button,
  Checkbox,
  Dialog, DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HierarchicalComboBox from '../../../HierarchicalComboBox/HierarchicalComboBox';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  dialogContent: {
    marginTop: '16px'
  },
  dialogActions: {
    marginRight: '4px',
    marginBottom: '4px'
  }
}));

const getCurrentScenarioRunType = (currentScenario, runTemplates) => {
  const runTemplateId = currentScenario?.data?.runTemplateId;
  runTemplates = runTemplates === undefined ? [] : runTemplates;
  const runTemplate = runTemplates.find(runTemplate => runTemplate.id === runTemplateId);
  return runTemplate === undefined ? {} : runTemplate;
};

const isDialogDataValid = (scenarioName, isMaster, scenarioType, parentScenario, dataset) => {
  const validScenarioName = scenarioName.value.length !== 0 && !scenarioName.hasError;
  const validScenarioType = Object.keys(scenarioType).length !== 0;
  const validParentScenario = Object.keys(parentScenario).length !== 0;
  const validDataset = Object.keys(dataset).length !== 0;
  let isValid;
  if (isMaster) {
    isValid = validScenarioName && validDataset && validScenarioType;
  } else {
    isValid = validScenarioName && validParentScenario && validScenarioType;
  }
  return isValid;
};

const CreateScenarioDialog = ({
  open,
  closeDialog,
  scenarios,
  currentScenario,
  datasets,
  runTemplates,
  user,
  createScenario,
  workspaceId,
  solution,
  nameValidator,
  datasetsFilter,
  dialogLabels,
  errorLabels
}) => {
  const classes = useStyles();

  const scenarioNameInitialState = {
    value: '',
    hasError: false,
    error: ''
  };
  const [scenarioNameFieldValues, setScenarioNameFieldValues] = useState(scenarioNameInitialState);
  const [isMaster, setMaster] = useState(false);
  const [datasetFieldValues, setDatasetFieldValues] = useState({});
  const [parentScenarioFieldValues, setParentScenarioFieldValues] = useState({});
  const [scenarioTypeFieldValues, setScenarioTypeFieldValues] = useState({});
  const currentScenarioSelected = currentScenario.data !== null;
  const defaultParentScenario = useRef({});
  const defaultScenarioType = useRef({});

  let filteredDatasets = datasets;
  if (datasetsFilter) {
    filteredDatasets = datasets.filter(datasetsFilter);
  }
  useEffect(() => {
    if (currentScenarioSelected) {
      defaultParentScenario.current = currentScenario.data;
      setParentScenarioFieldValues(currentScenario.data);
      const currentRunTemplate = getCurrentScenarioRunType(currentScenario, runTemplates);
      defaultScenarioType.current = currentRunTemplate;
      setScenarioTypeFieldValues(currentRunTemplate);
    } else {
      setMaster(true);
    }
  }, [currentScenario, currentScenarioSelected, runTemplates]);

  const handleChangeScenarioName = (event) => {
    const newScenarioName = event.target.value;
    let error = '';
    let hasErrors = false;
    if (newScenarioName.length === 0) {
      error = errorLabels.emptyScenarioName;
      hasErrors = true;
    } else {
      if (newScenarioName.match(nameValidator) === null) {
        error = errorLabels.forbiddenCharsInScenarioName;
        hasErrors = true;
      } else if (ScenarioUtils.scenarioExistsInList(newScenarioName, scenarios)) {
        error = errorLabels.existingScenarioName;
        hasErrors = true;
      }
    }
    setScenarioNameFieldValues({
      ...scenarioNameFieldValues,
      value: newScenarioName,
      error: error,
      hasError: hasErrors
    });
  };

  function createScenarioData () {
    const scenarioData = {
      name: scenarioNameFieldValues.value,
      ownerId: user.userId.toString(),
      ownerName: user.userName,
      solutionId: solution.data.id,
      solutionName: solution.data.name,
      runTemplateId: scenarioTypeFieldValues.id,
      runTemplateName: scenarioTypeFieldValues.name
    };

    if (isMaster) {
      scenarioData.datasetList = [datasetFieldValues.id];
    } else {
      scenarioData.parentId = parentScenarioFieldValues.id;
    }
    return scenarioData;
  }

  const handleCreateScenario = () => {
    const scenarioData = createScenarioData();
    createScenario(workspaceId, scenarioData);
    handleCloseDialog();
  };

  const handleChangeScenarioMaster = (event) => setMaster(event.target.checked);

  const handleChangeDataset = (newDataset) => setDatasetFieldValues(newDataset);

  const handleChangeParentScenario = (newParentScenario) => setParentScenarioFieldValues(newParentScenario);

  const handleScenarioTypeChange = (newScenarioType) => setScenarioTypeFieldValues(newScenarioType);

  let createScenarioDisabled = true;
  if (isDialogDataValid(scenarioNameFieldValues,
    isMaster,
    scenarioTypeFieldValues,
    parentScenarioFieldValues,
    datasetFieldValues)) {
    createScenarioDisabled = false;
  }

  const resetToDefaultData = () => {
    setParentScenarioFieldValues(defaultParentScenario.current);
    setDatasetFieldValues({});
    setMaster(false);
    setScenarioNameFieldValues(scenarioNameInitialState);
    setScenarioTypeFieldValues(defaultScenarioType.current);
  };

  const handleCloseDialog = () => {
    resetToDefaultData();
    closeDialog();
  };

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      handleCloseDialog();
    }
  };

  return (
    <Dialog
      data-cy="create-scenario-dialog"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">
        {dialogLabels.title}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              data-cy="create-scenario-dialog-name-textfield"
              onChange={handleChangeScenarioName}
              onBlur = {handleChangeScenarioName}
              autoFocus
              id="scenarioName"
              value={scenarioNameFieldValues.value}
              error={scenarioNameFieldValues.hasError}
              label={dialogLabels.scenarioName}
              helperText={scenarioNameFieldValues.error}
              fullWidth
            />
          </Grid>
          {currentScenarioSelected &&
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  data-cy="create-scenario-dialog-master-checkbox"
                  checked={isMaster}
                  onChange={handleChangeScenarioMaster}
                  id="isScenarioMaster"
                  color="primary" />
              }
              label={dialogLabels.scenarioMaster}/>
          </Grid>
          }
          <Grid item xs={12}>
            { isMaster || !currentScenarioSelected
              ? (<Autocomplete
                  data-cy="create-scenario-dialog-dataset-select"
                  id="dataset"
                  disableClearable={true}
                  options={filteredDatasets}
                  defaultValue={datasetFieldValues}
                  onChange={
                      (event, newDataset) => (handleChangeDataset(newDataset))
                  }
                  getOptionLabel={(option) => Object.keys(option).length !== 0 ? option.name : ''}
                  getOptionSelected={(option, value) => option.id === value.id}
                  renderInput={
                    (params) => (
                      <TextField
                        {...params}
                        placeholder={dialogLabels.datasetPlaceholder}
                        label={dialogLabels.dataset}
                        variant="outlined"/>)
                  }/>
                )
              : (<HierarchicalComboBox
                  values={scenarios}
                  defaultValue={defaultParentScenario.current}
                  label={dialogLabels.scenarioParent}
                  handleChange={
                    (event, newParentScenario) => (handleChangeParentScenario(newParentScenario))
                  }/>
                )
            }
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              data-cy="create-scenario-dialog-type-select"
              id='scenarioType'
              disableClearable={true}
              value={scenarioTypeFieldValues}
              options={runTemplates}
              onChange={
                (event, newScenarioType) => (handleScenarioTypeChange(newScenarioType))
              }
              getOptionLabel={(option) => Object.keys(option).length !== 0 ? option.name : ''}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={
                (params) => (
                  <TextField
                    {...params}
                    placeholder={dialogLabels.scenarioTypePlaceholder}
                    label={dialogLabels.scenarioType}
                    variant="outlined"/>
                )}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button
          id="cancel"
          onClick={handleCloseDialog}
          color="primary"
        >
          {dialogLabels.cancel}
        </Button>
        <Button
          id="create"
          data-cy="create-scenario-dialog-submit-button"
          disabled={createScenarioDisabled}
          onClick={handleCreateScenario}
          color="primary"
        >
          {dialogLabels.create}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CreateScenarioDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  closeDialog: PropTypes.func.isRequired,
  scenarios: PropTypes.array.isRequired,
  currentScenario: PropTypes.object.isRequired,
  datasets: PropTypes.array.isRequired,
  runTemplates: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  createScenario: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  solution: PropTypes.object.isRequired,
  nameValidator: PropTypes.instanceOf(RegExp),
  datasetsFilter: PropTypes.func,
  dialogLabels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    scenarioName: PropTypes.string.isRequired,
    scenarioMaster: PropTypes.string.isRequired,
    scenarioParent: PropTypes.string.isRequired,
    scenarioTypePlaceholder: PropTypes.string.isRequired,
    scenarioType: PropTypes.string.isRequired,
    datasetPlaceholder: PropTypes.string.isRequired,
    dataset: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    create: PropTypes.string.isRequired
  }).isRequired,
  errorLabels: PropTypes.shape({
    emptyScenarioName: PropTypes.string.isRequired,
    existingScenarioName: PropTypes.string.isRequired,
    forbiddenCharsInScenarioName: PropTypes.string.isRequired
  }).isRequired
};

export default CreateScenarioDialog;
