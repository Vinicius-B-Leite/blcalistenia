import * as z from 'zod';

export const searchWorkoutSchema = z.object({
  workoutName: z.string().min(1, 'Informe o nome'),
});

export type SearchWorkoutSchema = z.infer<typeof searchWorkoutSchema>;
