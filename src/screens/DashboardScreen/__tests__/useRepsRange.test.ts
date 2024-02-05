import {renderHook, waitFor} from '@/test';
import {useRepsRange} from '../components/RepsRangeGraph/useRepsRange';
import {storage} from '@/storage';
import {mocks} from './__mocks__/dashboardMocks';

jest.spyOn(storage, 'get').mockResolvedValue(mocks.historicList);

jest.mock('@react-navigation/native', () => {
  const actualModule = jest.requireActual('@react-navigation/native');
  return {
    ...actualModule,
    useIsFocused: () => true,
  };
});

describe('integration: useRepsRange', () => {
  it('should return reps range', async () => {
    const {result} = renderHook(() => useRepsRange());

    await waitFor(() => expect(result.current.repsRange).not.toBeUndefined());

    expect(result?.current?.repsRange?.[2]?.porcentage ?? 0).toBe(1);
  });
});
