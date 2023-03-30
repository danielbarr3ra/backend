/* eslint-disable no-undef */
module.exports = {
    transform: { '^.+\\.ts?$': 'ts-jest' },
    testEnvironment: 'node',
    testRegex: '/built/.*\\.(test|spec)?\\.(ts|tsx|js|jsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
}
