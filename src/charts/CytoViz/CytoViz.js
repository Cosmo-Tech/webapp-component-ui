// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Drawer,
  IconButton,
  MenuItem,
  Select,
  Slider,
  Tab,
  Tabs,
  Checkbox,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Menu,
  Switch,
  Autocomplete,
} from '@mui/material';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  AccountTree as AccountTreeIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import BubbleSets from 'cytoscape-bubblesets';
import dagre from 'cytoscape-dagre';
import useStyles from './style';
import { ElementData, TabPanel, StatsHUD } from './components';
import { ErrorBanner, FadingTooltip } from '../../misc';
cytoscape.use(BubbleSets);
cytoscape.use(dagre);

const GRAPH_EXPLORATION_STEP_DURATION_IN_MS = 1500;
const DEFAULT_LAYOUTS = ['dagre'];
const DEFAULT_CONTEXT_MENU_POSITION = {
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

  // Default styles for hidden nodes & edges can be overridden in cytoscapeStylesheet by using the selectors below:
  //   - edge[?hidden]
  //   - node[?hidden]
  useEffect(() => {
    cytoscapeStylesheet.unshift({
      selector: 'edge[?hidden]',
      style: { visibility: 'hidden' },
    });
    cytoscapeStylesheet.unshift({
      selector: 'node[?hidden]',
      style: { visibility: 'hidden' },
    });
  }, [cytoscapeStylesheet]);

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
  const [expandedPanel, setExpandedPanel] = useState('nodeDetailsPanel');
  const closeDrawer = () => setIsDrawerOpen(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const changeDrawerTab = (event, newValue) => setCurrentDrawerTab(newValue);
  const expandAccordionPanel = (panel) => (event, newExpanded) => setExpandedPanel(newExpanded ? panel : false);

  // Settings
  const [currentLayout, setCurrentLayout] = useState(defaultSettings.layout ?? DEFAULT_LAYOUTS[0]);
  const [useCompactMode, setUseCompactMode] = useState(defaultSettings.useCompactMode ?? true);
  const [showStats, setShowStats] = useState(defaultSettings.showStats ?? false);
  const [spacingFactor, setSpacingFactor] = useState(defaultSettings.spacingFactor ?? 1);
  const [zoomPrecision, setZoomPrecision] = useState([
    Math.log10(defaultSettings.minZoom ?? 0.1),
    Math.log10(defaultSettings.maxZoom ?? 1),
  ]);
  const changeCurrentLayout = (event) => setCurrentLayout(event.target.value);
  const toggleUseCompactMode = (event) => setUseCompactMode(!useCompactMode);
  const changeUseCompactMode = (event) => setUseCompactMode(event.target.checked);
  const toggleShowStats = (event) => setShowStats(!showStats);
  const changeShowStats = (event) => setShowStats(event.target.checked);
  const changeSpacingFactor = (event, newValue) => setSpacingFactor(newValue);
  const changeZoomPrecision = (event, newValue) => setZoomPrecision(newValue);

  // Cytoscape graph & scene
  const cytoRef = useRef(null);
  const [cytoAsState, setCytoAsState] = useState(null);
  const [graphNodes, setGraphNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [selectedNodesFieldHasError, setSelectedNodesFieldHasError] = useState(false);
  const [explorationDepth, setExplorationDepth] = useState(10);
  const [flowDirection, setFlowDirection] = useState({ inEdges: false, outEdges: true });
  const [childrenAreNeighbors, setChildrenAreNeighbors] = useState(false);
  const [edgeClassOptions, setEdgeClassOptions] = useState([]);
  const [excludedEdgeClasses, setExcludedEdgeClasses] = useState([]);
  const [explorationDepthFieldHasError, setExplorationDepthFieldHasError] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState(DEFAULT_CONTEXT_MENU_POSITION);
  const [isExplorationRunning, setIsExplorationRunning] = useState(false);

  const closeContextMenu = () => {
    setContextMenuPosition(DEFAULT_CONTEXT_MENU_POSITION);
  };
  const changeSelectedNodesForExploration = (nodes) => {
    nodes.map((node) => node.select());
    setSelectedNodes(nodes);
    setSelectedNodesFieldHasError(nodes.length === 0);
  };
  useEffect(() => {
    if (loading === true) setSelectedNodes([]);
  }, [loading]);
  const checkExplorationDepth = (event) => {
    const newValue = event.target.value;
    if (newValue.match(/^[0-9][0-9]*/)) {
      setExplorationDepth(parseInt(newValue));
      setExplorationDepthFieldHasError(false);
    } else if (newValue.match(/^$/)) {
      setExplorationDepth(NaN);
      setExplorationDepthFieldHasError(true);
    } else {
      setExplorationDepthFieldHasError(true);
    }
  };

  const startGraphExploration = () => {
    setIsExplorationRunning(true);
    closeDrawer();

    const selectedNodesCyto = cytoRef.current.collection();
    selectedNodes.forEach((node) => {
      selectedNodesCyto.merge(cytoRef.current.getElementById(node._private.data.id));
    });

    const visitedNodes = cytoRef.current.collection();
    cytoRef.current.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
    cytoRef.current.elements().data('hidden', true);
    // remove excluded edges
    const edgesToRemove = cytoRef.current.collection();
    excludedEdgeClasses.forEach((excludedEdgeClass) =>
      edgesToRemove.merge(cytoRef.current.elements(`edge.${excludedEdgeClass}`))
    );
    cytoRef.current.remove(edgesToRemove);

    const onComplete = () => {
      cytoRef.current.add(edgesToRemove);
      cytoRef.current.elements().data('hidden', false);
      setIsExplorationRunning(false);
      openDrawer();
    };

    exploreOneStep(
      selectedNodesCyto,
      visitedNodes,
      explorationDepth,
      flowDirection.inEdges,
      flowDirection.outEdges,
      onComplete,
      GRAPH_EXPLORATION_STEP_DURATION_IN_MS
    );
  };

  const exploreOneStep = (
    startingNodes,
    visitedNodes,
    depth,
    followInEdges,
    followOutEdges,
    onComplete,
    stepDuration
  ) => {
    let neighbors = cytoRef.current.collection(); // get an empty collection
    startingNodes.forEach((node) => {
      if (followInEdges) {
        neighbors.merge(node.incomers('node'));
        neighbors.merge(node.parent());
      }
      if (followOutEdges) {
        neighbors.merge(node.outgoers('node'));
        neighbors.merge(node.children());
      }
      if (childrenAreNeighbors) {
        neighbors.merge(node.parent().children());
      }
    });
    startingNodes.data('hidden', false);
    startingNodes.parent().data('hidden', false); // otherwise the element won't be shown
    visitedNodes.edgesWith(visitedNodes).data('hidden', false);
    startingNodes.edgesWith(visitedNodes).data('hidden', false);

    visitedNodes.merge(startingNodes); // mark all visited nodes
    neighbors = neighbors.subtract(visitedNodes); // do not put already discovered nodes in the next searchrun

    cytoRef.current.animate({
      fit: { eles: startingNodes },
      center: { eles: startingNodes },
      duration: 1000,
      complete: depth === 0 ? onComplete() : {},
    });
    if (depth < 1) {
      return;
    }
    // to reduce maximal runtime
    if (depth > 1 && neighbors.length === 0) {
      depth = 1;
    }
    setTimeout(() => {
      exploreOneStep(neighbors, visitedNodes, depth - 1, followInEdges, followOutEdges, onComplete, stepDuration);
    }, stepDuration);
  };

  const getEdgesClasses = (cytoscapeRef) => {
    const edgeClassesSet = new Set();
    cytoscapeRef.edges().forEach((edge) => {
      edge.classes().forEach((currentClass) => edgeClassesSet.add(currentClass));
    });
    return Array.from(edgeClassesSet);
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
    setGraphNodes(cytoscapeRef.nodes().toArray());
    setEdgeClassOptions(getEdgesClasses(cytoscapeRef));
    setCytoAsState(cytoscapeRef);
    cytoscapeRef.removeAllListeners();
    cytoscapeRef.elements().removeAllListeners();

    // Prevent multiple selection & init elements selection behavior
    cytoscapeRef.on('select cxttap', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      const selectedElement = e.target;
      selectedElement.select();
      selectedElement.outgoers('edge').data('asOutEdgeHighlighted', true);
      selectedElement.incomers('edge').data('asInEdgeHighlighted', true);
      selectedElement.neighborhood().data('hidden', false);
      setCurrentElementDetails(getElementDetailsCallback(selectedElement));
    });

    cytoscapeRef.on('unselect tapunselect', 'node, edge', function (e) {
      cytoscapeRef.edges().data({ asInEdgeHighlighted: false, asOutEdgeHighlighted: false });
      setCurrentElementDetails(null);
    });

    // Add handling of double click events
    cytoscapeRef.on('dbltap', 'node, edge', function (e) {
      const selectedElement = e.target;
      selectedElement.neighborhood().data('hidden', false);
      if (selectedElement.selectable()) {
        openDrawer();
        setExpandedPanel('nodeDetailsPanel');
        setCurrentElementDetails(getElementDetailsCallback(selectedElement));
      }
    });

    cytoscapeRef.on('cxttap', function (e) {
      if (cytoscapeRef.nodes('node:selected').length > 0) {
        e.preventDefault();
        setContextMenuPosition({
          mouseX: e.originalEvent.clientX - 2,
          mouseY: e.originalEvent.clientY - 4,
        });
      }
    });

    cytoscapeRef.on('click', function (e) {
      closeContextMenu();
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
          spacingFactor,
        }}
        minZoom={10 ** zoomPrecision[0]}
        maxZoom={10 ** zoomPrecision[1]}
      />
      <div data-cy="cytoviz-open-drawer-button" className={classes.openDrawerButton}>
        <FadingTooltip title={labels_.settings.open}>
          <IconButton onClick={openDrawer} size="large">
            <ChevronRightIcon />
          </IconButton>
        </FadingTooltip>
      </div>
      <Drawer
        data-cy="cytoviz-drawer"
        elevation={1}
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
          <FadingTooltip title={labels_.settings.close}>
            <IconButton data-cy="cytoviz-close-drawer-button" onClick={closeDrawer} size="large">
              <ChevronLeftIcon />
            </IconButton>
          </FadingTooltip>
        </div>
        <div className={classes.drawerContent}>
          <TabPanel
            data-cy="cytoviz-drawer-details-tab-content"
            value={currentDrawerTab}
            index={0}
            className={classes.tabPanel}
          >
            <Accordion
              square
              expanded={expandedPanel === 'nodeDetailsPanel'}
              onChange={expandAccordionPanel('nodeDetailsPanel')}
            >
              <AccordionSummary
                aria-controls="nodeDetailsPanel-content"
                id="nodeDetailsPanel-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1">{labels_.accordion.nodeDetails}</Typography>
              </AccordionSummary>
              <AccordionDetails>{currentElementDetails || labels_.noSelectedElement}</AccordionDetails>
            </Accordion>
            <Accordion
              square
              expanded={expandedPanel === 'findNodePanel'}
              onChange={expandAccordionPanel('findNodePanel')}
            >
              <AccordionSummary
                aria-controls="findNodePanel-content"
                id="findNodePanel-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1">{labels_.accordion.findNode.headline}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.querySearchByID}>
                  {labels_.accordion.findNode.searchByID}
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
                    options={graphNodes}
                    getOptionLabel={(node) => node.data('label')}
                    isOptionEqualToValue={(option, node) => node.data('label') === option.data('label')}
                    renderInput={(params) => (
                      <TextField {...params} aria-label={labels_.accordion.findNode.searchByID} size="small" />
                    )}
                  />
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion
              square
              expanded={expandedPanel === 'exploreGraphPanel'}
              onChange={expandAccordionPanel('exploreGraphPanel')}
            >
              <AccordionSummary
                aria-controls="exploreGraphPanel-content"
                id="exploreGraphPanel-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1">{labels_.accordion.exploreGraph.headline}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.queryTextfields}>
                  {labels_.accordion.exploreGraph.startingNodes}
                  <Autocomplete
                    multiple
                    limitTags={2}
                    value={selectedNodes}
                    onChange={(event, nodes) => changeSelectedNodesForExploration(nodes)}
                    options={graphNodes}
                    getOptionLabel={(node) => node.data('label')}
                    isOptionEqualToValue={(option, node) => node.data('label') === option.data('label')}
                    renderInput={(params) => (
                      <TextField
                        aria-label={labels_.accordion.exploreGraph.startingNodes}
                        helperText={selectedNodesFieldHasError ? labels_.accordion.exploreGraph.startingNodesError : ''}
                        error={selectedNodesFieldHasError}
                        {...params}
                      />
                    )}
                  />
                  <div className={classes.querySearchDepth}>
                    {labels_.accordion.exploreGraph.limitDepth}
                    <TextField
                      aria-label={labels_.accordion.exploreGraph.limitDepth}
                      size="small"
                      type="number"
                      error={explorationDepthFieldHasError}
                      helperText={explorationDepthFieldHasError ? labels_.accordion.exploreGraph.limitDepthError : ''}
                      value={explorationDepth}
                      onChange={checkExplorationDepth}
                      InputProps={{
                        inputProps: {
                          max: 1000,
                          min: 1,
                        },
                      }}
                      variant="standard"
                    />
                    <div>
                      <p>{labels_.accordion.exploreGraph.flowDirection}</p>
                      {!(flowDirection.inEdges || flowDirection.outEdges) && (
                        <Typography variant="inherit" color="error">
                          {labels_.accordion.exploreGraph.flowDirectionError}
                        </Typography>
                      )}
                    </div>
                    <div className={classes.queryEdgetypes}>
                      {labels_.accordion.exploreGraph.inEdges}
                      <Checkbox
                        aria-label={labels_.accordion.exploreGraph.inEdges}
                        color="primary"
                        checked={flowDirection.inEdges}
                        onChange={(event) => {
                          setFlowDirection({ ...flowDirection, inEdges: event.target.checked });
                        }}
                      />
                      {labels_.accordion.exploreGraph.outEdges}
                      <Checkbox
                        aria-label={labels_.accordion.exploreGraph.outEdges}
                        color="primary"
                        checked={flowDirection.outEdges}
                        onChange={(event) => {
                          setFlowDirection({ ...flowDirection, outEdges: event.target.checked });
                        }}
                      />
                    </div>
                  </div>
                  {labels_.accordion.exploreGraph.excludeEdges}
                  <Autocomplete
                    multiple
                    limitTags={2}
                    value={excludedEdgeClasses}
                    onChange={(event, newValue) => {
                      setExcludedEdgeClasses(newValue);
                    }}
                    options={edgeClassOptions}
                    renderInput={(params) => (
                      <TextField {...params} aria-label={labels_.accordion.exploreGraph.excludeEdges} />
                    )}
                  />
                  <div className={classes.querySearchDepth}>
                    {labels_.accordion.exploreGraph.compoundNeighbors}
                    <Checkbox
                      aria-label={labels_.accordion.exploreGraph.compoundNeighbors}
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
                    onClick={startGraphExploration}
                    disabled={
                      explorationDepthFieldHasError ||
                      isExplorationRunning ||
                      !(flowDirection.inEdges || flowDirection.outEdges) ||
                      selectedNodesFieldHasError
                    }
                  >
                    {labels_.accordion.exploreGraph.launch}
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
                    variant="standard"
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
                  <Switch
                    data-cy="cytoviz-compact-mode-switch"
                    checked={useCompactMode}
                    onChange={changeUseCompactMode}
                    name="useCompactMode"
                    color="primary"
                  />
                </div>
              </div>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel} onClick={toggleShowStats}>
                  {labels_.settings.showStats ?? 'Cytoscape statistics'}
                </div>
                <div className={classes.settingInputContainer}>
                  <Switch checked={showStats} onChange={changeShowStats} name="showStats" color="primary" />
                </div>
              </div>
              <div className={classes.settingLine}>
                <div className={classes.settingLabel}>{labels_.settings.spacingFactor}</div>
                <div className={classes.settingInputContainer}>
                  <Slider
                    data-cy="cytoviz-spacing-factor-slider"
                    className={classes.settingsSlider}
                    color="primary"
                    size="small"
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
                    size="small"
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
        open={contextMenuPosition.mouseY !== null}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenuPosition.mouseY !== null && contextMenuPosition.mouseX !== null
            ? { top: contextMenuPosition.mouseY, left: contextMenuPosition.mouseX }
            : undefined
        }
      >
        <MenuItem
          onClick={() => {
            changeSelectedNodesForExploration(cytoRef.current.nodes('node:selected').toArray());
            openDrawer();
            setCurrentDrawerTab(0);
            setExpandedPanel('exploreGraphPanel');
            closeContextMenu();
          }}
        >
          {labels_.accordion.exploreGraph.launch}
        </MenuItem>
      </Menu>
      {cytoAsState && showStats && <StatsHUD cytoAsState={cytoAsState} />}
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
    showStats: PropTypes.bool,
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
       showStats: 'string',
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
    showStats: 'Cytoscape statistics',
  },
  elementData: {
    dictKey: 'Key',
    dictValue: 'Value',
  },
  accordion: {
    nodeDetails: 'Node details',
    findNode: {
      headline: 'Find a node',
      searchByID: 'Search by ID',
    },
    exploreGraph: {
      headline: 'Explore a subgraph',
      startingNodes: 'Select the starting node(s)',
      startingNodesError: 'Select at least one node',
      limitDepth: 'Limit the search depth',
      limitDepthError: 'Enter a positive integer',
      flowDirection: 'Choose the flow direction',
      flowDirectionError: 'Select at least one',
      inEdges: 'IN-Edges',
      outEdges: 'OUT-Edges',
      excludeEdges: 'Exclude relation types',
      compoundNeighbors: 'Include the other entities of a compound',
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
    showStats: false,
    spacingFactor: 1,
  },
  extraLayouts: {},
  groups: {},
  labels: DEFAULT_LABELS,
  loading: false,
  placeholderMessage: null,
};
