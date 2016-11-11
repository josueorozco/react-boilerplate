/*
|--------------------------------------------------------------------------
| webpack.dev.babel.j
|--------------------------------------------------------------------------
|
| Development webpack configuration
|
*/

import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import cheerio from 'cheerio';
import logger from '../../server/logger';
import pkg from './../../package.json';

/*
|--------------------------------------------------------------------------
| DLL Plugin
|--------------------------------------------------------------------------
|
| Init from package.json
|
*/

const dllPlugin = pkg.dllPlugin;

/*
|--------------------------------------------------------------------------
| Generate index.html
|--------------------------------------------------------------------------
|
| We dynamically generate the HTML content in development so that the different
| DLL Javascript files are loaded in script tags and available to our application.
|
*/

function templateContent() {
    const html = fs.readFileSync(
        path.resolve(process.cwd(), 'app/index.html')
    ).toString();

    if (!dllPlugin) {
        return html;
    }

    const doc = cheerio(html);
    const body = doc.find('body');
    const dllNames = !dllPlugin.dlls ? ['reactBoilerplateDeps'] : Object.keys(dllPlugin.dlls);

    dllNames.forEach(dllName => body.append(`<script data-dll='true' src='/${dllName}.dll.js'></script>`));

    return doc.toString();
}

/*
|--------------------------------------------------------------------------
| Init plugins
|--------------------------------------------------------------------------
|
| Add plugins here.
|
*/

const plugins = [ // {{{
    // ------------------------------------------------------
    // Hot Reloading
    new webpack.HotModuleReplacementPlugin(),

    // ------------------------------------------------------
    // Do not include errors.
    // See https://github.com/webpack/docs/wiki/list-of-plugins#noerrorsplugin
    new webpack.NoErrorsPlugin(),

    // ------------------------------------------------------
    // Inject all files that are generated by webpack, e.g bundle.js
    new HtmlWebpackPlugin({
        inject: true,
        templateContent: templateContent(),
        minify: {
            removeComments: true,
            collapseWhitespace: true
        }
    })
]; // }}}

/*
|--------------------------------------------------------------------------
| Dependency Handlers
|--------------------------------------------------------------------------
|
| Select which plugins to use to optimize the bundle's handling of third
| party dependencies.
|
| If there is a dllPlugin key on the project's package.json, the Webpack
| DLL Plugin will be used. Otherwize, the CommonsChunkPlugin will be used.
|
*/

function dependencyHandlers() {
    // ------------------------------------------------------
    // Don't do anything during the DLL Build step
    if (process.env.BUILDING_DLL) {
        return [];
    }

    // ------------------------------------------------------
    // If the package.json does not have a dllPlugin property, use the CommonsChunkPlugin
    if (!dllPlugin) {
        return [
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                children: true,
                minChunks: 2,
                async: true
            })
        ];
    }

    // ------------------------------------------------------
    // Init DLL Path
    const dllPath = path.resolve(process.cwd(), dllPlugin.path || 'node_modules/react-boilerplate-dlls');

    // ------------------------------------------------------
    // If DLLs aren't explicitly defined, we assume all
    // production dependencies listed in package.json
    //
    // Reminder: You need to exclude any server side dependencies
    // by listing them in dllConfig.exclude.
    //
    // @see https://github.com/mxstbr/react-boilerplate/tree/master/docs/general/webpack.md
    if (!dllPlugin.dlls) {
        const manifestPath = path.resolve(dllPath, 'reactBoilerplateDeps.json');

        if (!fs.existsSync(manifestPath)) {
            logger.error('The DLL manifest is missing. Please run `npm run build:dll`');
            process.exit(0);
        }

        return [
            new webpack.DllReferencePlugin({
                context: process.cwd(),
                manifest: require(manifestPath) // eslint-disable-line global-require
            })
        ];
    }

    // ------------------------------------------------------
    // If DLLs are explicitly defined, we automatically create a DLLReferencePlugin for each of them.
    const dllManifests = Object.keys(dllPlugin.dlls).map(name => path.join(dllPath, `/${name}.json`));

    return dllManifests.map((manifestPath) => {
        if (!fs.existsSync(path)) {
            if (!fs.existsSync(manifestPath)) {
                logger.error(`The following Webpack DLL manifest is missing: ${path.basename(manifestPath)}`);
                logger.error(`Expected to find it in ${dllPath}`);
                logger.error('Please run: npm run build:dll');

                process.exit(0);
            }
        }

        return new webpack.DllReferencePlugin({
            context: process.cwd(),
            manifest: require(manifestPath) // eslint-disable-line global-require
        });
    });
}

/*
|--------------------------------------------------------------------------
| Export default
|--------------------------------------------------------------------------
|
| Require base and export as default.
|
*/

module.exports = require('./webpack.base.babel')({
    // ------------------------------------------------------
    // Add hot reloading in development
    entry: [ // {{{
        // ------------------------------------------------------
        // Necessary for hot reloading with IE
        'eventsource-polyfill',
        'webpack-hot-middleware/client',
        path.join(process.cwd(), 'app/app.js')
    ], // }}}

    // ------------------------------------------------------
    // Don't use hashes in dev mode for better performance
    output: {
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
    },

    // ------------------------------------------------------
    // Add development plugins
    plugins: dependencyHandlers().concat(plugins),

    // ------------------------------------------------------
    // Tell babel that we want to hot-reload
    babelQuery: {
        presets: ['react-hmre']
    },

    // ------------------------------------------------------
    // Emit a source map for easier debugging
    devtool: 'eval-source-map'
});
