import {renderHook, waitFor} from '@/test';
import {useGetUser} from '../useGetUser';
import {userService} from '../../userService';
import {mocks} from './__mocks__/userMocks';

describe('useCase: useGetUser', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return current user', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);
    const {result} = renderHook(() => useGetUser());

    await waitFor(() => {
      expect(result.current.user).not.toBeNull();
    });

    expect(result.current.user).toEqual(mocks.user);
  });
});
