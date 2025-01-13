/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  extends: ['@nr2p/eslint-config', 'plugin:@react-three/recommended'],
  plugins: [
    '@react-three'
  ],
  rules: {
    "react/no-unknown-property": "off"
  }
};
