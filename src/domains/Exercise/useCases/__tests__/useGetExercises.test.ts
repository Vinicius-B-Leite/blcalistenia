import {act, renderHook, waitFor} from '@/test';
import {useGetExercises} from '../useGetExercises';
import {exerciseService} from '../../exerciseService';
import {mocks} from './__mocks__/exerciseMock';

describe('useCase: useGetExercises', () => {
  it('should return all exercises (storage and initialsExercise) if no filter was passed', async () => {
    const mockExercises = mocks.exerciseMock;
    jest
      .spyOn(exerciseService, 'getExercise')
      .mockResolvedValueOnce(mockExercises);
    const {result} = renderHook(() => useGetExercises());

    await waitFor(() => {
      expect(result.current.exercises.length).toBeGreaterThan(0);
    });

    expect(result.current.exercises.includes(mockExercises[0])).toBeTruthy();
    expect(result.current.exercises.includes(mockExercises[1])).toBeTruthy();
  });
  it('should filter  if  filter was passed', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => 1706206301414);

    const mockExercises = mocks.exerciseMock;
    jest
      .spyOn(exerciseService, 'getExercise')
      .mockResolvedValueOnce(mockExercises);
    const {result} = renderHook(() => useGetExercises('deletedAt'));

    await waitFor(() => {
      expect(result.current.exercises.length).toBeGreaterThan(0);
    });

    expect(result.current.exercises[0]).toBe(mockExercises[2]);
  });
  it('should can refresh', async () => {
    const mockExercises = mocks.exerciseMock;
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue(mockExercises);
    const {result} = renderHook(() => useGetExercises());

    await waitFor(() => {
      expect(result.current.exercises.length).toBeGreaterThan(0);
    });

    await act(async () => {
      await result.current.refetchExercises();
    });

    expect(result.current.exercises.includes(mockExercises[0])).toBeTruthy();
  });
});
