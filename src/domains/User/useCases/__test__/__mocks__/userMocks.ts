import {UserType} from '@/models';

const mockedDatetime = 123123123;
const user: UserType = {
  avatar: 'www.fake',
  username: 'user 1',
  uid: '123123',
  createdAt: mockedDatetime,
};

export const mocks = {
  user,
  mockedDatetime,
};
