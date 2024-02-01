import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  setupFiles: ['./node_modules/react-native-gesture-handler/jestSetup.js'],
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-image-picker|react-native-calendars|react-native-swipe-gestures|react-native-vector-icons|react-native-reanimated)/)',
  ],
  testPathIgnorePatterns: ['__mocks__'],
};

export default config;
