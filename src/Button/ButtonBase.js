import React from "react";
import PropTypes from "prop-types";
import { noop } from "lodash";
import cn from "classnames";
import { useButtonBaseStyles } from "./muiStyles";
import { Button, withStyles } from "@material-ui/core";

const ButtonBase = ({
	className,
	color,
	size,
	variant,
	onClick,
	classes,
	children,
	...props
}) => (
	<Button
		className={cn(classes.button, className)}
		onClick={onClick}
		size={size}
		variant={variant}
		color={color}
		{...props}>
		{children}
	</Button>
);

ButtonBase.defaultProps = {
	className: null,
	size: "medium",
	variant: "contained",
	color: "primary",
	onClick: noop,
};

ButtonBase.propTypes = {
	size: PropTypes.string,
	variant: PropTypes.string,
	color: PropTypes.string,
	className: PropTypes.string,
	onClick: PropTypes.func,
	classes: PropTypes.object.isRequired,
};

export default withStyles(useButtonBaseStyles)(ButtonBase);
