import React from "react";
import {withStyles} from "@material-ui/core/styles";
import AddCircleOutlineOutlined from "@material-ui/icons/AddCircleOutlineOutlined";
import {useButtonNewScenarioStyles} from "./muiStyles";
import ButtonBase from "./ButtonBase";

let ButtonNewScenario = ({classes, ...props}) => (
	<ButtonBase
		className={classes.button}
		startIcon={<AddCircleOutlineOutlined />}
		{...props}>
		Créer un scénario alternatif
	</ButtonBase>
);

ButtonNewScenario = withStyles(useButtonNewScenarioStyles)(ButtonNewScenario);

export default ButtonNewScenario;
