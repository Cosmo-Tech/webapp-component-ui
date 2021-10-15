# WebApp Component UI

The **_Webapp UI components library_** aims to be a library of [React](https://reactjs.org/) components that can be used to customize/enhance our [Azure Sample Webapp](https://github.com/Cosmo-Tech/azure-sample-webapp).

This project documents and shows how to use the components.

You can use this project as a component library to build a front-end for your own Digital Twin solution.

Feel free to contribute to this library.
The more components we have, the easier your webapp customization will be.

We use [docz](https://github.com/doczjs/docz) to build our documentation.

Here are some useful command lines (extracted from docz documentation):

## Build project

`yarn build` will package the project.

This command will allow you to use `yarn link` and `ỳarn link @cosmotech/ui` commands to deal with this project locally.

## Run documentation locally

`yarn docz:dev` will install all dependencies needed to build the documentation and serve locally under http://localhost:3000/ by default.

## Build Documentation

`yarn docz:build` will generate a static site for your site in `.docz/dist/`.

You can try it out with `yarn docz:serve` or by serving the generated site with your favorite static file server (e.g. `npx serve .docz/dist`).
Be careful if you have specified a `base` config in your **doczrc.js** it's not used in `yarn docz:serve`
By default the `base` config is specified for automatic deployment on our Github pages.

You can have `yarn docz:build` emit to a different directory by providing a path to the `dest` field in your **doczrc.js** or from the command line : `yarn docz:build --dest docs-site-directory`.

## Deploy Documentation

The output of docz consists of static assets only. This allows you to deploy your generated `docz` site with any static site hosting provider you'd like.

Start by building your site with `yarn docz:build`, if you haven't provided a `dest` flag to your config then you will find your generated files in `.docz/dist` to copy to the server.
