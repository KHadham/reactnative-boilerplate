module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@themes': './src/themes',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@components': './src/components',
          '@constants': './src/constants',
          '@images': './assets/images',
          '@certificate': './assets/certificate',
          '@fonts': './assets/fonts',
          '@animation': './assets/animation',
          '@svgs': './assets/svgs',
          '@styles': './src/styles',
          '@utils': './src/utils',
          '@router': './src/router',
          '@state': './src/state',
          '@authApp': './src/app/auth',
          '@homeApp': './src/app/home',
          '@profileApp': './src/app/profile',
          '@newsApp': './src/app/news',
          '@archiveApp': './src/app/archive',
          '@semeterApp': './src/app/semeter',
          '@othersApp': './src/app/others',
        },
      },
    ],
    ['nativewind/babel'],
    ['react-native-reanimated/plugin']
  ],
};
