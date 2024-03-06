import React from 'react';
import {fireEvent, renderScreen, screen, waitFor} from '@/test';
import {HistoricScreen} from '../HistoricScreen';
import {storage} from '@/storage';
import {mocks} from './__mocks__/historicScreenMocks';
import {WorkoutType} from '@/models';
import Toast from 'react-native-toast-message';

const mockedNavigation = jest.fn();
const mockedShowToast = jest.mocked(Toast.show);

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useAppNavigation: () => ({
    navigate: mockedNavigation,
  }),
}));
describe('integration: HistoricScreen', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  it('should render items order by date', async () => {
    jest.spyOn(storage, 'get').mockResolvedValue(mocks.historic);
    renderScreen(<HistoricScreen />);

    const historicList = screen.getByTestId('historic-list');
    await waitFor(() =>
      expect(historicList.props.data).toHaveLength(mocks.historic.length),
    );
    const dataOfHistoricList = historicList.props.data;

    expect(dataOfHistoricList[0]._id).toBe('3');
    expect(dataOfHistoricList[1]._id).toBe('2');
    expect(dataOfHistoricList[2]._id).toBe('1');
  });

  it('should NOT navigate to workout if isWorkingout is true', async () => {
    jest.spyOn(storage, 'get').mockResolvedValue(mocks.historic);

    renderScreen(<HistoricScreen />, {
      preloadedState: {
        workout: {
          isWorkingout: true,
          canEdit: true,
          timer: 123,
          workout: {} as WorkoutType,
        },
      },
    });

    const historicList = screen.getByTestId('historic-list');
    await waitFor(() =>
      expect(historicList.props.data).toHaveLength(mocks.historic.length),
    );

    fireEvent.press(screen.getByText('Treino de força'));

    expect(mockedNavigation).not.toHaveBeenCalled();
    expect(mockedShowToast).toHaveBeenCalledWith({
      type: 'error',
      props: {message: 'Termine seu treino para ver o histórico'},
    });
  });
  it('should navigate to workout when onPress in historic item', async () => {
    jest.spyOn(storage, 'get').mockResolvedValue(mocks.historic);

    renderScreen(<HistoricScreen />);

    const historicList = screen.getByTestId('historic-list');
    await waitFor(() =>
      expect(historicList.props.data).toHaveLength(mocks.historic.length),
    );

    fireEvent.press(screen.getByText('Treino de força'));

    expect(mockedNavigation).toHaveBeenCalled();
  });
});
