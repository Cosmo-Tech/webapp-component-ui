// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  CircularProgress,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Tabs,
  Tab,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
  InputAdornment,
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  AccountTree as AccountTreeIcon,
  BubbleChart as BubbleChartIcon,
  ExpandMore as ExpandMoreIcon,
  Done as DoneIcon,
} from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import BubbleSets from 'cytoscape-bubblesets';
import dagre from 'cytoscape-dagre';
import useStyles from './style';
import { ElementData, TabPanel } from './components';
import { ErrorBanner } from '../../misc';

cytoscape.use(BubbleSets);
cytoscape.use(dagre);

const DEFAULT_LAYOUTS = ['dagre'];
export const CytoViz = (props) => {
  const classes = useStyles();
  const {
    bubblesets,
    cytoscapeStylesheet,
    defaultSettings,
    elements,
    error,
    extraLayouts,
    getElementDetails,
    labels,
    loading,
    placeholderMessage,
  } = props;

  const labels_ = { ...DEFAULT_LABELS, ...labels };

  let getElementDetailsCallback = getElementDetails;
  if (!getElementDetailsCallback) {
    // eslint-disable-next-line react/display-name
    getElementDetailsCallback = (element) => <ElementData data={element.data()} labels={labels_.elementData} />;
    getElementDetailsCallback.displayName = 'ElementData';
  }

  // Layout
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentDrawerTab, setCurrentDrawerTab] = useState(0);
  const [currentElementDetails, setCurrentElementDetails] = useState(null);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const changeDrawerTab = (event, newValue) => {
    setCurrentDrawerTab(newValue);
  };
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // Settings
  const [currentLayout, setCurrentLayout] = useState(defaultSettings.layout);
  const [useCompactMode, setUseCompactMode] = useState(defaultSettings.useCompactMode);
  const [spacingFactor, setSpacingFactor] = useState(defaultSettings.spacingFactor);
  const [zoomPrecision, setZoomPrecision] = useState([
    Math.log10(defaultSettings.minZoom),
    Math.log10(defaultSettings.maxZoom),
  ]);

  const changeCurrentLayout = (event) => {
    setCurrentLayout(event.target.value);
  };
  const toggleUseCompactMode = (event) => {
    setUseCompactMode(!useCompactMode);
  };
  const changeUseCompactMode = (event) => {
    setUseCompactMode(event.target.checked);
  };
  const changeSpacingFactor = (event, newValue) => {
    setSpacingFactor(newValue);
  };
  const changeZoomPrecision = (event, newValue) => {
    setZoomPrecision(newValue);
  };
  //Cyto
  const [cytoRef, setCytoRef] = useState(null);
  const [selectedNodes, setSelectedNodes] = useState(cytoRef?.nodes().at(0) ?? []);
  const [exploreDepth, setExploreDepth] = useState(1);
  const [selectedEdgeClasses, setSelectedEdgeClasses] = useState(['ALL']);
  const [numberFieldHasError, setNumberFieldHasError] = useState(false);

  const handleChangeExploreDepth = (event) => {
    const newValue = event.target.value;
    console.log(newValue);
    if (newValue.match(/^[1-9][0-9]*/)) {
      setExploreDepth(newValue);
      setNumberFieldHasError(false);
    } else if (newValue.match(/^$/)) {
      setExploreDepth(newValue);
      setNumberFieldHasError(true);
    } else {
      setNumberFieldHasError(true);
    }
  };

  useEffect(() => {
    Object.values(extraLayouts).forEach((layout) => {
      if (layout) {
        cytoscape.use(layout);
      }
    });
  }, [extraLayouts]);

  const initCytoscape = (cytoscapeRef) => {
    if (cytoRef != null && cytoRef === cytoscapeRef) {
      return;
    }
    setCytoRef(cytoscapeRef);
    console.log(cytoscapeRef.edges().classNames());
    cytoscapeRef.removeAllListeners();
    // Prevent multiple selection & init elements selection behavior
    cytoscapeRef.on('select', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      const selectedElement = e.target;
      selectedElement.select();
      selectedElement.outgoers('edge').data('asOutEdgeHighlighted', true);
      selectedElement.incomers('edge').data('asInEdgeHighlighted', true);
      setCurrentElementDetails(getElementDetailsCallback(selectedElement));
    });
    cytoscapeRef.on('unselect', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      setCurrentElementDetails(null);
    });
    // Add handling of double click events
    cytoscapeRef.on('dbltap', 'node, edge', function (e) {
      const selectedElement = e.target;
      if (selectedElement.selectable()) {
        setCurrentDrawerTab(0);
        setIsDrawerOpen(true);
        setCurrentElementDetails(getElementDetailsCallback(selectedElement));
      }
    });

    // Init bubblesets
    const bb = cytoscapeRef.bubbleSets();
    for (const groupName in bubblesets) {
      const nodesGroup = cytoscapeRef.nodes(`.${groupName}`);
      const groupColor = bubblesets[groupName];
      bb.addPath(nodesGroup, undefined, null, {
        virtualEdges: true,
        style: {
          fill: groupColor,
          stroke: groupColor,
        },
      });
    }
  };

  const errorBanner = error && <ErrorBanner error={error} labels={labels_.errorBanner} />;
  const loadingPlaceholder = loading && !error && !placeholderMessage && (
    <div data-cy="cytoviz-loading-container" className={classes.loadingContainer}>
      <span className={classes.loadingText}>{labels_.loading}</span>
      <CircularProgress size={18} />
    </div>
  );
  const placeholder = placeholderMessage && (
    <div data-cy="cytoviz-placeholder" className={classes.placeholder}>
      <span className={classes.placeholderText}>{placeholderMessage}</span>
    </div>
  );

  const cytoscapeScene = !loading && !placeholderMessage && (
    <>
      <CytoscapeComponent
        id="cytoviz-cytoscape-scene" // Component does not forward data-cy prop, use id instead
        cy={initCytoscape}
        stylesheet={cytoscapeStylesheet}
        className={classes.cytoscapeContainer}
        elements={elements}
        layout={{
          name: currentLayout,
          nodeDimensionsIncludeLabels: !useCompactMode,
          spacingFactor: spacingFactor,
        }}
        minZoom={10 ** zoomPrecision[0]}
        maxZoom={10 ** zoomPrecision[1]}
      />
      <div data-cy="cytoviz-open-drawer-button" className={classes.openDrawerButton}>
        <IconButton onClick={openDrawer}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Drawer
        data-cy="cytoviz-drawer"
        className={classes.drawer}
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('cytoviz-root'),
          style: { position: 'absolute' },
        }}
        p={0}
      >
        <div className={classes.drawerHeader}>
          <Tabs
            value={currentDrawerTab}
            onChange={changeDrawerTab}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="Cytoscape visualization side drawer"
          >
            <Tab
              data-cy="cytoviz-drawer-details-tab-button"
              icon={<AccountTreeIcon />}
              label={labels_.elementDetails}
            />
            <Tab data-cy="cytoviz-drawer-settings-tab-button" icon={<SettingsIcon />} label={labels_.settings.title} />
          </Tabs>
          <IconButton data-cy="cytoviz-close-drawer-button" onClick={closeDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div className={classes.drawerContent}>
          <TabPanel
            data-cy="cytoviz-drawer-details-tab-content"
            value={currentDrawerTab}
            index={0}
            className={classes.tabPanel}
          >
            <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                Node Details
              </AccordionSummary>
              <AccordionDetails>{currentElementDetails || labels_.noSelectedElement}</AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                Find a Node
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.querySearchByID}>
                  Search by ID
                  <TextField
                    InputProps={{
                      startAdornment: <InputAdornment position="start">id: </InputAdornment>,
                      endAdornment: (
                        <InputAdornment position="end">
                          <DoneIcon color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    size="small"
                    variant="outlined"
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                Explore a Subgraph
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.queryTextfields}>
                  Select the starting Node(s)
                  <Autocomplete
                    multiple
                    limitTags={3}
                    value={selectedNodes}
                    onChange={(event, newValue) => {
                      console.log(`newValue:`);
                      console.log(newValue);
                      newValue.map((node) => node.select());
                      setSelectedNodes(newValue);
                    }}
                    options={cytoRef?.nodes() ?? []}
                    getOptionLabel={(node) => node.data('label')}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                  <div className={classes.querySearchByID}>
                    Limit the search depth
                    <TextField
                      size="Small"
                      type="number"
                      error={numberFieldHasError}
                      errorText={'enter an positive integer'}
                      value={exploreDepth}
                      onChange={handleChangeExploreDepth}
                      InputProps={{
                        inputProps: {
                          max: 1000,
                          min: 1,
                        },
                      }}
                    />
                    Choose the flow direction
                    <div className={classes.queryEdgetypes}>
                      IN-Edges
                      <Checkbox color="primary" />
                      OUT-Edges
                      <Checkbox color="primary" />
                    </div>
                  </div>
                  Include relation types
                  <Autocomplete
                    multiple
                    limitTags={3}
                    value={selectedEdgeClasses}
                    // onChange={(event, newValue) => {
                    //   if (newValue.includes('ALL')) {
                    //     setSelectedEdgeClasses('ALL');
                    //   } else {
                    //     setSelectedEdgeClasses(newValue);
                    //   }
                    //   console.log(selectedEdgeClasses);
                    // }}
                    // onChange={(event, newValue) => {
                    //   setSelectedEdgeClasses(newValue);
                    //   console.log(selectedEdgeClasses);
                    // }}
                    options={cytoRef?.edges().classNames().unshift('ALL') ?? ['ALL']}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                  <Button variant="contained" color="primary">
                    Explore
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ExpandMoreIcon />}>
                Query
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.queryTextfields}>
                  <p>Write custom queries in the cypher graphquery language.</p>

                  <Link href="https://neo4j.com/developer/cypher/" target="_blank" rel="noopener">
                    Cypher Doc
                  </Link>

                  <div className={classes.queryHeader}>
                    <TextField
                      disabled
                      label="Redis Command "
                      defaultValue="GRAPH.QUERY"
                      variant="filled"
                      size="small"
                    />
                    <TextField disabled label="Instance" defaultValue="Current" variant="filled" size="small" />
                  </div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Query"
                    multiline
                    rows={8}
                    defaultValue="Match (n1)-[r]->(n2) return n1,r,n2" //dont forget to add the extra the quotationmarks around the query
                    variant="outlined"
                  />
                  <Button variant="contained" color="primary">
                    Run
                  </Button>
                </div>
              </AccordionDetails>
            </Accordion>
          </TabPanel>
          <TabPanel data-cy="cytoviz-drawer-settings-tab-content" value={currentDrawerTab} index={1}>
            <div className={classes.settingsContainer}>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel}>{labels_.settings.layout}</div>
                <div className={classes.settingInputContainer}>
                  <Select
                    data-cy="cytoviz-layout-selector"
                    value={currentLayout}
                    onChange={changeCurrentLayout}
                    inputProps={{ 'aria-label': 'Layout' }}
                  >
                    {DEFAULT_LAYOUTS.concat(Object.keys(extraLayouts)).map((layoutName) => (
                      <MenuItem
                        data-cy={`cytoviz-layout-item-${layoutName.toLowerCase()}`}
                        key={layoutName}
                        value={layoutName}
                      >
                        {layoutName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
              </div>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel} onClick={toggleUseCompactMode}>
                  {labels.settings.compactMode}
                </div>
                <div className={classes.settingInputContainer}>
                  <Checkbox
                    data-cy="cytoviz-compact-mode-checkbox"
                    checked={useCompactMode}
                    onChange={changeUseCompactMode}
                    name="useCompactMode"
                    color="primary"
                  />
                </div>
              </div>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel}>{labels_.settings.spacingFactor}</div>
                <div className={classes.settingInputContainer}>
                  <Slider
                    data-cy="cytoviz-spacing-factor-slider"
                    className={classes.settingsSlider}
                    color="primary"
                    value={spacingFactor}
                    min={0.1}
                    step={0.1}
                    max={10}
                    onChange={changeSpacingFactor}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel}>{labels_.settings.zoomLimits}</div>
                <div className={classes.settingInputContainer}>
                  <Slider
                    data-cy="cytoviz-zoom-limits-slider"
                    className={classes.settingsSlider}
                    color="primary"
                    value={zoomPrecision}
                    min={-3}
                    step={1}
                    max={2}
                    onChange={changeZoomPrecision}
                    valueLabelFormat={(value) => 10 ** value}
                    valueLabelDisplay="auto"
                  />
                </div>
              </div>
            </div>
          </TabPanel>
        </div>
      </Drawer>
    </>
  );

  return (
    <div data-cy="cytoviz-container" className={classes.root} id="cytoviz-root">
      {errorBanner}
      {placeholder}
      {loadingPlaceholder}
      {cytoscapeScene}
    </div>
  );
};

CytoViz.propTypes = {
  /**
   * Array representing the stylesheets to apply in cytoscape
   */
  cytoscapeStylesheet: PropTypes.array,
  /**
   * Default values for the options in the settings panel
   */
  defaultSettings: PropTypes.shape({
    layout: PropTypes.string,
    minZoom: PropTypes.number,
    maxZoom: PropTypes.number,
    useCompactMode: PropTypes.bool,
    spacingFactor: PropTypes.number,
  }),
  /**
   * Array of cytoscape elements to display
   */
  elements: PropTypes.array.isRequired,
  /**
   * Object of extra layouts to register in cytoscape. The keys of this object must be the layout names, and the values
   must be the extension object to provide to cytoscape.use(...). If you want to add a default cytoscape layout
   (e.g. breadthfirst, circle, concentric, ...), use null instead of an extension object.
   */
  extraLayouts: PropTypes.object,
  /**
   * Function to generate a string or React component from the data of the currently selected element (node or edge).
   */
  getElementDetails: PropTypes.func,
  /**
   * Map of bubblesets to display in cytoscape graph. Keys of this object are the group names (each group can be
   represented by a compound node in cytoscape elements to get a better layout), and values are the color of the group.
   */
  bubblesets: PropTypes.object,
  /**
   * Structure
   * <pre>
   {
     elementDetails: 'string',
     placeholder: 'string',
     errorBanner: {
       tooLongErrorMessage: 'string',
       dismissButtonText: 'string',
       secondButtonText: 'string',
       toggledButtonText: 'string',
     },
     loading: 'string',
     noSelectedElement: 'string',
     settings: {
       compactMode: 'string',
       layout: 'string',
       title: 'string',
       spacingFactor: 'string',
       zoomLimits: 'string',
     },
     elementData: {
       dictKey: 'string',
       dictValue: 'string',
     }
   }
   * </pre>
   */
  labels: PropTypes.object,
  /**
   * Boolean defining whether or not the data are loading.
   While loading is true, a spinner is displayed instead of the cytoscape component.
   */
  loading: PropTypes.bool,
  /**
   * Error object describing an error. When this object is not null nor undefined, it is displayed in a banner inside
   the component.
   */
  error: PropTypes.object,
  /**
  * Optional placeholder string. When this prop is "truthy", this placeholder message is displayed instead
  of the cytoscape scene.
  */
  placeholderMessage: PropTypes.string,
};

const DEFAULT_LABELS = {
  elementDetails: 'Details',
  loading: 'Loading...',
  noSelectedElement: 'Select a node or edge to show its data',
  settings: {
    compactMode: 'Compact layout',
    layout: 'Layout',
    title: 'Settings',
    spacingFactor: 'Spacing factor',
    zoomLimits: 'Min & max zoom',
  },
  elementData: {
    dictKey: 'Key',
    dictValue: 'Value',
  },
};

CytoViz.defaultProps = {
  cytoscapeStylesheet: [],
  defaultSettings: {
    layout: DEFAULT_LAYOUTS[0],
    minZoom: 0.1,
    maxZoom: 1,
    useCompactMode: true,
    spacingFactor: 1,
  },
  extraLayouts: {},
  groups: {},
  labels: DEFAULT_LABELS,
  loading: false,
  placeholderMessage: null,
};
