// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
  Autocomplete,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ScenarioUtils } from '@cosmotech/core';
import { HierarchicalComboBox } from '../../../../inputs';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  dialogContent: {
    marginTop: '16px',
  },
  dialogActions: {
    marginRight: '4px',
    marginBottom: '4px',
  },
}));

const getCurrentScenarioRunTemplate = (currentScenario, runTemplates) => {
  const currentRunTemplateId = currentScenario?.runTemplateId;
  return runTemplates.find((runTemplate) => runTemplate.id === currentRunTemplateId) || null;
};

const isDialogDataValid = (scenarioName, scenarioNameFieldError, isMaster, scenarioType, parentScenario, dataset) => {
  const validScenarioName = scenarioName.length !== 0 && scenarioNameFieldError === null;
  const validScenarioType = scenarioType && Object.keys(scenarioType).length !== 0;
  const validParentScenario = parentScenario && Object.keys(parentScenario).length !== 0;
  const validDataset = dataset && Object.keys(dataset).length !== 0;
  if (isMaster) {
    return validScenarioName && validDataset && validScenarioType;
  }
  return validScenarioName && validParentScenario && validScenarioType;
};

const CreateScenarioDialog = ({
  open,
  closeDialog,
  scenarios,
  currentScenario,
  datasets,
  runTemplates,
  defaultRunTemplateDataset,
  user,
  createScenario,
  workspaceId,
  solution,
  dialogLabels,
  errorLabels,
}) => {
  const classes = useStyles();

  const defaultRunTemplate = runTemplates?.[0] || null;
  const currentScenarioSelected = currentScenario.data !== null;

  const [scenarioName, setScenarioName] = useState('');
  const [scenarioNameFieldError, setScenarioNameFieldError] = useState(null);
  const [isMaster, setMaster] = useState(false);
  const [parentScenarioFieldValues, setParentScenarioFieldValues] = useState({});
  const [selectedRunTemplate, setSelectedRunTemplate] = useState(defaultRunTemplate);

  const getDefaultDataset = useCallback(
    () =>
      datasets.find((dataset) => dataset.id && dataset.id === defaultRunTemplateDataset[selectedRunTemplate.id]) ??
      (datasets.length > 0 ? datasets[0] : dialogLabels.datasetPlaceholder),
    [datasets, defaultRunTemplateDataset, dialogLabels.datasetPlaceholder, selectedRunTemplate]
  );

  const [datasetFieldValues, setDatasetFieldValues] = useState(getDefaultDataset());

  useEffect(() => {
    setDatasetFieldValues(getDefaultDataset());
  }, [selectedRunTemplate, getDefaultDataset]);

  useEffect(() => {
    if (!open) return; // Prevent changes if dialog is closed
    setScenarioName('');
    setScenarioNameFieldError(null);
    setSelectedRunTemplate(defaultRunTemplate);
    setMaster(!currentScenarioSelected);

    if (currentScenarioSelected) {
      setParentScenarioFieldValues(currentScenario.data);
      const currentRunTemplate = getCurrentScenarioRunTemplate(currentScenario.data, runTemplates);
      setSelectedRunTemplate(currentRunTemplate);
    } else {
      setParentScenarioFieldValues({});
    }
    // eslint-disable-next-line
  }, [open]);

  const handleChangeScenarioName = (event) => {
    const newScenarioName = event.target.value;
    let errorLabel = null;
    const errorKey = ScenarioUtils.scenarioNameIsValid(newScenarioName, scenarios);
    if (errorKey) {
      errorLabel = errorLabels[errorKey];
      if (!errorLabel) {
        console.warn('Scenario error label key is broken !');
        errorLabel = 'Scenario name is invalid';
      }
    }
    setScenarioName(newScenarioName);
    setScenarioNameFieldError(errorLabel);
  };

  function createScenarioData() {
    const scenarioData = {
      name: scenarioName,
      ownerId: user.userId.toString(),
      ownerName: user.userName,
      solutionId: solution.data.id,
      solutionName: solution.data.name,
      runTemplateId: selectedRunTemplate.id,
      runTemplateName: selectedRunTemplate.name,
    };

    if (isMaster) {
      scenarioData.datasetList = [datasetFieldValues.id];
    } else {
      scenarioData.parentId = parentScenarioFieldValues.id;
    }
    return scenarioData;
  }

  function getMasterScenarioCheckBox() {
    return (
      <Checkbox
        disabled={!currentScenarioSelected}
        data-cy="create-scenario-dialog-master-checkbox"
        checked={!currentScenarioSelected || isMaster}
        onChange={(event) => setMaster(event.target.checked)}
        id="isScenarioMaster"
        color="primary"
      />
    );
  }

  const handleCreateScenario = () => {
    const scenarioData = createScenarioData();
    createScenario(workspaceId, scenarioData);
    closeDialog();
  };

  const createScenarioDisabled = !isDialogDataValid(
    scenarioName,
    scenarioNameFieldError,
    isMaster,
    selectedRunTemplate,
    parentScenarioFieldValues,
    datasetFieldValues
  );

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closeDialog();
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
      <DialogTitle id="form-dialog-title">{dialogLabels.title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              data-cy="create-scenario-dialog-name-textfield"
              variant="standard"
              onChange={handleChangeScenarioName}
              onBlur={handleChangeScenarioName}
              autoFocus
              id="scenarioName"
              value={scenarioName}
              error={scenarioNameFieldError !== null}
              label={dialogLabels.scenarioName}
              helperText={scenarioNameFieldError}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={getMasterScenarioCheckBox()} label={dialogLabels.scenarioMaster} />
          </Grid>
          <Grid item xs={12}>
            {isMaster || !currentScenarioSelected ? (
              <Autocomplete
                data-cy="create-scenario-dialog-dataset-select"
                ListboxProps={{ 'data-cy': 'create-scenario-dialog-dataset-select-options' }}
                id="dataset"
                disableClearable={true}
                options={datasets}
                value={datasetFieldValues}
                onChange={(event, newDataset) => setDatasetFieldValues(newDataset)}
                getOptionLabel={(option) => option.name ?? ''}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderOption={(props, option) => (
                  <li {...props} key={option.id}>
                    {option.name}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} placeholder={dialogLabels.datasetPlaceholder} label={dialogLabels.dataset} />
                )}
              />
            ) : (
              <HierarchicalComboBox
                values={scenarios}
                defaultValue={currentScenario.data}
                label={dialogLabels.scenarioParent}
                handleChange={(event, newParentScenario) => setParentScenarioFieldValues(newParentScenario)}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              data-cy="create-scenario-dialog-type-select"
              ListboxProps={{ 'data-cy': 'create-scenario-dialog-type-select-options' }}
              id="scenarioType"
              disableClearable={true}
              value={selectedRunTemplate}
              options={runTemplates}
              onChange={(event, newScenarioType) => setSelectedRunTemplate(newScenarioType)}
              getOptionLabel={(option) => option.name ?? ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={dialogLabels.scenarioTypePlaceholder}
                  label={dialogLabels.scenarioType}
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Button id="cancel" onClick={closeDialog} color="primary" data-cy="create-scenario-dialog-cancel-button">
          {dialogLabels.cancel}
        </Button>
        <Button
          id="create"
          data-cy="create-scenario-dialog-submit-button"
          disabled={createScenarioDisabled}
          onClick={handleCreateScenario}
          variant="contained"
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
  defaultRunTemplateDataset: PropTypes.object,
  user: PropTypes.object.isRequired,
  createScenario: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  solution: PropTypes.object.isRequired,
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
    create: PropTypes.string.isRequired,
  }).isRequired,
  errorLabels: PropTypes.shape({
    emptyScenarioName: PropTypes.string.isRequired,
    existingScenarioName: PropTypes.string.isRequired,
    forbiddenCharsInScenarioName: PropTypes.string.isRequired,
  }).isRequired,
};

export default CreateScenarioDialog;
