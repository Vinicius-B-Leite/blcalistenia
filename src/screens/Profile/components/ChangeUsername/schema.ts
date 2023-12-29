import {z} from 'zod';

export const changeUserNameSchema = z.object({
  newUsername: z.string().min(2, 'Informe um nome valido'),
});

export type ChangeUserNameSchema = z.infer<typeof changeUserNameSchema>;
