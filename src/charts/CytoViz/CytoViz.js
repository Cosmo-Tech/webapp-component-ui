// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Drawer,
  Fade,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Tab,
  Tabs,
  Tooltip,
  Checkbox,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Menu,
} from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  AccountTree as AccountTreeIcon,
  ExpandMore as ExpandMoreIcon,
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
const initialCTXMenuState = {
  mouseX: null,
  mouseY: null,
};
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
  const [expanded, setExpanded] = useState('panel1');

  const handleAccordeonChange = (panel) => (event, newExpanded) => {
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
  // Cyto
  const cytoRef = useRef(null);
  const [nodesInCyto, setNodesInCyto] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNodesFieldHasError, setSelectedNodesFieldHasError] = useState(false);
  const [exploreDepth, setExploreDepth] = useState(1);
  const [flowDirection, setFlowDirection] = useState({ inEdges: false, outEdges: true });
  const [childrenAreNeighbors, setChildrenAreNeighbors] = useState(true);
  const [edgeClassOptions, setEdgeClassOptions] = useState([]);
  const [deselectedEdgeClasses, setDeselectedEdgeClasses] = useState([]);
  const [numberFieldHasError, setNumberFieldHasError] = useState(false);
  const [positionCTXMenu, setPositionCTXMenu] = useState(initialCTXMenuState);
  const [explorationRunning, setExplorationRunning] = useState(false);

  const handleCTXMenuOpen = (event) => {
    event.preventDefault();
    setPositionCTXMenu({
      mouseX: event.originalEvent.clientX - 2,
      mouseY: event.originalEvent.clientY - 4,
    });
  };
  const handleCTXMenuClose = () => {
    setPositionCTXMenu(initialCTXMenuState);
  };
  const handleExploreDepthNumEntered = (event) => {
    const newValue = event.target.value;
    if (newValue.match(/^[0-9][0-9]*/)) {
      setExploreDepth(parseInt(newValue));
      setNumberFieldHasError(false);
    } else if (newValue.match(/^$/)) {
      setExploreDepth(parseInt(newValue));
      setNumberFieldHasError(true);
    } else {
      setNumberFieldHasError(true);
    }
  };
  const handleExploreGraphCTXClicked = () => {
    setSelectedNodes(cytoRef.current.nodes('node:selected'));
    openDrawer();
    setExpanded('panel3');
    handleCTXMenuClose();
  };
  const handleExploreDemanded = () => {
    if (selectedNodes.length === 0) {
      setSelectedNodesFieldHasError(true);
      return;
    }
    if (numberFieldHasError || !(flowDirection.inEdges || flowDirection.outEdges) || !cytoRef.current) {
      return;
    }
    setExplorationRunning(true);
    closeDrawer();
    let selectedNodesCyto = cytoRef.current.collection();
    selectedNodes.forEach((node) => {
      selectedNodesCyto = selectedNodesCyto.union(cytoRef.current.getElementById(node._private.data.id));
    });
    const visitedNodes = cytoRef.current.collection();
    cytoRef.current.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
    cytoRef.current.elements().data('hidden', true);
    // remove excluded edges
    let edgesToRemove = cytoRef.current.collection();
    deselectedEdgeClasses.forEach(
      (excludedEdgeClass) =>
        (edgesToRemove = edgesToRemove.union(cytoRef.current.elements(`edge.${excludedEdgeClass}`)))
    );
    cytoRef.current.remove(edgesToRemove);
    breadthFirstExplore(
      selectedNodesCyto,
      visitedNodes,
      exploreDepth,
      flowDirection.inEdges,
      flowDirection.outEdges,
      edgesToRemove
    );
  };
  const breadthFirstExplore = (startingNodes, visitedNodes, depth, followInEdges, followOutEdges, edgesToRemove) => {
    startingNodes.data('hidden', false);
    startingNodes.parent().data('hidden', false); // otherwise the element wont be shown
    visitedNodes.edgesWith(visitedNodes).data('hidden', false);
    startingNodes.edgesWith(visitedNodes).data('hidden', false);
    cytoRef.current.animate({
      fit: { eles: startingNodes },
      center: { eles: startingNodes },
      duration: 1000,
      complete:
        depth === 0
          ? () => {
              edgesToRemove = cytoRef.current.add(edgesToRemove);
              cytoRef.current.batch(() => {
                edgesToRemove.data('hidden', true);
              });
              openDrawer();
            }
          : () => {},
    });
    let neighbors = cytoRef.current.collection(); // get an empty collection
    startingNodes.forEach((node) => {
      if (followInEdges) {
        neighbors = neighbors.union(node.incomers('node'));
        neighbors = neighbors.union(node.parent());
      }
      if (followOutEdges) {
        neighbors = neighbors.union(node.outgoers('node'));
        neighbors = neighbors.union(node.children());
      }
      if (childrenAreNeighbors) {
        neighbors = neighbors.union(node.parent().children());
      }
    });
    visitedNodes = visitedNodes.union(startingNodes); // mark all visited nodes
    neighbors = neighbors.subtract(visitedNodes); // do not put already discovered nodes in the next searchrun
    // wait until animation is finished
    if (depth < 1) {
      setExplorationRunning(false);
      return;
    }
    setTimeout(() => {
      breadthFirstExplore(neighbors, visitedNodes, depth - 1, followInEdges, followOutEdges, edgesToRemove);
    }, 1500);
  };

  useEffect(() => {
    Object.values(extraLayouts).forEach((layout) => {
      if (layout) {
        cytoscape.use(layout);
      }
    });
  }, [extraLayouts]);

  const initCytoscape = (cytoscapeRef) => {
    if (cytoRef.current != null && cytoRef.current === cytoscapeRef) {
      return;
    }
    cytoRef.current = cytoscapeRef;
    const allNodesInCyto = cytoscapeRef.nodes().toArray();
    setNodesInCyto(allNodesInCyto);
    const edgeClasses = {};
    // needs to be done this way because eles.classes() does not return all classes
    cytoscapeRef.edges().forEach((edge) => {
      edge.classes().forEach((currentClass) => {
        edgeClasses[currentClass] = true;
      });
    });
    setEdgeClassOptions(Object.keys(edgeClasses));
    cytoscapeRef.removeAllListeners();
    cytoscapeRef.elements().removeAllListeners();
    // Prevent multiple selection & init elements selection behavior
    cytoscapeRef.on('select', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      const selectedElement = e.target;
      selectedElement.select();
      selectedElement.outgoers('edge').data('asOutEdgeHighlighted', true);
      selectedElement.incomers('edge').data('asInEdgeHighlighted', true);
      selectedElement.neighborhood().data('hidden', false);
      setCurrentElementDetails(getElementDetailsCallback(selectedElement));
    });
    cytoscapeRef.on('unselect', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      setCurrentElementDetails(null);
    });
    // Add handling of double click events
    cytoscapeRef.on('dbltap', 'node, edge', function (e) {
      const selectedElement = e.target;
      selectedElement.neighborhood().data('hidden', false);
      if (selectedElement.selectable()) {
        openDrawer();
        setExpanded('panel1');
        setCurrentElementDetails(getElementDetailsCallback(selectedElement));
      }
    });
    cytoscapeRef.on('cxttap', function (e) {
      if (cytoscapeRef.nodes('node:selected').length > 0) {
        handleCTXMenuOpen(e);
      }
    });
    cytoscapeRef.on('click', function (e) {
      handleCTXMenuClose();
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
        <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={labels_.settings.open}>
          <IconButton
            onClick={() => {
              openDrawer();
              handleCTXMenuClose();
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Tooltip>
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
          <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title={labels_.settings.close}>
            <IconButton data-cy="cytoviz-close-drawer-button" onClick={closeDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.drawerContent}>
          <TabPanel
            data-cy="cytoviz-drawer-details-tab-content"
            value={currentDrawerTab}
            index={0}
            className={classes.tabPanel}
          >
            <Accordion square expanded={expanded === 'panel1'} onChange={handleAccordeonChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ExpandMoreIcon />}>
                {labels_.accordeon.nodeDetails}
              </AccordionSummary>
              <AccordionDetails>{currentElementDetails || labels_.noSelectedElement}</AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel2'} onChange={handleAccordeonChange('panel2')}>
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ExpandMoreIcon />}>
                {labels_.accordeon.findNode.headline}
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.querySearchByID}>
                  {labels_.accordeon.findNode.searchByID}
                  <Autocomplete
                    onChange={(event, node) => {
                      if (node) {
                        node.parent().data('hidden', false);
                        node.closedNeighborhood().data('hidden', false);
                        cytoRef.current?.animate({
                          center: { eles: node },
                          duration: 1000,
                        });
                        node.select();
                      }
                    }}
                    options={nodesInCyto}
                    getOptionLabel={(node) => node.data('label')}
                    getOptionSelected={(option, node) => node.data('label') === option.data('label')}
                    renderInput={(params) => <TextField {...params} variant="outlined" size="Small" />}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion square expanded={expanded === 'panel3'} onChange={handleAccordeonChange('panel3')}>
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ExpandMoreIcon />}>
                {labels_.accordeon.exploreGraph.headline}
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.queryTextfields}>
                  {labels_.accordeon.exploreGraph.startingNodes}
                  <Autocomplete
                    multiple
                    limitTags={2}
                    value={selectedNodes}
                    onChange={(event, newValue) => {
                      newValue.map((node) => node.select());
                      setSelectedNodes(newValue);
                      setSelectedNodesFieldHasError(false);
                    }}
                    options={nodesInCyto}
                    getOptionLabel={(node) => node.data('label')}
                    getOptionSelected={(option, node) => node.data('label') === option.data('label')}
                    renderInput={(params) => (
                      <TextField
                        helperText={selectedNodesFieldHasError ? labels_.accordeon.exploreGraph.startingNodesError : ''}
                        error={selectedNodesFieldHasError}
                        {...params}
                        variant="outlined"
                      />
                    )}
                  />
                  <div className={classes.querySearchDepth}>
                    {labels_.accordeon.exploreGraph.limitDepth}
                    <TextField
                      size="Small"
                      type="number"
                      error={numberFieldHasError}
                      helperText={numberFieldHasError ? labels_.accordeon.exploreGraph.limitDepthError : ''}
                      value={exploreDepth}
                      onChange={handleExploreDepthNumEntered}
                      InputProps={{
                        inputProps: {
                          max: 1000,
                          min: 1,
                        },
                      }}
                    />
                    <div>
                      <p> {labels_.accordeon.exploreGraph.flowDirection}</p>
                      {!(flowDirection.inEdges || flowDirection.outEdges) && (
                        <Typography variant="inherit" color="error">
                          {labels_.accordeon.exploreGraph.flowDirectionError}
                        </Typography>
                      )}
                    </div>
                    <div className={classes.queryEdgetypes}>
                      {labels_.accordeon.exploreGraph.inEdges}
                      <Checkbox
                        color="primary"
                        checked={flowDirection.inEdges}
                        onChange={(event) => {
                          setFlowDirection({ ...flowDirection, inEdges: event.target.checked });
                        }}
                      />
                      {labels_.accordeon.exploreGraph.outEdges}
                      <Checkbox
                        color="primary"
                        checked={flowDirection.outEdges}
                        onChange={(event) => {
                          setFlowDirection({ ...flowDirection, outEdges: event.target.checked });
                        }}
                      />
                    </div>
                  </div>
                  {labels_.accordeon.exploreGraph.excludeEdges}
                  <Autocomplete
                    multiple
                    limitTags={2}
                    value={deselectedEdgeClasses}
                    onChange={(event, newValue) => {
                      setDeselectedEdgeClasses(newValue);
                    }}
                    options={edgeClassOptions}
                    renderInput={(params) => <TextField {...params} variant="outlined" />}
                  />
                  <div className={classes.querySearchDepth}>
                    {labels_.accordeon.exploreGraph.compoundNeighbors}
                    <Checkbox
                      color="primary"
                      checked={childrenAreNeighbors}
                      onChange={(event) => {
                        setChildrenAreNeighbors(event.target.checked);
                      }}
                    />
                  </div>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleExploreDemanded}
                    disabled={
                      explorationRunning ||
                      !(flowDirection.inEdges || flowDirection.outEdges) ||
                      selectedNodesFieldHasError
                    }
                  >
                    {labels_.accordeon.exploreGraph.launch}
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
                  {labels_.settings.compactMode}
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
      <Menu
        keepMounted
        open={positionCTXMenu.mouseY !== null}
        onClose={handleCTXMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={
          positionCTXMenu.mouseY !== null && positionCTXMenu.mouseX !== null
            ? { top: positionCTXMenu.mouseY, left: positionCTXMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleExploreGraphCTXClicked}>Explore</MenuItem>
      </Menu>
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
       open: 'string',
       close: 'string',
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
    open: 'Open settings',
    close: 'Close settings',
  },
  elementData: {
    dictKey: 'Key',
    dictValue: 'Value',
  },
  accordeon: {
    nodeDetails: 'Node Details',
    findNode: {
      headline: 'Find a Node',
      searchByID: 'Search by ID',
    },
    exploreGraph: {
      headline: 'Explore a Subgraph',
      startingNodes: 'Select the starting Node(s)',
      startingNodesError: 'Select at least one node',
      limitDepth: 'Limit the search depth',
      limitDepthError: 'Enter a positive integer',
      flowDirection: 'Choose the flow direction',
      flowDirectionError: '*Select at least one',
      inEdges: 'IN-Edges',
      outEdges: 'OUT-Edges',
      excludeEdges: 'Exclude relation types',
      compoundNeighbors: 'Consider entities in compounds as neighbors',
      launch: 'Explore',
    },
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
