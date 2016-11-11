#!/usr/bin/env node
/* eslint-disable prefer-arrow-callback, prefer-template */
process.stdin.resume();
process.stdin.setEncoding('utf8');

const ngrok = require('ngrok');
const psi = require('psi');
const chalk = require('chalk');

/**
 * log
 *
 * @param string
 * @returns {void}
 */
function log(string) {
    process.stdout.write(string);
}

function runPsi(url) {
    log('\nStarting PageSpeed Insights');
    psi.output(url).then(function runPsiOutput() {
        process.exit(0);
    });
}

function startTunnel(cb) {
    ngrok.connect(3000, function startTunnelConnect(err, url) {
        if (err) {
            log(chalk.red('\nERROR\n' + err));
            process.exit(0);
        }

        log('\nServing tunnel from: ' + chalk.magenta(url));
        cb(url);
    });
}

log('\nStarting ngrok tunnel');

startTunnel(runPsi);
