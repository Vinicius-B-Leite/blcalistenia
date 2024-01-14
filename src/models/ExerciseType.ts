export type ExerciseType = {
  _id: string;
  name: string;
  categories: String[];
  muscles: String[];
  user_id: string;
  createdAt: number;
  updatedAt?: number;
  deletedAt?: number;
};
