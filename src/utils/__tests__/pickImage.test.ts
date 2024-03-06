import {launchImageLibrary} from 'react-native-image-picker';
import {pickeImage} from '../pickImage';

const mockedLaunchImageLibrary = jest.mocked(launchImageLibrary);
describe('utils: pickImage', () => {
  it('should return the result of launchImageLibrary', async () => {
    const mockResult = {uri: 'mockUri'};
    mockedLaunchImageLibrary.mockReturnValue(
      Promise.resolve({assets: [mockResult]}),
    );

    const result = await pickeImage();

    expect(result).toEqual({assets: [mockResult]});
  });

  it('should return error if cancel', async () => {
    const mockResult = {
      didCancel: true,
    };
    mockedLaunchImageLibrary.mockReturnValue(Promise.resolve(mockResult));
    const result = await pickeImage();

    expect(result).toEqual(mockResult);
  });
});
