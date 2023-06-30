module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@app': './app',
          '@screens': './app/screens',
          '@components': './app/components',
          '@images': './assets/images',
          '@fonts': './assets/fonts',
          '@animation': './assets/animation',
          '@svgs': './assets/svgs',
          '@styles': './app/styles',
          '@helper': './app/helper',
          '@router': './app/router',
          '@constants': './app/constants',
          '@state': './app/state',
        },
      },
    ],
  ],
};
