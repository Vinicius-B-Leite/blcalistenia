import {UserType} from '@/models';
import {userService} from '../userService';

export function useUpdateUser() {
  const updateUser = async (user: UserType) => {
    await userService.updateUser({
      ...user,
      updatedAt: new Date().getTime(),
    });
  };

  return {
    updateUser,
  };
}
