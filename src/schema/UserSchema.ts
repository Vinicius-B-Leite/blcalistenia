export const UserSchema: Realm.ObjectSchema = {
    name: 'User',
    properties: {
        username: 'string',
        email: 'string?',
        password: 'string?',
        photoURI: 'string'
    },
    primaryKey: 'email'
}