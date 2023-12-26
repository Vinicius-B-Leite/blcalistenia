import React, {createContext, useState, useEffect, useContext} from 'react';

import {UserType} from '@/models';
import {useGetUser, useUpdateUser} from '@/domains';

type UserContextType = {
  user: UserType | null;
  updateUser: (newUser: UserType) => Promise<void>;
};

export const UserContext = createContext({} as UserContextType);

const UserContextProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const {user: userStorage} = useGetUser();
  const {updateUser: updateUserFromStorage} = useUpdateUser();

  useEffect(() => {
    setUser(userStorage);
  }, [userStorage]);

  const updateUser = async (newUser: UserType) => {
    setUser(newUser);
    await updateUserFromStorage(newUser);
  };

  return (
    <UserContext.Provider value={{user, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
export default UserContextProvider;
