import {UserType} from '@/models/UserType';
import {SCHEMA_KEYS} from '../../constansts/schemaKeys';
import {openRealm} from '@/services/realm/realm';
import {userAdapter} from './userAdapter';

export const userService = {
  getUser: async () => {
    const realm = await openRealm();
    const userResponse = realm.objects(SCHEMA_KEYS.User).toJSON()[0];

    const user = userResponse ? userAdapter.adapter(userResponse) : null;

    return user;
  },
  updateUser: async (user: UserType) => {
    const realm = await openRealm();
    console.log('\x1b[33', user);

    realm.write(() => {
      realm.create(
        SCHEMA_KEYS.User,
        {
          _id: user.uid,
          username: user.username,
          photoURI: user.avatar,
        },
        Realm.UpdateMode.Modified,
      );
    });
  },
};
