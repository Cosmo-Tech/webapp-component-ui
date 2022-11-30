// Copyright (c) Cosmo Tech.
// Licensed under the MIT license.

export const getByDataCy = (dataCy, parent = document) => {
  return parent.querySelector(`[data-cy="${dataCy}"]`);
};

export const getAllByDataCyRegEx = (dataCyRegEx, parent = document) => {
  const output = [];
  parent.querySelectorAll('*').forEach((node) => {
    if (dataCyRegEx.test(node.attributes['data-cy']?.value)) {
      output.push(node);
    }
  });

  return output;
};
