export const UserSchema: Realm.ObjectSchema = {
  name: 'User',
  properties: {
    _id: 'string',
    username: 'string',
    photoURI: 'string',
    createdAt: 'date',
    updatedAt: 'date?',
    deletedAt: 'date?',
  },
  primaryKey: '_id',
};
