export const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    username: 'string',
    photoURI: 'string',
    createdAt: 'int',
    updatedAt: 'int?',
    deletedAt: 'int?',
  },
  primaryKey: '_id',
};
