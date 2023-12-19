import {UserType} from '@/models/UserType';
import {openRealm} from '@/services/realm/realm';
import {userAdapter} from './userAdapter';
import {SCHEMA_KEYS} from '../../storage/config';
import {storage} from '@/storage/storage';

export const userService = {
  getUser: async () => {
    const userResponse = await storage.get('User');

    const user = userResponse ? userAdapter.adapter(userResponse[0]) : null;

    return user;
  },
  updateUser: async (user: UserType) => {
    await storage.upset('User', {
      _id: user.uid,
      username: user.username,
      photoURI: user.avatar,
    });
  },
};