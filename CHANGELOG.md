## **6.0.4** <sub><sup>2024-02-05 (a4a7001...a4a7001)</sup></sub>

### Bug Fixes

- \[PROD\-12956\] fix some labels in Dashboards components ([a4a7001](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a4a7001))

## **6.0.3** <sub><sup>2024-02-01 (a901378...a901378)</sup></sub>

### Bug Fixes

- \[PROD\-12944\] fix Table crash when showing large files in fullscreen ([a901378](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a901378))

## **6.0.2** <sub><sup>2024-01-11 (e0c20f6...3f81e0d)</sup></sub>

### Bug Fixes

- allow props forwarding to TextField component inside SearchBar ([e0c20f6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e0c20f6))

## **6.0.1** <sub><sup>2023-12-15 (7312a39...7312a39)</sup></sub>

### Bug Fixes

- restore run template label accidentally removed from ScenarioNode ([7312a39](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7312a39))

## **6.0.0** <sub><sup>2023-12-14 (9f965d5...ca06cc9)</sup></sub>

### Features

- \[PROD\-12487\] add new component `SearchBar` ([9f965d5](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9f965d5))
- \[PROD\-12490\] add new component `TagsEditor` ([6d7fcf6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/6d7fcf6))
- add new prop `component` in `SimpleTwoActionsDialog` ([fa3eee0](https://github.com/Cosmo-Tech/webapp-component-ui/commit/fa3eee0))
- `BasicInputs` components using a `TextField` now have a new prop `size` to apply to this text field ([366f497](https://github.com/Cosmo-Tech/webapp-component-ui/commit/366f497))

### Bug Fixes

- fix default props of `EditableLabel` component ([eb75c21](https://github.com/Cosmo-Tech/webapp-component-ui/commit/eb75c21))
- make `Table` toolbar tooltips disappear when button hovering stops ([6760c6c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/6760c6c))
- replace enum value by key in `data-cy` tag of `BasicRadioInput` ([9974b40](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9974b40))

### BREAKING CHANGES

- `<Grid item>` components have been removed from the root of all `BasicInputs` components, please adapt your web application if you need it for a layout ([366f497](https://github.com/Cosmo-Tech/webapp-component-ui/commit/366f497))
- in `ScenarioManagerTreeList` component, the colon (:) character must now be included in the dataset label ([ca06cc9](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ca06cc9))

## **5.10.2** <sub><sup>2023-10-09 (3a8298b...3a8298b)</sup></sub>

### Bug Fixes

- fix error with MSAL login

## **5.10.1** <sub><sup>2023-10-06 (df7fdbd...b736a3a)</sup></sub>

### Bug Fixes

- increase clickable area of buttons in table toolbar ([b736a3a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/b736a3a))

## **5.10.0** <sub><sup>2023-10-02 (e3db76d...487b572)</sup></sub>

### Features

- add option shouldHideFileName in UploadFile component ([e3db76d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e3db76d))

### Bug Fixes

- always show enum values instead of keys in BasicEnumInput ([d81c747](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d81c747))

## **5.9.4**&emsp;<sub><sup>2023-09-30</sup></sub>

### Bug Fixes

- fix missing upgrade of @cosmotech/core package

## **5.9.3**&emsp;<sub><sup>2023-09-27 (02139af7bcc149c3d69821b144ee954cdad91794...02139af7bcc149c3d69821b144ee954cdad91794)</sup></sub>

### Bug Fixes

- \[PROD\-12177\] fix last issues of delete rows button ([02139af](https://github.com/Cosmo-Tech/webapp-component-ui/commit/02139af7bcc149c3d69821b144ee954cdad91794))

## **5.9.2**&emsp;<sub><sup>2023-09-20 (0f59dbcef51b7963406295e237949cedb20ec285...0f59dbcef51b7963406295e237949cedb20ec285)</sup></sub>

### Bug Fixes

- \[PROD\-12177\] delete rows button is now enabled only when at least a row is selected ([0f59dbc](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0f59dbcef51b7963406295e237949cedb20ec285))

## **5.9.1** <sub><sup>2023-09-22 (8340d08...69cfee4)</sup></sub>

### Bug Fixes

- fix empty results when first displaying dashboards ([8340d08](https://github.com/Cosmo-Tech/webapp-component-ui/commit/8340d08))
- add an option to force date as UTC in BasicDateInput date picker component ([9e894c7](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9e894c7))

## **5.9.0**&emsp;<sub><sup>2023-09-07 (5475a1e3f63a8343209c6fc697fc13743b673659...09dd215ecc751856e685abd9e3d9bb6780da9e07)</sup></sub>

### Features

- \[PROD\-11739\] add technical informations entry in help menu ([09dd215](https://github.com/Cosmo-Tech/webapp-component-ui/commit/09dd215ecc751856e685abd9e3d9bb6780da9e07))

## **5.8.1** <sub><sup>2023-09-06 (bc653ce...bcffc1c)</sup></sub>

### Bug Fixes

- \[PROD\-12227\] fix float numbers input when using FR locale ([bc653ce](https://github.com/Cosmo-Tech/webapp-component-ui/commit/bc653ce))

## **5.8.0** <sub><sup>2023-08-30 (1e11f58...1233c25)</sup></sub>

### Features

- add optional prop 'gridRef' in Table component to retrieve ag-grid ref ([1233c25](https://github.com/Cosmo-Tech/webapp-component-ui/commit/1233c25))

### Bug Fixes

- fix possible duplicated keys in HierarchicalComboBox ([07599ce](https://github.com/Cosmo-Tech/webapp-component-ui/commit/07599ce))

## **5.7.1** <sub><sup>2023-08-28 (b34da2f...b2cbf64)</sup></sub>

### Bug Fixes

- \[PROD\-11756\] add fallbacks values to input components

## **5.7.0**&emsp;<sub><sup>2023-08-03 (784365fe2b61d7b645103bdad5e49fc1d4463e74...880bff477c23746d67163ae25be2db89a318e2c7)</sup></sub>

### Features

- \[PROD\-11630\] add file format validation for file upload input ([784365f](https://github.com/Cosmo-Tech/webapp-component-ui/commit/784365fe2b61d7b645103bdad5e49fc1d4463e74))

## **5.6.0** <sub><sup>2023-07-27 (067409a...2094153)</sup></sub>

### Features

- add native import & export buttons in `Table` toolbar ([067409a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/067409a))
- add optional prop `useSpan` in `FadingTooltip` ([067409a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/067409a))
- add native buttons in `Table` to add and delete rows ([e895f77](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e895f77))

### Bug Fixes

- \[PROD\-11885\] prevent leaving empty cells in columns of type string when option is disabled ([2094153](https://github.com/Cosmo-Tech/webapp-component-ui/commit/2094153))

## **5.5.0** <sub><sup>2023-07-25 (cd255f5...e1e7c90)</sup></sub>

### Features

- \[PROD\-10350\] add scenario run type in scenario manager cards ([cd255f5](https://github.com/Cosmo-Tech/webapp-component-ui/commit/cd255f5))
- \[PROD\-12032\] add error display and helperText to GenericToggleInput ([6504560](https://github.com/Cosmo-Tech/webapp-component-ui/commit/6504560))

### Bug Fixes

- \[PROD\-11662\] fix the way to pass errors and error messages in DesktopDatePicker ([e660eb4](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e660eb4))
- \[PROD\-11969\] minor improvements in error code display in SimplePowerBIReportEmbed ([49afe5a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/49afe5a))

## **5.4.0** <sub><sup>2023-06-30 (04c21be...0dcd78e)</sup></sub>

### Features

- \[PROD\-11209\] add optional tooltips for enum values in BasicEnumInput ([e1afa50](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e1afa50))
- \[PROD\-11627\] add helper text to display errors in BasicTextField component ([e6d8f04](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e6d8f04))

### Bug Fixes

- prevent empty fields in columns of type 'string' when `acceptsEmptyFields` option is disabled ([04c21be](https://github.com/Cosmo-Tech/webapp-component-ui/commit/04c21be))

## **5.3.0** <sub><sup>2023-06-22 (d669df3...7a44db0)</sup></sub>

### Features

- \[PROD\-10289\] add fullscreen button in table component ([99de0e6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/99de0e6))
- \[PROD\-10572\] add specific style to identify non-editable cells in Table ([6e1e501](https://github.com/Cosmo-Tech/webapp-component-ui/commit/6e1e501))
- \[PROD\-11628\] add errors display to Number and Date inputs ([c55035f](https://github.com/Cosmo-Tech/webapp-component-ui/commit/c55035f))

### Bug Fixes

- fix error in some input components when prop textFieldProps is not defined ([230d367](https://github.com/Cosmo-Tech/webapp-component-ui/commit/230d367))
- fix error when deleting the content of a table cell with DEL key ([7a44db0](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7a44db0))

## **5.2.2** <sub><sup>2023-09-07</sup></sub>

### Bug Fixes

- fix float numbers input when using FR locale ([1f86f9d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/1f86f9d8dbc1d56350ac7268870b2a90ea9985a0))

## **5.2.1** <sub><sup>2023-04-27 (7d03254...7d03254)</sup></sub>

- update dependencies

## **5.2.0** <sub><sup>2023-04-18 (ac3a5a7...23ed453)</sup></sub>

### Features

- \[PROD\-7902\] add optional "disabled" prop in RolesEditionButton ([2ce8e46](https://github.com/Cosmo-Tech/webapp-component-ui/commit/2ce8e46))
- \[PROD\-11431\] add optional customization props in SimpleTwoActionsDialog ([715887a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/715887a))

### Bug Fixes

- \[PROD\-11411\] in Table component, save cell when it loses focus ([ac3a5a7](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ac3a5a7))
- fix tooltips props in basic input components ([8caa6f0](https://github.com/Cosmo-Tech/webapp-component-ui/commit/8caa6f0))
- improve behavior of BasicInputNumber component ([23ed453](https://github.com/Cosmo-Tech/webapp-component-ui/commit/23ed453), [afd20e8](https://github.com/Cosmo-Tech/webapp-component-ui/commit/afd20e8))

## **5.1.0** <sub><sup>2022-08-27 (b505413d86d01cb4d4b05af3f30b264cc91cd6e1...b0d5c4db240065952d2400b51d4c5d5457d4b3b6)</sup></sub>

### Features

- \[PROD\-9516\] use vertical color indicator for modified inputs ([446662c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/446662c04bcb0e136d27e433a6d8ec5f1e30bd3a))

### Bug Fixes

- fix error banner's animation, handle error properly ([b0d5c4d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/b0d5c4db240065952d2400b51d4c5d5457d4b3b6))

<br>

## **5.0.1** <sub><sup>2023-03-01 (40c40f3...0844050)</sup></sub>

### Bug Fixes

- add DataIngestionInProgress status in ScenarioNode ([40c40f3](https://github.com/Cosmo-Tech/webapp-component-ui/commit/40c40f3))

## **5.0.0** <sub><sup>2023-02-28</sup></sub>

### Features

- add TooltipInfo component ([70175cf](https://github.com/Cosmo-Tech/webapp-component-ui/commit/70175cf))
- add BasicInputPlaceholder component ([b326339](https://github.com/Cosmo-Tech/webapp-component-ui/commit/b326339))

### Bug Fixes

- \[PROD\-11110\] Limit display of file load errors ([0ec67ca](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0ec67ca))
- change button and title labels in read\-only scenario sharing dialog ([810a9be](https://github.com/Cosmo-Tech/webapp-component-ui/commit/810a9be))

### BREAKING CHANGES

- remove component `BasicInputWrapper`
- migrate material-ui from v4 to v5

## **4.7.1** <sub><sup>2023-06-15 (94f1ab2...ca51fe3)</sup></sub>

### Bug Fixes

- make labels\.dataInTransfer prop optional in SimplePowerBIReportEmbed component to prevent breaking change ([5b7f6e8](https://github.com/Cosmo-Tech/webapp-component-ui/commit/5b7f6e8235cbaab4112d6379fc0897adfdb5f15c))

### Dependencies

- update dependencies

## **4.7.0** <sub><sup>2023-02-07 (7798970...7923344)</sup></sub>

### Features

- \[PROD\-10527\] add in progress animation on dashboard ([230ac04](https://github.com/Cosmo-Tech/webapp-component-ui/commit/230ac04))

### Bug Fixes

- \[PROD\-10462\] add fallback value when either `null` or `undefined` is provided to a slider component ([4ad6ea6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/4ad6ea6))
- remove unnecessarily required value prop in slider input ([127a225](https://github.com/Cosmo-Tech/webapp-component-ui/commit/127a225))

### Performance Improvements

- \[PROD\-10537\] imrpove scenario manager performance ([5447d67](https://github.com/Cosmo-Tech/webapp-component-ui/commit/5447d67))

## **4.6.0** <sub><sup>2023-01-24 (c481816...1f53a3f)</sup></sub>

### Features

- add DataIngestionInProgress state ([24b3b50](https://github.com/Cosmo-Tech/webapp-component-ui/commit/24b3b50))
- provide slider component for number input ([49088f6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/49088f6))
- add basic radio input scenario parameters ([10f935e](https://github.com/Cosmo-Tech/webapp-component-ui/commit/10f935e))
- add optional prop visibleScenarios in SimplePowerBIReportEmbed ([333843b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/333843b))
- add ErrorBoundary component ([ce71a6b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ce71a6b))

### Bug Fixes

- improve dashboards placeholder layout & style ([943fce8](https://github.com/Cosmo-Tech/webapp-component-ui/commit/943fce8))

## **4.5.0** <sub><sup>2023-01-06 (91c86ef...c3627dc)</sup></sub>

### Features

- implement Tooltip in all scenario parameters ([c3627dc](https://github.com/Cosmo-Tech/webapp-component-ui/commit/c3627dc))

### Bug Fixes

- prevent blanck power bi report ([928b2c6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/928b2c6))

## **4.4.0** <sub><sup>2022-12-19 (1cb512b...49d015e)</sup></sub>

### Features

- add ResourceCard component ([7360815](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7360815))
- add generic tooltip component FadingTooltip ([722e95b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/722e95b))
- add avatar shape option to DefaultAvatar ([e61a589](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e61a589))

## **4.3.3** <sub><sup>2022-11-17 (43d5d7f...7fe310d)</sup></sub>

### Bug Fixes

- Remove replaceAll not supported by node 14 ([85f5e0b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/85f5e0b))
- add selector on share scenario agents select render option ([7fe310d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7fe310d))

## **4.3.2** <sub><sup>2022-11-10 (5390c07...5390c07)</sup></sub>

- remove lodash dependency

## **4.3.1** <sub><sup>2022-11-09 (3bd45ef...24cd559)</sup></sub>

### Bug Fixes

- prevent 'none' role in new ACL entries if `preventNoneRoleForAgents` is enabled ([24cd559](https://github.com/Cosmo-Tech/webapp-component-ui/commit/24cd559))

## **4.3.0** <sub><sup>2022-11-04 (2a96ca1...84dca8f)</sup></sub>

### Features

- add PermissionsGate component
- allow fine\-grained permissions system to rename & delete scenarios in scenario manager
- add new component `SelectWithAction`
- add new component `RoleEditor`
- add new component `RolesEditionButton`

## **4.2.0** <sub><sup>2022-10-04 (71bd30f...8f39e54)</sup></sub>

### Features

- improvements in the CytoViz component:
  - graph exploration
  - node search
  - statistics HUD

### Bug Fixes

- prevent undesired re-renders of scenario creation dialog
- prevent disappearing title in scenario removal confirmation dialog

## **4.1.1** <sub><sup>2022-09-16 (7bf9186...c2fe7b1)</sup></sub>

### Bug Fixes

- minor improvements in CreateScenarioButton component ([389d5d1](https://github.com/Cosmo-Tech/webapp-component-ui/commit/389d5d1))
- fix possible warning in HierarchicalComboBox ([a0847c3](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a0847c3))
- make master scenario checkbox always visible in creation dialog ([7bf9186](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7bf9186))

### Performance Improvements

- prevent unnecessary re-renders in CytoViz component ([0a46558](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0a46558))

### Documentation

- fix broken EditableLabel page in documentation ([270e9db](https://github.com/Cosmo-Tech/webapp-component-ui/commit/270e9db))

## **4.1.0** <sub><sup>2022-08-23 (0d83459...5f966bf)</sup></sub>

### Features

- highlight adjacent edges in CytoViz component ([0d83459](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0d83459))
- use tooltip for every <IconButton\> ([79df591](https://github.com/Cosmo-Tech/webapp-component-ui/commit/79df591))

### Bug Fixes

- use contrastText for validated and rejected Chips ([e85aa30](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e85aa30))
- use correct variant for buttons according to Material Design ([29f317d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/29f317d))
- modify CREATE labels ([0897e28](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0897e28))
- adapt search part to new theme in Scenario Manager ([4b3e851](https://github.com/Cosmo-Tech/webapp-component-ui/commit/4b3e851))
- use secondary color for some form controls ([c5cec5b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/c5cec5b))
- add missing data-cy tag for CANCEL button in CreateScenarioDialog ([43d800d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/43d800d))

## **4.0.1** <sub><sup>2022-08-12 (af96745...23b1a34)</sup></sub>

### Bug Fixes

- fix published package

## **4.0.0** <sub><sup>2022-08-12 (af96745...23b1a34)</sup></sub>

### BREAKING CHANGES

- remove PrivateRoute and PublicRoute components ([805c6f4](https://github.com/Cosmo-Tech/webapp-component-ui/commit/805c6f4))
- update palette according to MaterialUI specifications ([266c972](https://github.com/Cosmo-Tech/webapp-component-ui/commit/266c972))
- remove username in AppBar, next to user's avatar, and use a tooltip instead ([266c972](https://github.com/Cosmo-Tech/webapp-component-ui/commit/266c972))

### Features

- add DefaultAvatar component generating a deterministic avatar based on user name ([5ad2630](https://github.com/Cosmo-Tech/webapp-component-ui/commit/5ad2630))
- add missing data-cy props in several components

### Bug Fixes

- move error label of EditableLabel component below the text field ([af96745](https://github.com/Cosmo-Tech/webapp-component-ui/commit/af96745))
- fix possible material\-ui warning caused by disabled Button in Tooltip ([ec73c3a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ec73c3a))

### Dependencies

- bump ag\-grid\-react & ag\-grid\-community to major version 28\.1\.0 ([9cc563d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9cc563d))

## **3.0.4** <sub><sup>2022-08-09 (7ae37ec...be91ebd)</sup></sub>

### Bug Fixes

- add missing data-cy selectors in several components
- fix possible material-ui warning caused by disabled Button in Tooltip ([ec73c3a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ec73c3a))
- attempt to prevent uncaught exception error on page switch ([be91ebd](https://github.com/Cosmo-Tech/webapp-component-ui/commit/be91ebd))

## **3.0.3** <sub><sup>2022-08-04 (075b7df...075b7df)</sup></sub>

### Bug Fixes

- force re-render of table cells when rows data prop changes ([075b7df](https://github.com/Cosmo-Tech/webapp-component-ui/commit/075b7df))

## **3.0.2** <sub><sup>2022-08-01 (af96745...af96745)</sup></sub>

### Bug Fixes

- set rename error message below the text field ([af96745](https://github.com/Cosmo-Tech/webapp-component-ui/commit/af96745))

## **3.0.1** <sub><sup>2022-07-26 (0bba147...0bba147)</sup></sub>

### Bug Fixes

- fix multiple placeholders shown in PowerBI report ([0bba147](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0bba147))

## **3.0.0** <sub><sup>2022-07-22 (b7ca23f...32e76f6)</sup></sub>

### Features

- implement EditableLable component ([cd23349](https://github.com/Cosmo-Tech/webapp-component-ui/commit/cd23349))

### Bug Fixes

- fix app crash when no dashboard for a run template and add unknownScenario placeholder ([248621f](https://github.com/Cosmo-Tech/webapp-component-ui/commit/248621f))

### BREAKING CHANGES

- ScenarioNode and ScenarioManagerTreeList have new required prop 'onScenarioName' ([cd23349](https://github.com/Cosmo-Tech/webapp-component-ui/commit/cd23349))

## **2.7.1** <sub><sup>2022-08-04 (95e5ddd...95e5ddd)</sup></sub>

### Bug Fixes

- force re-render of table cells when rows data prop changes ([95e5ddd](https://github.com/Cosmo-Tech/webapp-component-ui/commit/95e5ddd))

## **2.7.0** <sub><sup>2022-07-11 (ec50102...0caeba6)</sup></sub>

### Features

- make dismiss errors button optional in ErrorBanner component ([3491d22](https://github.com/Cosmo-Tech/webapp-component-ui/commit/3491d22))
- add error banner & placeholder in CytoViz component ([3fb6038](https://github.com/Cosmo-Tech/webapp-component-ui/commit/3fb6038))

### Bug Fixes

- fix loading spinner position in Table input component ([9bf486d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9bf486d))
- prevent selection of elements declared as not selectable in CytoViz component ([d9c3d69](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d9c3d69))
- fix export of FixedRatioContainer component ([fa42860](https://github.com/Cosmo-Tech/webapp-component-ui/commit/fa42860))
- fix console warning when using string type in table column ([09c2846](https://github.com/Cosmo-Tech/webapp-component-ui/commit/09c2846))
- fix error banner hidden behind powerbi loading screen ([0f6e6f9](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0f6e6f9))
- prevent showing 'null' status in ErrorBanner ([a316535](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a316535))

## **2.6.0** <sub><sup>2022-06-07 (ec50102...5bb6781)</sup></sub>

### Features

- create an error display banner ([93d162f](https://github.com/Cosmo-Tech/webapp-component-ui/commit/93d162f))

### Bug Fixes

- fix possible drag & drop error in ScenarioManagerTreeList ([0e9a018](https://github.com/Cosmo-Tech/webapp-component-ui/commit/0e9a018))
- set scenario creation button variant to 'contained' in dialog ([7e7d078](https://github.com/Cosmo-Tech/webapp-component-ui/commit/7e7d078))

## **2.5.1** <sub><sup>2022-05-06 (fec764c...a39a3c9)</sup></sub>

### Features

- add new component FixedRatioContainer ([d15990c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d15990c))
- add new component ScenarioValidationStatusChip ([cdfaabd](https://github.com/Cosmo-Tech/webapp-component-ui/commit/cdfaabd))
- add scenario validation chips in scenario manager ([67d876a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/67d876a))
- add scenario validation chips in HierarchicalComboBox ([a39ddc3](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a39ddc3))
- support empty fields in table component ([b25384a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/b25384a))

### Bug Fixes

- improve dynamic height of dashboards ([f537d84](https://github.com/Cosmo-Tech/webapp-component-ui/commit/f537d84))
- fix scenario manager crash when scenarios have the 'Unknown' run status ([250ce19](https://github.com/Cosmo-Tech/webapp-component-ui/commit/250ce19))

## **2.4.2** <sub><sup>2022-04-29 (250ce19...c8fcd87)</sup></sub>

### Bug Fixes

- fix scenario manager crash when scenarios have the 'Unknown' run status ([250ce19](https://github.com/Cosmo-Tech/webapp-component-ui/commit/250ce19))

## **2.4.1** <sub><sup>2022-04-29</sup></sub>

- update dependencies

## **2.4.0** <sub><sup>2022-04-29 (0a4c118...a39ddc3)</sup></sub>

### Features

- add new component ScenarioValidationStatusChip ([cdfaabd](https://github.com/Cosmo-Tech/webapp-component-ui/commit/cdfaabd))
- add scenario validation chips in scenario manager ([67d876a](https://github.com/Cosmo-Tech/webapp-component-ui/commit/67d876a))
- add scenario validation chips in HierarchicalComboBox ([a39ddc3](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a39ddc3))

## **2.3.0** <sub><sup>2022-04-19 (fec764c...6054be7)</sup></sub>

### Features

- add new component FixedRatioContainer ([d15990c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d15990c))

### Bug Fixes

- improve dynamic height of dashboards ([f537d84](https://github.com/Cosmo-Tech/webapp-component-ui/commit/f537d84))

## **2.2.4** <sub><sup>2022-04-29 (250ce19...55a3a39)</sup></sub>

### Bug Fixes

- fix scenario manager crash when scenarios have the 'Unknown' run status ([250ce19](https://github.com/Cosmo-Tech/webapp-component-ui/commit/250ce19))

## **2.2.3** <sub><sup>2022-04-04</sup></sub>

### Bug Fixes

- remove unexpected extra placeholder when no scenarios exist

## **2.2.2** <sub><sup>2022-04-04 (c62e32a...c62e32a)</sup></sub>

### Bug Fixes

- restore default behavior of SimplePowerBIReportEmbed component on missing prop iframeRatio

## **2.2.1** <sub><sup>2022-04-04 (3dd9546...20c2b81)</sup></sub>

- update dependencies

## **2.2.0** <sub><sup>2022-03-31 (0238ae0...de2f065)</sup></sub>

### Features

- add new optional prop **iframeRatio** to set a fixed display ratio to the PowerBI iframe ([de2f065](https://github.com/Cosmo-Tech/webapp-component-ui/commit/de2f065))

## **2.1.1** <sub><sup>2022-03-29 (07ddd92...06dd2a2)</sup></sub>

### Bug Fixes

- rename redirection props function and make it non\-required ([06dd2a2](https://github.com/Cosmo-Tech/webapp-component-ui/commit/06dd2a2))

## **2.1.0** <sub><sup>2022-03-28 (439810d...1fc09a0)</sup></sub>

### Features

- add redirection to scenario view button in scenario node ([1fc09a0](https://github.com/Cosmo-Tech/webapp-component-ui/commit/1fc09a0))

## **2.0.1** <sub><sup>2022-03-22 (439810d...fb75f85)</sup></sub>

### Bug Fixes

- make all nodes in scenario manager expanded by default ([a3c41c4](https://github.com/Cosmo-Tech/webapp-component-ui/commit/a3c41c4))
- upgrade collapse/expand behavior scenario tree ([fb75f85](https://github.com/Cosmo-Tech/webapp-component-ui/commit/fb75f85))

## **2.0.0** <sub><sup>2022-03-17</sup></sub>

### Features

- improve scenario manager UI ([770afac](https://github.com/Cosmo-Tech/webapp-component-ui/commit/770afac))
- add expand/collapse feature for ScenarioNode components ([770afac](https://github.com/Cosmo-Tech/webapp-component-ui/commit/770afac))

### BREAKING CHANGES

- ScenarioNode has new required props **isExpanded**, **setIsExpanded** and **labels\.running** ([770afac](https://github.com/Cosmo-Tech/webapp-component-ui/commit/770afac))

## **1.5.1** <sub><sup>2022-03-17</sup></sub>

### Bug Fixes

- remove unnecessary label prop _ariaLabelledby_ in SimpleTwoActionsDialog ([8ba15d5](https://github.com/Cosmo-Tech/webapp-component-ui/commit/8ba15d5))

## **1.5.0** <sub><sup>2022-03-16</sup></sub>

### Features

- add DontAskAgainDialog component ([05b8116](https://github.com/Cosmo-Tech/webapp-component-ui/commit/05b8116))

### Dependencies

- update dependencies

## **1.4.3** <sub><sup>2022-03-10</sup></sub>

### Bug Fixes

- let users add default cytoscape layouts in extra layouts by setting a null object ([25273b0](https://github.com/Cosmo-Tech/webapp-component-ui/commit/25273b0))

## **1.4.2** <sub><sup>2022-03-07</sup></sub>

- update dependencies

## **1.4.1** <sub><sup>2022-03-04</sup></sub>

### Bug Fixes

- set a max width for BasicDateInput component ([9b5db8b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9b5db8b))

## **1.4.0** <sub><sup>2022-03-02</sup></sub>

### Features

- add labels customization in CytoViz NodeData component ([99730df](https://github.com/Cosmo-Tech/webapp-component-ui/commit/99730df))
- allow edge selection, show placeholder when element has no data ([9ba5fa9](https://github.com/Cosmo-Tech/webapp-component-ui/commit/9ba5fa9))

## **1.3.4** <sub><sup>2022-02-28</sup></sub>

### Bug Fixes

- fix render prop type in PrivateRoute ([f95b340](https://github.com/Cosmo-Tech/webapp-component-ui/commit/f95b340))

## **1.3.3** <sub><sup>2022-02-28</sup></sub>

### Bug Fixes

- add missing props validation in PrivateRoute ([b0d746b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/b0d746b))

## **1.3.2** <sub><sup>2022-02-28</sup></sub>

- update dependencies

## **1.3.1** <sub><sup>2022-02-21</sup></sub>

- update dependencies

## **1.3.0** <sub><sup>2022-02-15</sup></sub>

### Features

- add CytoViz component for cytoscape visualization ([311d649](https://github.com/Cosmo-Tech/webapp-component-ui/commit/311d649))

## **1.2.5** <sub><sup>2022-02-14</sup></sub>

- update dependencies

## **1.2.4** <sub><sup>2022-02-07</sup></sub>

- update dependencies

## **1.2.3** <sub><sup>2022-01-31</sup></sub>

- update dependencies

## **1.2.2** <sub><sup>2022-01-25</sup></sub>

### Bug Fixes

- upgrade iframes place holder behavior ([398654c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/398654c))

## **1.2.0** <sub><sup>2022-01-24</sup></sub>

### Features

- add about button in help menu and some data\-cy props ([e086c5b](https://github.com/Cosmo-Tech/webapp-component-ui/commit/e086c5b))

### Dependencies

- update dependencies

## **1.1.10** <sub><sup>2022-01-17</sup></sub>

- update dependencies

## **1.1.9** <sub><sup>2022-01-05</sup></sub>

- update dependencies

## **1.1.8** <sub><sup>2021-12-20</sup></sub>

- update dependencies

## **1.1.7** <sub><sup>2021-12-17</sup></sub>

### Features

- in Table, Ag Grid theme is now passed as props ([996e48d](https://github.com/Cosmo-Tech/webapp-component-ui/commit/996e48d))

## **1.1.6** <sub><sup>2021-12-13</sup></sub>

- update dependencies

## **1.1.5** <sub><sup>2021-12-10</sup></sub>

### Bug Fixes

- add missing data-cy props in ErrorsPanel

## **1.1.4** <sub><sup>2021-12-06</sup></sub>

- update dependencies

## **1.1.3** <sub><sup>2021-12-03</sup></sub>

### Bug Fixes

- use "info" instead of "secondary" for "created" status ([1e117d4](https://github.com/Cosmo-Tech/webapp-component-ui/commit/1e117d4))

## **1.1.2** <sub><sup>2021-12-03</sup></sub>

### Bug Fixes

- set AG Grid theme color to light ([921b171](https://github.com/Cosmo-Tech/webapp-component-ui/commit/921b171))

## **1.1.0** <sub><sup>2021-12-02</sup></sub>

### Features

- add Table component ([f1ed531](https://github.com/Cosmo-Tech/webapp-component-ui/commit/f1ed531))
- add ErrorsPanel component ([69acb68](https://github.com/Cosmo-Tech/webapp-component-ui/commit/69acb68))

### Bug Fixes

- fix 'required props' console errors in ScenarioNode ([df5e158](https://github.com/Cosmo-Tech/webapp-component-ui/commit/df5e158))

## **1.0.12** <sub><sup>2021-11-29</sup></sub>

- update dependencies

## **1.0.11** <sub><sup>2021-11-22</sup></sub>

### Features

- add LoadingLine component ([bfb5e42](https://github.com/Cosmo-Tech/webapp-component-ui/commit/bfb5e42))

## **1.0.10** <sub><sup>2021-11-22</sup></sub>

- update dependencies

## **1.0.9** <sub><sup>2021-11-19</sup></sub>

### Features

- add scenario's name in delete confirmation dialog ([476b4e3](https://github.com/Cosmo-Tech/webapp-component-ui/commit/476b4e3))
- add possibility to show/hide delete scenario button globally ([18df909](https://github.com/Cosmo-Tech/webapp-component-ui/commit/18df909))

## **1.0.8** <sub><sup>2021-11-15</sup></sub>

- update dependencies

## **1.0.7** <sub><sup>2021-11-10</sup></sub>

### Features

- Add possibility to use AAD authentication mode for SimplePowerBIReportEmbed component ([ec61bbe](https://github.com/Cosmo-Tech/webapp-component-ui/commit/ec61bbe))

## **1.0.6** <sub><sup>2021-11-08</sup></sub>

- update dependencies

## **1.0.5** <sub><sup>2021-11-02</sup></sub>

- update dependencies

## **1.0.4** <sub><sup>2021-10-29</sup></sub>

### Bug Fixes

- harmonize support for additional props in all basic input components ([3019202](https://github.com/Cosmo-Tech/webapp-component-ui/commit/3019202))
- add data\-cy prop on file name labels ([8c2f7f2](https://github.com/Cosmo-Tech/webapp-component-ui/commit/8c2f7f2))

## **1.0.3** <sub><sup>2021-10-29</sup></sub>

### Bug Fixes

- fix console warning and error in create scenario dialog ([f96299e](https://github.com/Cosmo-Tech/webapp-component-ui/commit/f96299e))

## **1.0.2** <sub><sup>2021-10-26</sup></sub>

### Features

- implement help menu and some changes on user info menu ([404356c](https://github.com/Cosmo-Tech/webapp-component-ui/commit/404356c))

### Bug Fixes

- remove Chip from Typography to suppress warning ([d2c1603](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d2c1603))

## **1.0.1** <sub><sup>2021-10-25</sup></sub>

### Bug Fixes

- use chips with right colors for scenario run status ([d158aa6](https://github.com/Cosmo-Tech/webapp-component-ui/commit/d158aa6))

## **1.0.0** <sub><sup>2021-10-20</sup></sub>
