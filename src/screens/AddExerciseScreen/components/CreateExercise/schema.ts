import {z} from 'zod';

export const createExericseSchema = z.object({
  exerciseName: z.string().min(2, 'O nome do exercício deve ser valido'),
  categories: z.string().array().min(1, 'Seleceione ao menos uma categoria'),
  muscles: z.string().array().min(1, 'Seleceione ao menos um músculo'),
});

export type CreateExerciseSchema = z.infer<typeof createExericseSchema>;
