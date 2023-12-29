import {z} from 'zod';

export const filterExerciseSchema = z.object({
  exerciseName: z.string(),
  category: z.string(),
  muscle: z.string(),
});

export type FilterExerciseSchema = z.infer<typeof filterExerciseSchema>;
