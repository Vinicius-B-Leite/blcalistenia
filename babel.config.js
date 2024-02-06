module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',

    [
      'module-resolver',
      {
        root: '.',
        extensions: ['.ios.js', '.android.js', '.js', '.json', '.ts', '.tsx'],
        alias: {
          '@/assets': './src/assets',
          '@/components': './src/components',
          '@/contexts': './src/contexts',
          '@/features': './src/features',
          '@/models': './src/models',
          '@/routes': './src/routes',
          '@/schema': './src/schema',
          '@/screens': './src/screens',
          '@/services': './src/services',
          '@/theme': './src/theme',
          '@/types': './src/types',
          '@/utils': './src/utils',
          '@/index': './src/index.tsx',
          '@/hooks': './src/hooks',
          '@/domains': './src/domains',
          '@/storage': './src/storage',
          '@/constants': './src/constants',
          '@/test': './src/test',
        },
      },
    ],
  ],
};
