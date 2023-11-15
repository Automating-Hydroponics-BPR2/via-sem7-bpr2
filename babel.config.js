module.exports = {
  presets: [
      '@babel/preset-typescript',
      '@babel/preset-env',
      ['@babel/preset-react', { runtime: 'automatic' }],
  ],
  "plugins": [
      ["@babel/plugin-proposal-class-properties", { "loose": true }],
      ["@babel/plugin-proposal-private-methods", { "loose": true }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
      ["@babel/plugin-transform-private-property-in-object", { "loose": true }]
  ]
};
