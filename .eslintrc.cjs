/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // ignoring this properties by eslint
    "react/no-unknown-property": ["error", { "ignore": ["intensity","receiveShadow", "color", "position", "castShadow", "shadow-camera-left", "shadow-camera-right", "shadow-camera-top", "shadow-camera-bottom","polygonOffsetFactor","flatShading","polygonOffset","args","penumbra", "angle","rotation","object", "shadow-mapSize","options","position-y", "rotation-y"] }]

  },
}
