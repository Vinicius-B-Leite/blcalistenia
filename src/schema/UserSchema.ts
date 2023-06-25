export const UserSchema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
        _id: 'string',
        username: 'string',
        email: 'string?',
        password: 'string?',
        photoURI: 'string'
    },
    primaryKey: '_id'
}