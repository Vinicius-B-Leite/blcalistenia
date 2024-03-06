import {renderHook, waitFor} from '@/test';
import {useGetHistoric} from '../useGetHistoric';
import {historicService} from '../../historicService';
import {mocks} from './__mocks__/historicMocks';

describe('useCase: useGetHistoric', () => {
  it('should return the historic list in date order', async () => {
    jest
      .spyOn(historicService, 'getHistoric')
      .mockResolvedValue(mocks.historics);
    const {result, rerender} = renderHook(() => useGetHistoric());

    await waitFor(() => expect(result.current.historic.length).toBe(2));

    expect(
      result.current.historic[0].date > result.current.historic[1].date,
    ).toBeTruthy();
  });
});
