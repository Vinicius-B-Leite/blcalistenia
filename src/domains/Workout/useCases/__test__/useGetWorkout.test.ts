import {renderHook, waitFor} from '@/test';
import {useGetWorkouts} from '../useGetWorkouts';
import {mocks} from './__mocks__/workoutMocks';
import {workoutService} from '../../workoutService';

describe('useCase: useGetWorkout', () => {
  it('should return the workouts without deletedAt propertie', async () => {
    jest
      .spyOn(workoutService, 'getWorkouts')
      .mockResolvedValueOnce(mocks.workouts);

    const {result} = renderHook(() => useGetWorkouts());

    await waitFor(() =>
      expect(result.current.workouts.some(w => w.deletedAt)).toBe(false),
    );
  });
});
