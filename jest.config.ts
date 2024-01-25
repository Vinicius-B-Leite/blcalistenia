import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|react-native-image-picker)/)',
  ],
  testPathIgnorePatterns: ['__mocks__'],
};

export default config;
