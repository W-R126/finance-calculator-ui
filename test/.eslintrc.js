module.exports = {
    extends: ['react-app', 'plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    rules: {
        'testing-library/prefer-screen-queries': 'error',
        'testing-library/no-debug': 'error',
        'testing-library/no-manual-cleanup': 'error',
        'testing-library/no-wait-for-empty-callback': 'error',
        'testing-library/prefer-presence-queries': 'error',
        'testing-library/prefer-wait-for': 'error',
    },
};
