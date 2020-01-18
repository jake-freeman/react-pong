const rules = {
    'comma-spacing': [ 'error', { 'after': true } ],
    'curly': [ 'error' ],
    'dot-notation': [ 'error' ],
    'eol-last': [ 'error', 'always' ],
    'eqeqeq': [ 'error' ],
    'func-call-spacing': [ 'error' ],
    'key-spacing': [ 'error' ],
    'keyword-spacing': [ 'error', { 'after': true } ],
    'max-depth': [ 'error', { 'max': 4 } ],
    'no-console': [ 'off' ],
    'no-extra-bind': [ 'error' ],
    'no-floating-decimal': [ 'error' ],
    'no-lone-blocks': [ 'error' ],
    'no-loop-func': [ 'error' ],
    'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0 } ],
    'no-shadow': [ 'error' ],
    'no-shadow-restricted-names': [ 'error' ],
    'no-unneeded-ternary': [ 'error', { 'defaultAssignment': false } ],
    'no-unused-vars': [ 'error', {
        'args': 'none',
        'ignoreRestSiblings': true
    }],
    'no-use-before-define': [ 'error' ],
    'no-useless-return': [ 'error' ],
    'no-whitespace-before-property': [ 'error' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'quotes': [ 'error', 'single', { 'avoidEscape': true } ],
    'radix': [ 'error' ],
    'semi': [ 'error', 'always' ],
    'space-before-blocks': [ 'error' ],
    'space-before-function-paren': [ 'error', {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always'
    }],
    'space-infix-ops': [ 'error' ],
    'block-scoped-var': [ 'error' ],
    'no-implicit-globals': [ 'error' ],
    'no-lone-blocks': [ 'error' ],
    'no-unused-expressions': [ 'error' ],
    'no-duplicate-imports': [ 'error' ],
    'no-var': [ 'error' ],

    'lodash/callback-binding': [ 'error' ],
    'lodash/no-extra-args': [ 'error' ],
    'lodash/no-unbound-this': [ 'error' ],

    // should maybe be enabled when we have i18n
    // 'react/jsx-no-literals': [ 'error' ],

    'react/no-multi-comp': [ 'error' ],
    'react/self-closing-comp': [ 'error', {
        'component': true,
        'html': true
    }],
    'react/void-dom-elements-no-children': [ 'error' ],
    'react/jsx-filename-extension': [ 'error', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-fragments': [ 'error', 'element'],
    'react/jsx-pascal-case': [ 'error' ],
    'react/jsx-wrap-multilines': [ 'error' ],
};

const plugins = [
    'react',
    'lodash',
];

const extend = [
    'eslint:recommended',
    'plugin:react/recommended',
];

module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: extend,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: plugins,
    rules: rules,
    settings: {
        react: {
            version: 'detect',
        },
    },
};
