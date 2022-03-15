# Documentation for @cosmotech/ui components

Documentation for the UI components of [Cosmo Tech Azure Sample Webapp](https://github.com/Cosmo-Tech/azure-sample-webapp).
This project documents and shows how to use the components.

We use [docz](https://github.com/doczjs/docz) to build our documentation.

## Build & host documentation locally

Start with `yarn install` to install all dependencies requried to build the documentation.
Then, you can use `yarn docz:dev` to build the documentation and serve it locally at http://localhost:3000/ (default).

## Build Documentation

`yarn docz:build` will generate a static site for your site in `.docz/dist/`.

You can try it out with `yarn docz:serve` or by serving the generated site with your favorite static file server (e.g. `npx serve .docz/dist`).
Be careful if you have specified a `base` config in your **doczrc.js** it's not used in `yarn docz:serve`
By default the `base` config is specified for automatic deployment on our Github pages.

You can have `yarn docz:build` emit to a different directory by providing a path to the `dest` field in your **doczrc.js** or from the command line : `yarn docz:build --dest docs-site-directory`.

## Deploy Documentation

The output of docz consists of static assets only. This allows you to deploy your generated `docz` site with any static site hosting provider you'd like.

Start by building your site with `yarn docz:build`, if you haven't provided a `dest` flag to your config then you will find your generated files in `.docz/dist` to copy to the server.

## Clean docz dependencies

To remove docz build and clear dependencies, run `yarn docz:clean`
