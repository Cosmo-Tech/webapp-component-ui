import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import image from '@rollup/plugin-image';
import visualizer from 'rollup-plugin-visualizer';
import pkg from './package.json';

export default {
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm'
    }
  ],
  external: [
    'react',
    'react-dom',
    'react-dnd',
    'prop-types',
    'react-dnd-html5-backend',
    '@nosferatu500/react-dnd-scrollzone',
    'react-virtualized',
    'lodash.isequal',
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/lab',
    '@material-ui/styles',
    'lodash',
    'react-i18next',
    'react-router-dom'
  ],
  plugins: [
    external(),
    postcss(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    resolve(),
    commonjs(),
    image(),
    visualizer()
  ]
};
