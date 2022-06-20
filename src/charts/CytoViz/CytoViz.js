// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, CircularProgress, Drawer, IconButton, MenuItem, Select, Slider, Tabs, Tab } from '@material-ui/core';
import {
  ChevronRight as ChevronRightIcon,
  ChevronLeft as ChevronLeftIcon,
  Settings as SettingsIcon,
  AccountTree as AccountTreeIcon,
} from '@material-ui/icons';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import BubbleSets from 'cytoscape-bubblesets';
import dagre from 'cytoscape-dagre';
import useStyles from './style';
import { ElementData, TabPanel } from './components';

cytoscape.use(BubbleSets);
cytoscape.use(dagre);

const DEFAULT_LAYOUTS = ['dagre'];

export const CytoViz = (props) => {
  const classes = useStyles();
  const {
    cytoscapeStylesheet,
    defaultSettings,
    elements,
    extraLayouts,
    labels,
    loading,
    getElementDetails,
    bubblesets,
  } = props;

  let getElementDetailsCallback = getElementDetails;
  if (!getElementDetailsCallback) {
    // eslint-disable-next-line react/display-name
    getElementDetailsCallback = (element) => <ElementData data={element.data()} labels={labels.elementData} />;
    getElementDetailsCallback.displayName = 'ElementData';
  }

  // Layout
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [currentDrawerTab, setCurrentDrawerTab] = React.useState(0);
  const [currentElementDetails, setCurrentElementDetails] = React.useState(null);
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const changeDrawerTab = (event, newValue) => {
    setCurrentDrawerTab(newValue);
  };

  // Settings
  const [currentLayout, setCurrentLayout] = React.useState(defaultSettings.layout);
  const [useCompactMode, setUseCompactMode] = React.useState(defaultSettings.useCompactMode);
  const [spacingFactor, setSpacingFactor] = React.useState(defaultSettings.spacingFactor);
  const [zoomPrecision, setZoomPrecision] = React.useState([
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

  useEffect(() => {
    Object.values(extraLayouts).forEach((layout) => {
      if (layout) {
        cytoscape.use(layout);
      }
    });
  }, [extraLayouts]);

  const initCytoscape = (cytoscapeRef) => {
    cytoscapeRef.removeAllListeners();
    // Prevent multiple selection & init elements selection behavior
    cytoscapeRef.on('select', 'node, edge', function (e) {
      cytoscapeRef.elements().not(e.target).unselect();
      const selectedElement = e.target;
      setCurrentElementDetails(getElementDetailsCallback(selectedElement));
    });
    cytoscapeRef.on('unselect', 'node, edge', function (e) {
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

  const loadingPlaceholder = (
    <div className={classes.loadingContainer}>
      <span className={classes.loadingText}>{labels.loading}</span>
      <CircularProgress size={18} />
    </div>
  );

  return (
    <div className={classes.root} id="cytoviz-root">
      {loading && loadingPlaceholder}
      {!loading && (
        <>
          <CytoscapeComponent
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
          <div className={classes.openDrawerButton}>
            <IconButton onClick={openDrawer}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Drawer
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
                <Tab icon={<AccountTreeIcon />} label={labels.elementDetails} />
                <Tab icon={<SettingsIcon />} label={labels.settings.title} />
              </Tabs>
              <IconButton onClick={closeDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </div>
            <div className={classes.drawerContent}>
              <TabPanel value={currentDrawerTab} index={0}>
                {currentElementDetails || labels.noSelectedElement}
              </TabPanel>
              <TabPanel value={currentDrawerTab} index={1}>
                <div className={classes.settingsContainer}>
                  <div className={classes.settingLine}>
                    <div className={classes.settingLabel}>{labels.settings.layout}</div>
                    <div className={classes.settingInputContainer}>
                      <Select
                        value={currentLayout}
                        onChange={changeCurrentLayout}
                        inputProps={{ 'aria-label': 'Layout' }}
                      >
                        {DEFAULT_LAYOUTS.concat(Object.keys(extraLayouts)).map((layoutName) => (
                          <MenuItem key={layoutName} value={layoutName}>
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
                        checked={useCompactMode}
                        onChange={changeUseCompactMode}
                        name="useCompactMode"
                        color="primary"
                      />
                    </div>
                  </div>
                  <div className={classes.settingLine}>
                    <div className={classes.settingLabel}>{labels.settings.spacingFactor}</div>
                    <div className={classes.settingInputContainer}>
                      <Slider
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
                    <div className={classes.settingLabel}>{labels.settings.zoomLimits}</div>
                    <div className={classes.settingInputContainer}>
                      <Slider
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
      )}
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
     loading: 'string',
     noSelectedElement: 'string',
     settings: {
       compactMode: 'string',
       layout: 'string',
       title: 'string',
       spacingFactor: 'string',
       zoomLimits: 'string',
     }
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
};
