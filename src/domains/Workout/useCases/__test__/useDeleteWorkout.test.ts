import {act, renderHook} from '@/test';
import {workoutService} from '../../workoutService';
import {useDeleteWorkout} from '../useDeleteWorkout';
import {mocks} from './__mocks__/workoutMocks';
import Toast from 'react-native-toast-message';

const mockToastShow = jest.mocked(Toast.show);

describe('useCase: useDeleteWorkout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should updated deletedAt propertie in workout and show toast message when success', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(mocks.mockedDatetime);
    const mockedDeleteWorkout = jest
      .spyOn(workoutService, 'createWorkout')
      .mockImplementation();
    jest
      .spyOn(workoutService, 'getWorkoutById')
      .mockResolvedValueOnce(mocks.workouts[0]);

    const {result} = renderHook(() => useDeleteWorkout());

    await result.current.deleteWorkout('1');

    expect(mockedDeleteWorkout).toBeCalledWith({
      ...mocks.workouts[0],
      deletedAt: mocks.mockedDatetime,
    });

    expect(mockToastShow).toBeCalledWith({
      type: 'success',
      props: {message: 'Treino deletado com sucesso!'},
    });
  });
  it('should not call createWorkout when workout is not found', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(mocks.mockedDatetime);
    const mockedDeleteWorkout = jest
      .spyOn(workoutService, 'createWorkout')
      .mockImplementation();
    jest.spyOn(workoutService, 'getWorkoutById').mockResolvedValueOnce(null);

    const {result} = renderHook(() => useDeleteWorkout());

    await result.current.deleteWorkout('1');

    expect(mockedDeleteWorkout).not.toBeCalled();
    expect(mockToastShow).not.toBeCalled();
  });
});
