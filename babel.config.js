const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.ios.js', '.android.js'],
    alias: {
      '@': './app/',
    },
  },
];

// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ['@babel/preset-env', { targets: { node: 'current' } }],
//       'module:metro-react-native-babel-preset',
//     ],
//     plugins: [
//       '@babel/plugin-transform-flow-strip-types',
//       ['@babel/plugin-transform-private-property-in-object', { loose: true }],
//       ['@babel/plugin-proposal-class-properties', { loose: true }],
//       '@babel/plugin-proposal-numeric-separator',
//       'babel-plugin-styled-components',
//       [
//         'babel-plugin-rewrite-require',
//         {
//           aliases: {
//             stream: 'readable-stream',
//           },
//         },
//       ],
//       'babel-plugin-date-fns',
//       'babel-plugin-lodash',
//       // '@babel/plugin-proposal-export-namespace-from',
//       // Some libraries use regex features not supported by hermes yet.
//       '@babel/plugin-transform-named-capturing-groups-regex',
//       ['@babel/plugin-transform-private-methods', { loose: true }],
//       MODULE_RESOLVER,
//       // this has to be listed last
//       'react-native-reanimated/plugin',
//     ],

//     env: {
//       production: {
//         plugins: ['transform-remove-console', MODULE_RESOLVER],
//       },
//       test: {
//         plugins: ['@babel/plugin-transform-runtime'],
//       },
//     },
//   };
// };

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: [
        'transform-remove-console',
        MODULE_RESOLVER,
        'react-native-reanimated/plugin',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
        MODULE_RESOLVER,
        'react-native-reanimated/plugin',
      ],
    },
  },
  plugins: [MODULE_RESOLVER, 'react-native-reanimated/plugin'],
};
