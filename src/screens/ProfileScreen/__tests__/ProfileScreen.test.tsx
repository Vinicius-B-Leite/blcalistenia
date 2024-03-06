import {act, fireEvent, renderScreen, screen, waitFor} from '@/test';
import {ProfileScreen} from '../ProfileScreen';
import {userService} from '@/domains';
import {mocks} from './__mocks__/ProfileScreenMocks';
import {dark, light} from '@/theme';

const fakeUserAvatar = 'http://github.com/Vinicius-B-Leite.png';
jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  pickeImage: jest.fn().mockResolvedValue({
    assets: [
      {
        uri: fakeUserAvatar,
      },
    ],
  }),
}));
describe('integration: ProfileScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should can update user name', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    renderScreen(<ProfileScreen />);

    await waitFor(() =>
      expect(screen.getByText(mocks.user.username)).toBeTruthy(),
    );

    fireEvent(screen.getByText('Nome de usuário'), 'press');

    const newUsernameInput = await screen.findByPlaceholderText(
      'Digite seu novo nome',
    );

    const newName = 'Vini B Leite';
    fireEvent.changeText(newUsernameInput, newName);

    await act(() => fireEvent(screen.getByText('Salvar'), 'press'));

    expect(await screen.findByText(newName)).toBeTruthy();
  });

  it('should can change theme', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    renderScreen(<ProfileScreen />);

    const themeOption = await screen.findByText('Tema');

    fireEvent.press(themeOption);

    const darkThemeOption = await screen.findByText('Escuro');
    const lightThemeOption = await screen.findByText('Claro');

    expect(darkThemeOption.props.style[0].color).toBe(dark.colors.contrast);

    fireEvent.press(lightThemeOption);

    await waitFor(() =>
      expect(lightThemeOption.props.style[0].color).toBe(light.colors.contrast),
    );
  });

  it('should can change avatar', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    renderScreen(<ProfileScreen />);

    const avatar = await screen.findByTestId('avatar-image');

    await act(async () => {
      fireEvent.press(avatar);
    });

    expect(avatar.props.source.uri).toBe(fakeUserAvatar);
  });
});
