export type ExerciseType = {
  _id: string;
  name: string;
  categories: string[];
  muscles: string[];
  user_id: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
};
