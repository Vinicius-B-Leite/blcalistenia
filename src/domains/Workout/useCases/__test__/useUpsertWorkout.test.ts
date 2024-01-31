import {renderHook} from '@/test';
import {useUpsertWorkout} from '../useUpsertWorkout';
import {mocks} from './__mocks__/workoutMocks';
import Toast from 'react-native-toast-message';
import {workoutService} from '../../workoutService';

const mockedToastShow = jest.mocked(Toast.show);

const userId = '123';
jest.mock('@/contexts', () => ({
  ...jest.requireActual('@/contexts'),
  useAuth: () => ({
    user: {
      uid: userId,
    },
  }),
}));

describe('useCase: useUpsertWorkout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should do nothing if exercises if empty', async () => {
    const {result} = renderHook(() => useUpsertWorkout());

    const workoutCreated = await result.current.upsertWorkout(
      mocks.workouts[0],
    );

    expect(mockedToastShow).not.toHaveBeenCalled();
    expect(workoutCreated).toBeUndefined();
  });
  it('should create a new workout if it is NOT exist', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(123123123);
    jest.spyOn(workoutService, 'getWorkoutById').mockResolvedValue(null);
    const mockedCreatExercise = jest
      .spyOn(workoutService, 'createWorkout')
      .mockResolvedValue(mocks.workouts[1]);

    const {result} = renderHook(() => useUpsertWorkout());

    const workoutCreated = await result.current.upsertWorkout(
      mocks.workouts[1],
    );

    expect(mockedToastShow).toHaveBeenCalled();
    expect(mockedCreatExercise).toHaveBeenCalledWith({
      ...mocks.workouts[1],
      user_id: userId,
      createdAt: 123123123,
    });
    expect(workoutCreated).not.toBeUndefined();
  });
  it('should update workout if it already exist', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(123123123);
    jest
      .spyOn(workoutService, 'getWorkoutById')
      .mockResolvedValue(mocks.workouts[1]);
    const mockedCreatExercise = jest
      .spyOn(workoutService, 'createWorkout')
      .mockResolvedValue(mocks.workouts[1]);

    const {result} = renderHook(() => useUpsertWorkout());

    const workoutCreated = await result.current.upsertWorkout(
      mocks.workouts[1],
    );

    expect(mockedToastShow).toHaveBeenCalled();
    expect(mockedCreatExercise).toHaveBeenCalledWith({
      ...mocks.workouts[1],
      user_id: mocks.workouts[1].user_id,
      createdAt: mocks.workouts[1].createdAt,
      updatedAt: 123123123,
    });
    expect(workoutCreated).not.toBeUndefined();
  });
});
