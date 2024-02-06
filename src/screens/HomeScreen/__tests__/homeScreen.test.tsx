import React from 'react';

import {act, fireEvent, renderScreen, screen} from '@/test';
import {HomeScreen} from '../HomeScreen';
import {userService, workoutService} from '@/domains';
import {mocks} from './__mocks__/homeScreen.test';
import {Alert, AlertButton} from 'react-native';

const mockedNavigation = jest.fn();
jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useAppNavigation: () => ({
    navigate: mockedNavigation,
  }),
}));
describe('integration: HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it('should can search by workout name', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    jest.spyOn(workoutService, 'getWorkouts').mockResolvedValue(mocks.workouts);
    renderScreen(<HomeScreen />);

    const searchWorkoutInput = await screen.findByPlaceholderText(
      'Pesquisar treino',
    );

    fireEvent.changeText(searchWorkoutInput, mocks.workouts[0].title);

    const myWorkoutsFlatList = screen.getByTestId('myWorkoutsFlatList');

    expect(myWorkoutsFlatList.props.data.length).toBe(1);

    fireEvent.press(screen.getByText(mocks.workouts[0].title));

    expect(mockedNavigation).toHaveBeenCalledWith('HomeStack', {
      screen: 'Workout',
      params: {workout: mocks.workouts[0]},
      initial: true,
    });
  });
  it('should show a button to create a new workout if there is NOT workout with name searched', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    jest.spyOn(workoutService, 'getWorkouts').mockResolvedValue(mocks.workouts);
    renderScreen(<HomeScreen />);

    const searchWorkoutInput = await screen.findByPlaceholderText(
      'Pesquisar treino',
    );

    fireEvent.changeText(searchWorkoutInput, 'random workout');

    const createWorkoutButton = await screen.findByText('Crie um treino');
    expect(createWorkoutButton).toBeTruthy();

    fireEvent.press(createWorkoutButton);
    expect(mockedNavigation).toHaveBeenCalledWith('HomeStack', {
      screen: 'Workout',
      params: {workout: undefined},
    });
  });

  it('should can filter workouts by muscle and cancel filter', async () => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    jest.spyOn(workoutService, 'getWorkouts').mockResolvedValue(mocks.workouts);
    renderScreen(<HomeScreen />);

    const filterMucles = await screen.findAllByTestId(/filterMuscle-.*/);

    fireEvent.press(filterMucles[0]);

    const myWorkoutsFlatList = screen.getByTestId('myWorkoutsFlatList');

    expect(myWorkoutsFlatList.props.data[0].exercises[0].exercise_id).toBe(
      mocks.workouts[0].exercises[0].exercise_id,
    );

    fireEvent.press(filterMucles[0]);
    expect(myWorkoutsFlatList.props.data.length).toBe(3);
  });

  it('should can delete a workout', async () => {
    let mockedConfirm: AlertButton['onPress'];

    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      if (buttons && buttons[0].onPress) {
        mockedConfirm = buttons[0].onPress;
      }
    });

    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);

    jest.spyOn(workoutService, 'getWorkouts').mockResolvedValue(mocks.workouts);
    renderScreen(<HomeScreen />);

    const someWorkout = await screen.findByText(mocks.workouts[0].title);

    fireEvent(someWorkout, 'longPress');

    await act(() => mockedConfirm && mockedConfirm());

    const myWorkoutsFlatList = screen.getByTestId('myWorkoutsFlatList');
    expect(myWorkoutsFlatList.props.data.length).toBe(2);
  });
});
