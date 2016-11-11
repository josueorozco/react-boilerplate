#!/usr/bin/env node

const shelljs = require('shelljs');
const animateProgress = require('./helpers/progress');
const chalk = require('chalk');
const addCheckMark = require('./helpers/checkmark');

const progress = animateProgress('Generating stats');

// Called after webpack has finished generating the stats.json file
function callback() {
    clearInterval(progress);

    /* eslint-disable prefer-template */
    process.stdout.write(
        '\n\nOpen ' + chalk.magenta('http://webpack.github.io/analyse/') + ' in your browser and upload the stats.json file!' +
        chalk.blue('\n(Tip: ' + chalk.italic('CMD + double-click') + ' the link!)\n\n')
    );
    /* eslint-enable prefer-template */
}

// Generate stats.json file with webpack
shelljs.exec(
    'webpack --config internals/webpack/webpack.prod.babel.js --profile --json > stats.json',
    addCheckMark.bind(null, callback) // Output a checkmark on completion
);
