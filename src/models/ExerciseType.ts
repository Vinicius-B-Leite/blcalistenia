export type ExerciseType = {
  _id: string;
  name: string;
  categories: String[];
  muscles: String[];
  user_id: string;
  createdAt: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};
