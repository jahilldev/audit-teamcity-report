import { Configuration, DefinePlugin, BannerPlugin } from 'webpack';
import nodeExternals from 'webpack-node-externals';
import * as path from 'path';
import { config } from './src/config';

/* -----------------------------------
 *
 * Flags
 *
 * -------------------------------- */

const RELEASE = process.env.NODE_ENV === 'production';

/* -----------------------------------
 *
 * Shared
 *
 * -------------------------------- */

const shared: Configuration = {
  mode: RELEASE ? 'production' : 'development',
  target: 'node',
  externals: [nodeExternals()],
  devtool: !RELEASE ? 'eval-source-map' : void 0,
  context: path.join(__dirname, `./${config.path.src}`),
  cache: !RELEASE,
  output: {
    path: path.join(__dirname, `./${config.path.dist}`),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', 'json'],
    alias: {
      '@': path.join(__dirname, `./${config.path.src}`),
    },
  },
  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  performance: {
    hints: !RELEASE ? 'warning' : void 0,
  },
  plugins: [
    new DefinePlugin({
      __DEV__: !RELEASE,
    }),
  ],
  stats: {
    colors: true,
    timings: true,
  },
};

/* -----------------------------------
 *
 * Main
 *
 * -------------------------------- */

const main = Object.assign(shared, {
  entry: {
    main: path.join(__dirname, `./${config.path.src}/main.ts`),
  },
});

/* -----------------------------------
 *
 * CLI
 *
 * -------------------------------- */

const cli = Object.assign(shared, {
  entry: {
    cli: path.join(__dirname, `./${config.path.src}/cli.ts`),
  },
  plugins: [
    new DefinePlugin({
      __DEV__: !RELEASE,
    }),
    new BannerPlugin({
      banner: '#! /usr/bin/env node',
      raw: true,
    }),
  ],
});

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export default [main, cli];
