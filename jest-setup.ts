import '@testing-library/react-native/extend-expect';

import {launchImageLibrary} from 'react-native-image-picker';

jest.mock('react-native-image-picker', () => ({
  ...jest.requireActual('react-native-image-picker'),
  launchImageLibrary: jest.fn(
    jest.requireActual('react-native-image-picker').launchImageLibrary,
  ),
}));
