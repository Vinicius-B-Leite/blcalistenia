import {UserType} from '@/models/UserType';
import {useEffect, useState} from 'react';
import {userService} from '../userService';

export function useGetUser() {
  const [user, setUser] = useState<UserType | null>(null);

  const fetchUser = async () => {
    const userResponse = await userService.getUser();

    setUser(userResponse);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
  };
}
