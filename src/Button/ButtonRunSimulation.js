import React from "react";
import {withStyles} from "@material-ui/core/styles";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import {useButtonRunSimulationStyles} from "./muiStyles";
import ButtonBase from "./ButtonBase";

let ButtonRunSimulation = ({classes, ...props}) => (
	<ButtonBase
		className={classes.button}
		endIcon={<PlayCircleOutlineIcon />}
		{...props}>
		Lancer simulation
	</ButtonBase>
);

ButtonRunSimulation = withStyles(useButtonRunSimulationStyles)(
	ButtonRunSimulation
);

export default ButtonRunSimulation;
