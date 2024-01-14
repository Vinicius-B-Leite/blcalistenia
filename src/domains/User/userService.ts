import {UserType} from '@/models';
import {userAdapter} from './userAdapter';
import {storage} from '@/storage';

export const userService = {
  getUser: async () => {
    const userResponse = await storage.get('User');

    const user = userResponse ? userAdapter.adapter(userResponse[0]) : null;
    // console.log(user);

    return user;
  },
  updateUser: async (user: UserType) => {
    await storage.upset('User', {
      ...user,
      _id: user.uid,
      username: user.username,
      photoURI: user.avatar,
    });
  },
};
