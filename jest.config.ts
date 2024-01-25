import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest-setup.ts'],
};

export default config;
