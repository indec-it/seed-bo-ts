module.exports = {
    presets: [
        'react-app',
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/proposal-optional-chaining',
        'lodash',
        'react-hot-loader/babel'
    ],
    env: {
        production: {
            plugins: [
                [
                    'transform-react-remove-prop-types',
                    {
                        ignoreFilenames: [
                            'node_modules'
                        ]
                    }
                ]
            ]
        }
    }
};
