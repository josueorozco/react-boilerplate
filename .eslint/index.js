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
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],
        'react/jsx-filename-extension': 0
    },
    settings: {
        'import/resolver': {
            webpack: {
                config: './internals/webpack/webpack.test.babel.js'
            }
        }
    }
};

// 'env': {
//   'browser': true,
//   'node': true,
//   'mocha': true,
//   'es6': true
// },
// 'plugins': [
//   'react',
//   'jsx-a11y'
// ],
// 'parserOptions': {
//   'ecmaVersion': 6,
//   'sourceType': 'module',
//   'ecmaFeatures': {
//     'jsx': true
//   }
// },
// 'rules': {
//   'arrow-body-style': [
//     2,
//     'as-needed'
//   ],
//   'comma-dangle': [
//     2,
//     'never'
//   ],
//   'import/imports-first': 1,
//   'import/newline-after-import': 0,
//   'import/no-extraneous-dependencies': 0,
//   'import/no-named-as-default': 0,
//   'import/no-unresolved': 2,
//   'import/prefer-default-export': 0,
//   'indent': [
//     2,
//     4,
//     {
//       'SwitchCase': 1,
//       'VariableDeclarator': 1,
//       'outerIIFEBody': 0,
//       'MemberExpression': 1,
//       'FunctionDeclaration': {
//         'body': 1,
//         'parameters': 2
//       },
//       'FunctionExpression': {
//         'body': 1,
//         'parameters': 2
//       }
//     }
//   ],
//   'jsx-a11y/aria-props': 2,
//   'jsx-a11y/heading-has-content': 0,
//   'jsx-a11y/href-no-hash': 2,
//   'jsx-a11y/label-has-for': 2,
//   'jsx-a11y/mouse-events-have-key-events': 2,
//   'jsx-a11y/role-has-required-aria-props': 2,
//   'jsx-a11y/role-supports-aria-props': 2,
//   'max-len': 0,
//   'newline-per-chained-call': 0,
//   'no-console': 1,
//   'no-use-before-define': 1,
//   'prefer-template': 2,
//   'react/jsx-indent': [
//     2,
//     4
//   ],
//   'react/jsx-indent-props': [
//     2,
//     4
//   ],
//   'react/jsx-filename-extension': 0,
//   'react/jsx-no-target-blank': 0,
//   'react/require-extension': 0,
//   'react/self-closing-comp': 0,
//   'require-yield': 0
// },
// 'settings': {
//   'import/resolver': {
//     'webpack': {
//       'config': './internals/webpack/webpack.test.babel.js'
//     }
//   }
// }
