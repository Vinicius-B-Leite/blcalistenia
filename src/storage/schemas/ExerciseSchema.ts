export class ExerciseSchema extends Realm.Object {
  static schema = {
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
      createdAt: 'date',
      updatedAt: 'date?',
      deletedAt: 'date?',
    },
    primaryKey: '_id',
  };
}
