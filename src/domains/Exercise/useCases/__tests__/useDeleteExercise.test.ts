import {act, renderHook} from '@/test';
import {useDeleteExercise} from '../useDeleteExercise';
import {exerciseService} from '../../exerciseService';
import Toast from 'react-native-toast-message';

const mockedShowToast = jest.mocked(Toast.show);

describe('useCase: useDeleteExercise', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should calls delete exercise service', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(1706202809026);

    const mockgetExerciseById = jest.spyOn(exerciseService, 'getExerciseById');
    const mockUpsertExercise = jest.spyOn(exerciseService, 'upsertExercise');

    const {result} = renderHook(() => useDeleteExercise());

    await act(async () => {
      await result.current.deleteExercise('123');
    });

    expect(mockgetExerciseById).toHaveBeenCalledWith('123');
    expect(mockedShowToast).toHaveBeenCalled();
    expect(mockUpsertExercise).toHaveBeenCalledWith({
      deletedAt: 1706202809026,
    });
  });
});
