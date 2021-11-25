// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const TABLE_DATA_STATUS = {
  // No data
  EMPTY: 'EMPTY',
  // Uploading data from client file to webapp
  UPLOADING: 'UPLOADING',
  // Downloading data from Cloud Storage to webapp
  DOWNLOADING: 'DOWNLOADING',
  // Parsing data from CSV/Excel to agGrid format
  PARSING: 'PARSING',
  // Ready to be displayed
  READY: 'READY',
  // An error occured when loading or parsing the main source of data
  ERROR: 'ERROR',
};
