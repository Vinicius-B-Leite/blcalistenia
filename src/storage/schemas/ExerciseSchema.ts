export const ExerciseSchema = {
  name: 'Exercise',
  properties: {
    _id: 'string',
    name: {
      type: 'string',
      indexed: true,
    },
    categories: 'string[]',
    muscles: 'string[]',
    user_id: 'string',
    createdAt: 'int',
    updatedAt: 'int?',
    deletedAt: 'int?',
  },
  primaryKey: '_id',
};
