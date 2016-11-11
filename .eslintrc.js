const path = require('path');

module.exports = {
    root: true,
    parser: 'babel-eslint',
    extends: [
        'airbnb',
        './.eslint/index.js'
    ],
    settings: {
        'import/resolver': {
            webpack: {
                config: path.resolve(process.cwd(), 'internals/webpack/webpack.dev.babel')
            }
        }
    }
};
