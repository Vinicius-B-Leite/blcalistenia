import {renderHook} from '@/test';
import {useCreateHistoric} from '../useCreateHistoric';
import {useAuth} from '@/contexts';
import {historicService} from '../../historicService';
import {HistoricType} from '@/models';

import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';
import {mocks} from './__mocks__/mocks';

jest.spyOn(Date, 'now').mockReturnValue(mocks.mockedDatetime);
const mockedToastShow = jest.mocked(Toast.show);

jest.mock('@/contexts', () => ({
  ...jest.requireActual('@/contexts'),
  useAuth: () => ({
    user: mocks.user,
  }),
}));
describe('useCase: useCreateHistoric', () => {
  it('should call historic service correctly and show toast on success', async () => {
    jest.spyOn(uuid, 'v4').mockReturnValueOnce('0');
    const mockedHistoricService = jest
      .spyOn(historicService, 'createHistoric')
      .mockResolvedValue(mocks.historics[0]);
    const {result} = renderHook(() => useCreateHistoric());

    await result.current.handleCreateHistoric(mocks.historics[0]);

    expect(mockedHistoricService).toHaveBeenCalledWith(mocks.historics[0]);
    expect(mockedToastShow).toHaveBeenCalledWith({
      type: 'success',
      props: {message: 'Treino salvo no histórico!'},
    });
  });
});
