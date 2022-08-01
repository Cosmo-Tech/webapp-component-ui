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

## **3.0.0** <sub><sup>2022-07-22 (4ccba12...e47bbc2)</sup></sub>

### Features

- implement EditableLable component ([4ccba12](https://github.com/Cosmo-Tech/webapp-component-ui/commit/4ccba12))

### BREAKING CHANGES

- ScenarioNode and ScenarioManagerTreeList have new required prop 'onScenarioName' ([4ccba12](https://github.com/Cosmo-Tech/webapp-component-ui/commit/4ccba12))

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
