import {renderHook, waitFor} from '@/test';
import {useFrequency} from '../components/FrequencyGraph/useFrequency';
import {historicService} from '@/domains';
import {mocks} from './__mocks__/dashboardMocks';
import {months} from '@/constants';
import {storage} from '@/storage';

jest.spyOn(storage, 'get').mockResolvedValue(mocks.historicList);

jest.mock('@react-navigation/native', () => {
  const actualModule = jest.requireActual('@react-navigation/native');
  return {
    ...actualModule,
    useIsFocused: () => true,
  };
});
afterAll(() => {
  jest.resetAllMocks();
});
describe('integration: useFrequency', () => {
  it('should return the frequency of user workout in correct format', async () => {
    const {result} = renderHook(() => useFrequency());

    await waitFor(() => expect(result.current.historicFiltered).not.toBeNull());

    const monthsFrequency = [2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expect(result.current.historicFiltered?.labels).toEqual(months);
    expect(result.current.historicFiltered?.datasets[0].data).toEqual(
      monthsFrequency,
    );
  });
});
