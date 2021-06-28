import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useTranslation } from 'react-i18next';
import CreateScenarioDialog from './components';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  dialogContent: {
    marginLeft: '20px',
    marginRight: '20px'
  },
  dialogActions: {
    marginRight: '30px',
    marginTop: '20px',
    marginBottom: '5px'
  }
}));

const CreateScenarioButton = ({
  currentScenario,
  datasets,
  scenarios,
  runTemplates,
  user,
  createScenario,
  workspaceId,
  solution,
  disabled,
  buttonTooltip,
  nameValidator
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);
  const datasetsFilter = (dataset) => {
    if (dataset.tags === null) return false;
    return dataset.tags.includes('dataset');
  };

  return (
    <div>
      <Tooltip arrow title={buttonTooltip}>
        <div>
          <Button
            size="medium"
            startIcon={<AddIcon />}
            variant="text"
            onClick={openDialog}
            color="primary"
            disabled={disabled}
          >
            {t('commoncomponents.button.create.scenario.label', 'Create Alternative Scenario')}
          </Button>
        </div>
      </Tooltip>
      <CreateScenarioDialog
        createScenario={createScenario}
        workspaceId={workspaceId}
        solution={solution}
        open={open}
        currentScenario={currentScenario}
        datasets={datasets}
        classes={classes}
        closeDialog={closeDialog}
        runTemplates={runTemplates}
        scenarios={scenarios}
        user={user}
        nameValidator={nameValidator}
        datasetsFilter={datasetsFilter}
      />
    </div>
  );
};

CreateScenarioButton.propTypes = {
  currentScenario: PropTypes.object,
  scenarios: PropTypes.array.isRequired,
  datasets: PropTypes.array.isRequired,
  runTemplates: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  createScenario: PropTypes.func.isRequired,
  workspaceId: PropTypes.string.isRequired,
  solution: PropTypes.object.isRequired,
  buttonTooltip: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  nameValidator: PropTypes.instanceOf(RegExp)
};

CreateScenarioButton.defaultProps = {
  disabled: false
};

export default CreateScenarioButton;
