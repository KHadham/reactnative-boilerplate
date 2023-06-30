module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'comma-style': ['error', 'last'],
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null,
      },
    },
  },
};
