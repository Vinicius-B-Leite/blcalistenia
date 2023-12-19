import {userService} from '../userService';

export function useUpdateUser() {
  return {
    updateUser: userService.updateUser,
  };
}
