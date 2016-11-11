module.exports = {
    extends: [
        'eslint-config-airbnb',
        './rules/react',
        './rules/react-a11y'
    ].map(require.resolve),
    ecmaFeatures: {
        impliedStrict: true,
        modules: true,
        jsx: true
    },
    env: {
        browser: true,
        node: true,
        mocha: true,
        jquery: true,
        es6: true,
        shelljs: true,
        mongo: true,
        webextensions: true
    },
    plugins: [
        'redux-saga',
        'react',
        'jsx-a11y'
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        quotes: [2, 'single'],
        indent: [2, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 0,
            MemberExpression: 1,
            FunctionDeclaration: {
                body: 1,
                parameters: 2
            },
            FunctionExpression: {
                body: 1,
                parameters: 2
            }
        }],
        'comma-dangle': [2, 'never'],
        'max-len': 0,
        'require-yield': 0,
        'import/prefer-default-export': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-named-as-default': 0,
        'import/no-webpack-loader-syntax': 0,
        'import/no-dynamic-require': 0,
        'react/require-extension': 0,
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': 0
    }
};
