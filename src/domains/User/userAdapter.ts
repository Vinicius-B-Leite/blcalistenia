import {UserType} from '@/models';
import uuid from 'react-native-uuid';

function adapter(user: any): UserType {
  return {
    avatar: user?.photoURI || '',
    uid: user?._id || uuid.v4().toString(),
    username: user?.username || 'Desconhecido',
    createdAt: user?.createdAt || new Date().getTime(),
    deletedAt: user?.deletedAt,
    updatedAt: user?.updatedAt,
  };
}

export const userAdapter = {
  adapter,
};
