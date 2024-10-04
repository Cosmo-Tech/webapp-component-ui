import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import resolve from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import { visualizer } from 'rollup-plugin-visualizer';

const pkg = JSON.parse(readFileSync('./package.json'));

export default {
  onwarn: (warning, warn) => {
    if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('"use client"')) return;
    warn(warning);
  },
  input: './src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
    {
      file: pkg.module,
      format: 'esm',
    },
  ],
  external: [
    'react',
    'react-dom',
    'react-dnd',
    'prop-types',
    'react-dnd-html5-backend',
    '@nosferatu500/react-dnd-scrollzone',
    'react-virtualized',
    '@mui/material',
    '@mui/icons-material',
    '@mui/styles',
    'react-i18next',
    'react-router-dom',
  ],
  plugins: [
    external(),
    postcss(),
    babel({
      exclude: ['node_modules/**', 'tests/**'],
      babelHelpers: 'bundled',
    }),
    resolve(),
    commonjs({ strictRequires: 'auto' }),
    image(),
    visualizer(),
  ],
};
