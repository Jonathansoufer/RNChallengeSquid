module.exports = {
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/assets/fonts/'], // stays the same
  dependencies: {
    'react-native-video-cache': {
      platforms: {
        android: null,
      },
    },
    'react-native-vector-icons': {
      platforms: {
        ios: null,
        android: null,
      },
    },
  },
};
