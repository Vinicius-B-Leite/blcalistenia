import {renderHook} from '@/test';
import {useUpdateUser} from '../useUpdateUser';
import {mocks} from './__mocks__/userMocks';
import {userService} from '../../userService';

describe('useCase: useUpdateUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update user and update updatedAt propertie with current date', async () => {
    jest.spyOn(Date, 'now').mockReturnValue(mocks.mockedDatetime);
    const mockedUpdateUser = jest
      .spyOn(userService, 'updateUser')
      .mockImplementation();
    const {result} = renderHook(() => useUpdateUser());

    await result.current.updateUser(mocks.user);

    expect(mockedUpdateUser).toHaveBeenCalledWith({
      ...mocks.user,
      updatedAt: mocks.mockedDatetime,
    });
  });
});
