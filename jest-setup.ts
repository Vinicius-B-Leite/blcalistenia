import '@testing-library/react-native/extend-expect';

require('@shopify/flash-list/jestSetup');

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

jest.mock('@gorhom/bottom-sheet', () => ({
  __esModule: true,
  ...require('@gorhom/bottom-sheet/mock'),
}));

require('react-native-reanimated').setUpTests();
