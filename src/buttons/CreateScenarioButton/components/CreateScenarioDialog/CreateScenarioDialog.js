// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  Chip,
} from '@mui/material';
import { ScenarioUtils } from '@cosmotech/core';
import { BasicTextInput, HierarchicalComboBox } from '../../../../inputs';

const getCurrentScenarioRunTemplate = (currentScenario, runTemplates) => {
  const currentRunTemplateId = currentScenario?.runTemplateId;
  return runTemplates?.find((runTemplate) => runTemplate.id === currentRunTemplateId) ?? null;
};

const isDialogDataValid = (
  scenarioName,
  scenarioNameFieldError,
  isMaster,
  scenarioType,
  parentScenario,
  dataset,
  editMode
) => {
  const validScenarioName = scenarioName.length !== 0 && scenarioNameFieldError === null;
  if (editMode) return validScenarioName;

  const validScenarioType = scenarioType && Object.keys(scenarioType).length !== 0;
  const validParentScenario = parentScenario && Object.keys(parentScenario).length !== 0;
  const validDataset = dataset && Object.keys(dataset).length !== 0;

  if (isMaster) return validScenarioName && validDataset && validScenarioType;
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
  onConfirm,
  workspaceId,
  solution,
  editMode = false,
  dialogLabels,
  errorLabels,
}) => {
  const defaultRunTemplate = runTemplates?.[0] || null;
  const currentScenarioSelected = currentScenario.data !== null;

  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');
  const [scenarioTags, setScenarioTags] = useState([]);
  const [scenarioNameFieldError, setScenarioNameFieldError] = useState(null);
  const [isMaster, setMaster] = useState(false);
  const [parentScenarioFieldValues, setParentScenarioFieldValues] = useState({});
  const [selectedRunTemplate, setSelectedRunTemplate] = useState(defaultRunTemplate);

  const idPrefix = useMemo(() => (editMode ? 'edit' : 'create'), [editMode]);
  const scenariosToCheckForNameUniqueness = useMemo(() => {
    if (editMode) return scenarios.filter((scenario) => scenario.name.trim() !== currentScenario?.data?.name.trim());
    return scenarios;
  }, [currentScenario?.data?.name, editMode, scenarios]);

  const getDefaultDataset = useCallback(
    (targetRunTemplate, previousDataset) =>
      datasets?.find((dataset) => dataset.id && dataset.id === defaultRunTemplateDataset?.[targetRunTemplate?.id]) ??
      previousDataset ??
      datasets?.[0] ??
      dialogLabels.datasetPlaceholder,
    [datasets, defaultRunTemplateDataset, dialogLabels.datasetPlaceholder]
  );

  const [datasetFieldValues, setDatasetFieldValues] = useState(
    getDefaultDataset(getCurrentScenarioRunTemplate(currentScenario.data, runTemplates) ?? defaultRunTemplate)
  );

  useEffect(() => {
    setDatasetFieldValues(getDefaultDataset(selectedRunTemplate, datasetFieldValues));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRunTemplate, getDefaultDataset]); // Do not trigger on 'datasetFieldValues' change

  useEffect(() => {
    if (!open) return; // Prevent changes if dialog is closed
    setScenarioName(editMode ? (currentScenario?.data?.name ?? '') : '');
    setScenarioDescription(editMode ? (currentScenario?.data?.description ?? '') : '');
    setScenarioTags(editMode ? (currentScenario?.data?.tags ?? []) : []);
    setScenarioNameFieldError(null);
    setMaster(!currentScenarioSelected);

    if (currentScenarioSelected) {
      setParentScenarioFieldValues(currentScenario.data);
      const currentRunTemplate = getCurrentScenarioRunTemplate(currentScenario.data, runTemplates);
      setSelectedRunTemplate(currentRunTemplate);
      setDatasetFieldValues(getDefaultDataset(currentRunTemplate));
    } else {
      setParentScenarioFieldValues({});
      setSelectedRunTemplate(defaultRunTemplate);
      setDatasetFieldValues(getDefaultDataset(defaultRunTemplate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleChangeScenarioName = (event) => {
    const newScenarioName = event.target.value;
    let errorLabel = null;
    const errorKey = ScenarioUtils.scenarioNameIsValid(newScenarioName, scenariosToCheckForNameUniqueness);
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

  const createScenarioData = useCallback(() => {
    if (editMode)
      return {
        id: currentScenario?.data?.id,
        name: scenarioName.trim(),
        description: scenarioDescription.trim(),
        tags: scenarioTags,
      };

    if (!solution) console.warn('No solution provided to CreateScenarioDialog, the scenario data might be incomplete');
    if (!user) console.warn('No user provided to CreateScenarioDialog, the scenario data might be incomplete');

    const scenarioData = {
      name: scenarioName,
      description: scenarioDescription || null,
      tags: scenarioTags.length > 0 ? scenarioTags : null,
      ownerId: user?.userId?.toString(),
      ownerName: user?.userName,
      solutionId: solution?.data?.id,
      solutionName: solution?.data?.name,
      runTemplateId: selectedRunTemplate.id,
      runTemplateName: selectedRunTemplate.name,
    };

    if (isMaster) {
      scenarioData.datasetList = [datasetFieldValues.id];
    } else {
      scenarioData.datasetList = parentScenarioFieldValues.datasets?.bases;
      scenarioData.parentId = parentScenarioFieldValues.id;
    }
    return scenarioData;
  }, [
    editMode,
    currentScenario?.data?.id,
    scenarioName,
    scenarioDescription,
    scenarioTags,
    user,
    solution,
    selectedRunTemplate,
    isMaster,
    datasetFieldValues.id,
    parentScenarioFieldValues.datasets?.bases,
    parentScenarioFieldValues.id,
  ]);

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
    if (!editMode && !workspaceId) {
      console.warn(
        'Missing prop "workspaceId" in component CreateScenarioDialog, it is required in scenario creation mode'
      );
      closeDialog();
      return;
    }

    const scenarioData = createScenarioData();
    if (onConfirm) onConfirm(scenarioData);
    else if (createScenario) createScenario(workspaceId, scenarioData);
    closeDialog();
  };

  const isConfirmButtonDisabled = !isDialogDataValid(
    scenarioName,
    scenarioNameFieldError,
    isMaster,
    selectedRunTemplate,
    parentScenarioFieldValues,
    datasetFieldValues,
    editMode
  );

  const onDialogClose = (event, reason) => {
    if (reason !== 'backdropClick') closeDialog();
  };

  return (
    <Dialog
      data-cy={`${idPrefix}-scenario-dialog`}
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
      onClose={onDialogClose}
      onKeyUp={(event) => {
        event.stopPropagation();
        // Trigger form confirmation button on Ctrl+Enter
        const ENTER = 13;
        if (event.ctrlKey && event.keyCode === ENTER && !isConfirmButtonDisabled) handleCreateScenario();
      }}
      onKeyDown={(event) => event.stopPropagation()}
    >
      <DialogTitle id="form-dialog-title">{dialogLabels.title}</DialogTitle>
      <DialogContent sx={{ marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid size={12}>
            <TextField
              data-cy={`${idPrefix}-scenario-dialog-name-textfield`}
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
          <Grid size={12}>
            <BasicTextInput
              id="new-scenario-description"
              label={dialogLabels.scenarioDescription ?? 'Description'}
              value={scenarioDescription}
              changeTextField={(newValue) => setScenarioDescription(newValue)}
              size="medium"
              textFieldProps={{
                multiline: true,
                rows: 3,
              }}
            />
          </Grid>
          <Grid size={12}>
            <Autocomplete
              id="new-scenario-tags"
              freeSolo
              multiple
              disableClearable
              options={[]}
              value={scenarioTags}
              renderTags={(value, getTagProps) =>
                value.map((tagText, index) => (
                  <Chip
                    key={index}
                    label={tagText}
                    data-cy={`new-scenario-tags-tag-${index}`}
                    color="primary"
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => <TextField {...params} label={dialogLabels.scenarioTags ?? 'Tags'} />}
              onChange={(event, values) => setScenarioTags(values)}
            />
          </Grid>
          {!editMode && (
            <>
              <Grid size={12}>
                <FormControlLabel control={getMasterScenarioCheckBox()} label={dialogLabels.scenarioMaster} />
              </Grid>
              <Grid size={12}>
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
              <Grid size={12}>
                {isMaster || !currentScenarioSelected ? (
                  <Autocomplete
                    data-cy="create-scenario-dialog-dataset-select"
                    ListboxProps={{ 'data-cy': 'create-scenario-dialog-dataset-select-options' }}
                    id="dataset"
                    disableClearable={true}
                    options={datasets ?? []}
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
                      <TextField
                        {...params}
                        placeholder={dialogLabels.datasetPlaceholder}
                        label={dialogLabels.dataset}
                      />
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
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions sx={{ marginRight: '4px', marginBottom: '4px' }}>
        <Button id="cancel" onClick={closeDialog} color="primary" data-cy={`${idPrefix}-scenario-dialog-cancel-button`}>
          {dialogLabels.cancel}
        </Button>
        <Button
          id={idPrefix}
          data-cy={`${idPrefix}-scenario-dialog-submit-button`}
          disabled={isConfirmButtonDisabled}
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
  user: PropTypes.object,
  createScenario: PropTypes.func, // DEPRECATED: use onConfirm instead (mind the signature that is different though)
  onConfirm: PropTypes.func,
  workspaceId: PropTypes.string,
  solution: PropTypes.object,
  editMode: PropTypes.bool,
  dialogLabels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    scenarioName: PropTypes.string.isRequired,
    scenarioDescription: PropTypes.string,
    scenarioTags: PropTypes.string,
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
