import {act, renderHook, waitFor} from '@/test';

import {useCreateExercise} from '../useCreateExercise';

import {ExerciseType} from '@/models';

jest.mock('@/contexts', () => ({
  ...jest.requireActual('@/contexts'),
  useAuth: () => ({
    user: {
      uid: '123',
    },
  }),
}));

describe('useCase: useCreateExercise', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should create a new exercise and return it', async () => {
    const {result, unmount, rerender} = renderHook(() => useCreateExercise());

    const newExercise = {
      categories: [],
      name: 'test',
      muscles: [],
    };
    let returnedExercise = {} as ExerciseType;
    await act(async () => {
      returnedExercise = await result.current.createExercise(newExercise);
    });
    rerender({});

    expect(returnedExercise).toMatchObject(newExercise);
    unmount();
  });
});
