// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const useButtonBaseStyles = (theme) => ({
	button: {
		color: theme.typography.button.color,
		fontSize: theme.typography.button.fontSize,
	},
});

export const useButtonNewScenarioStyles = (theme) => ({
	button: {
		marginRight: theme.spacing(1.5),
		background: "transparent",
		"& .MuiButton-label": {
			color: theme.palette.primary.main,
		},
		"& .MuiButton-startIcon": {
			color: theme.palette.primary.main,
			"& svg": {
				fontSize: "16px",
			},
		},
	},
});

export const useButtonRunSimulationStyles = (theme) => ({
	button: {
		"& .MuiButton-label": {
			color: theme.palette.white,
		},
		"& .MuiButton-endIcon": {
			color: theme.palette.white,
			"& svg": {
				fontSize: "16px",
			},
		},
	},
});
