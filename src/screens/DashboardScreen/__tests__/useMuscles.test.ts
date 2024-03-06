import {renderHook, waitFor} from '@/test';
import {useMuscles} from '../components/MusclesGraph/useMuscles';

import {mocks} from './__mocks__/dashboardMocks';
import {storage} from '@/storage';
import {muscles} from '@/constants';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';

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
describe('integration: useMuscles', () => {
  it('should return  mucles trained frequency in correct format', async () => {
    const {result} = renderHook(() => useMuscles());

    await waitFor(() => expect(result.current.muslces).not.toBeNull());

    const correctFormat: LineChartData = {
      labels: muscles.map(m => m.slice(0, 3)),
      datasets: [
        {
          data: [1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1],
        },
      ],
    };
    expect(result.current.muslces?.labels).toStrictEqual(correctFormat.labels);
    expect(result.current.muslces?.datasets[0].data).toEqual(
      correctFormat.datasets[0].data,
    );
    ``;
  });
});
