import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  TextField,
  DialogActions,
  Button,
  IconButton,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Chip,
  makeStyles,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: '3px',
  },
}));
const RolesEditionDialog = ({
  labels,
  isReadOnly,
  scenarioRolesPermissionsMapping,
  onConfirmChanges,
  users,
  specificRolesByAgent,
  defaultAccess,
  open,
  closeDialog,
}) => {
  const classes = useStyles();
  const [selectedAgent, setSelectedAgent] = useState(null);
  const allRoles = Object.keys(scenarioRolesPermissionsMapping);
  const getGrantedRoles = () => {
    let grantedRoles = {};
    allRoles.map(
      (role) =>
        (grantedRoles = {
          ...grantedRoles,
          [role]:
            specificRolesByAgent.find((agent) => agent.id === selectedAgent?.id)?.roles?.includes(role) ||
            defaultAccess.roles.includes(role),
        })
    );
    return grantedRoles;
  };
  const [grantedRoles, setGrantedRoles] = useState(getGrantedRoles);
  const handleChangeAgent = (newAgent) => {
    if (!isReadOnly) {
      setSelectedAgent(newAgent);
      setIsFirstScreenShown(false);
    }
  };
  useEffect(() => {
    setGrantedRoles(getGrantedRoles);
  }, [selectedAgent]);

  const goBackToFirstScreen = () => {
    setIsFirstScreenShown(true);
    setSelectedAgent(null);
  };
  const [isFirstScreenShown, setIsFirstScreenShown] = useState(true);

  const confirmChangeAgentRoles = () => {
    onConfirmChanges();
    closeDialog();
  };
  const prepareToChangeAgentRoles = () => {
    const grantedRolesToAgent = Object.entries(grantedRoles).filter(([key, value]) => value === true);
    if (specificRolesByAgent.some((agent) => agent.id === selectedAgent.id)) {
      const agentToChange = specificRolesByAgent.findIndex((agent) => agent.id === selectedAgent.id);
      specificRolesByAgent[agentToChange].roles = Object.keys(Object.fromEntries(grantedRolesToAgent));
    } else {
      specificRolesByAgent.push({ ...selectedAgent, roles: Object.keys(Object.fromEntries(grantedRolesToAgent)) });
    }
    goBackToFirstScreen();
  };
  const getGrantedOrNotGrantedPermissions = (isRoleGranted) => {
    const filtered = Object.entries(grantedRoles).filter(([key, value]) => value === isRoleGranted);

    const filteredPermissions = new Set(
      Object.keys(Object.fromEntries(filtered))
        .map((role) => scenarioRolesPermissionsMapping[role])
        .flatMap((permission) => permission)
    );
    return Array.from(filteredPermissions);
  };
  const [grantedPermissions, setGrantedPermissions] = useState(null);
  const [notGrantedPermissions, setNotGrantedPermissions] = useState([]);
  const handleRolesChecked = (event) => {
    setGrantedRoles({ ...grantedRoles, [event.target.value]: event.target.checked });
  };
  useEffect(() => {
    setGrantedPermissions(getGrantedOrNotGrantedPermissions(true));
  }, [grantedRoles]);
  useEffect(() => {
    if (grantedPermissions)
      setNotGrantedPermissions(
        getGrantedOrNotGrantedPermissions(false).filter((permission) => !grantedPermissions.includes(permission))
      );
  }, [grantedPermissions]);

  const dialogContent = isFirstScreenShown ? (
    <DialogContent>
      <Grid container spacing={2}>
        {!isReadOnly && (
          <Grid item xs={12}>
            <Autocomplete
              data-cy="share-scenario-dialog-agents-select"
              ListboxProps={{ 'data-cy': 'share-scenario-dialog-agents-select-options' }}
              id="agents"
              label={labels.addPeople}
              freeSolo
              options={users}
              value={selectedAgent}
              onChange={(event, agent) => handleChangeAgent(agent)}
              getOptionLabel={(option) => (option.email ? option.email : '')}
              getOptionSelected={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} placeholder={labels.addPeople} variant="standard" />}
            />
          </Grid>
        )}
      </Grid>
      <DialogActions>
        <Button id="cancel" onClick={closeDialog} color="primary">
          {labels.cancel}
        </Button>
        {!isReadOnly && (
          <Button
            id="share"
            data-cy="share-scenario-dialog-submit-button"
            onClick={confirmChangeAgentRoles}
            color="primary"
            variant="contained"
          >
            {labels.done}
          </Button>
        )}
      </DialogActions>
    </DialogContent>
  ) : (
    <DialogContent>
      <Divider />
      <Autocomplete
        disabled={true}
        data-cy="share-scenario-dialog-agents-select"
        options={users}
        getOptionLabel={(option) => (option.email ? option.email : '')}
        value={selectedAgent}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selectedAgent.email}
            label={labels.userSelected}
            variant="outlined"
            margin="normal"
          />
        )}
      />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{labels.roles.label}</Typography>
          <FormGroup>
            {Object.keys(scenarioRolesPermissionsMapping).map((role) => (
              <FormControlLabel
                style={{ marginLeft: '0px' }}
                key={role}
                control={
                  <Checkbox
                    data-cy="share-scenario-dialog-roles-checkbox"
                    value={role}
                    checked={grantedRoles[role]}
                    onChange={handleRolesChecked}
                    color="secondary"
                  />
                }
                label={role}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" variant="middle" />
        </Grid>
        <Grid item xs={7}>
          <Typography variant="subtitle2">{labels.permissions.granted}</Typography>
          {grantedPermissions.map((permission) => (
            <Chip key={permission} color="secondary" label={permission} className={classes.chip} />
          ))}
          <Typography variant="subtitle2">{labels.permissions.notGranted}</Typography>
          {notGrantedPermissions.map((permission) => (
            <Chip key={permission} disabled label={permission} className={classes.chip} />
          ))}
        </Grid>
      </Grid>
      <DialogActions>
        <Button id="cancel" onClick={goBackToFirstScreen} color="primary">
          {labels.cancel}
        </Button>
        <Button
          id="share"
          data-cy="share-scenario-dialog-submit-button"
          onClick={prepareToChangeAgentRoles}
          color="primary"
          variant="contained"
        >
          {labels.done}
        </Button>
      </DialogActions>
    </DialogContent>
  );

  const onClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      closeDialog();
    }
  };

  return (
    <Dialog
      data-cy="share-scenario-dialog"
      open={open}
      aria-labelledby="form-dialog-title"
      maxWidth={'sm'}
      fullWidth={true}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">
        {!isFirstScreenShown && (
          <IconButton onClick={goBackToFirstScreen}>
            <ArrowBackIcon />
          </IconButton>
        )}
        {labels.title}
      </DialogTitle>
      {dialogContent}
    </Dialog>
  );
};
RolesEditionDialog.propTypes = {
  labels: PropTypes.shape({
    title: PropTypes.string.isRequired,
    addPeople: PropTypes.string.isRequired,
    cancel: PropTypes.string.isRequired,
    done: PropTypes.string.isRequired,
    userSelected: PropTypes.string.isRequired,
    roles: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }),
    permissions: PropTypes.shape({
      granted: PropTypes.string.isRequired,
      notGranted: PropTypes.string.isRequired,
    }),
  }),
  isReadOnly: PropTypes.bool,
  scenarioRolesPermissionsMapping: PropTypes.object,
  onConfirmChanges: PropTypes.func,
  specificRolesByAgent: PropTypes.array,
  users: PropTypes.array,
  defaultAccess: PropTypes.object,
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
};
export default RolesEditionDialog;
