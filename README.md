# WebApp Component UI

The **_Webapp UI components library_** aims to be a library of [React](https://reactjs.org/) components that can be used to customize/enhance our [Azure Sample Webapp](https://github.com/Cosmo-Tech/azure-sample-webapp).

You can use this project as a components library to build a front-end for your own Digital Twin solution.

Feel free to contribute to this library.
The more components we have, the easier your webapp customization will be.

Documentation for the components is available in the [doc](https://github.com/Cosmo-Tech/webapp-component-ui/tree/main/doc) folder.

## Build project

`yarn install && yarn build` will package the project.

## Use locally with yalc

yalc is a tool that allow you to use local compiled packages in projects instead of published packages.

- First use:

install yalc :
`npm i -g yalc`

publish package locally:
`yalc push --sig`

link package to project (in project directory):
`yalc add @cosmotech/ui`
`yalc link @cosmotech/ui`
`yarn/npm install`

- Update package:

rebuild package:
`yarn build`

publish updated package locally:
`yalc push --sig`

Refresh browser if project is running for see changes.

- Remove link to project (in project directory):
  `yalc remove @cosmotech/ui`
  `yarn/npm install`
