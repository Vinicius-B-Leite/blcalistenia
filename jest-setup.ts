import '@testing-library/react-native/extend-expect';

import {launchImageLibrary} from 'react-native-image-picker';

jest.mock('react-native-image-picker', () => ({
  ...jest.requireActual('react-native-image-picker'),
  launchImageLibrary: jest.fn(
    jest.requireActual('react-native-image-picker').launchImageLibrary,
  ),
}));

jest.mock('react-native-toast-message', () => ({
  show: jest.fn(),
  hide: jest.fn(),
}));
jest.mock('react-native-uuid', () => ({
  ...jest.requireActual('react-native-uuid'),
  v4: () => Math.floor(Math.random()),
}));
