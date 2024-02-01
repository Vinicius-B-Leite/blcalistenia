import {
  act,
  fireEvent,
  renderScreen,
  screen,
  setupStore,
  waitFor,
  waitForElementToBeRemoved,
} from '@/test';
import {AddExerciseScreen} from '../AddExerciseScreen';
import {exerciseService, userService} from '@/domains';
import {dark} from '@/theme';
import Toast from 'react-native-toast-message';
import {mocks} from './__mocks__/addExerciseScreen';
import * as exerciseActions from '@/features';
import {Alert, AlertButton} from 'react-native';

const mockedShowToast = jest.mocked(Toast.show);

const mockedgoBack = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useNavigation: () => ({
      ...actual.useNavigation,
      goBack: mockedgoBack,
    }),
  };
});

describe('integration: AddExerciseScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    jest.spyOn(userService, 'getUser').mockResolvedValue(mocks.user);
  });
  it('should render exercise list with initials exercises', async () => {
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue([]);

    const {queryByText, findByText} = renderScreen(<AddExerciseScreen />);

    const dips = await findByText('dips');
    expect(dips).toBeTruthy();
  });

  it('should render exercise list with exercises searched', async () => {
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue([]);

    const {queryByText, findByText, getByTestId, getByPlaceholderText} =
      renderScreen(<AddExerciseScreen />);

    const input = getByPlaceholderText('Pesquisar exercício');

    fireEvent.changeText(input, 'dips');

    const dips = await findByText('dips');
    expect(dips).toBeTruthy();
  });

  it('should filter by muscle and category', async () => {
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue([]);

    const {findAllByTestId, findByText, findByTestId, findAllByText} =
      renderScreen(<AddExerciseScreen />);

    await waitFor(() => screen.findByTestId('filter-button'));

    const filterButton = await findByTestId('filter-button');

    fireEvent.press(filterButton);

    const pushCategory = (await findAllByText(/empurrar/i))[0];
    const shoulderMuscle = (await findAllByText('Ombro'))[0];

    await act(() => {
      fireEvent.press(pushCategory);
      fireEvent.press(shoulderMuscle);
    });

    expect(pushCategory.props.style[0].color).toEqual(dark.colors.text);
    expect(shoulderMuscle.props.style[0].color).toEqual(dark.colors.text);

    const apllyFilterButton = await findByText('Aplicar');
    await act(() => {
      fireEvent.press(apllyFilterButton);
    });

    const exercises = await findAllByTestId('exercise-', {exact: false});

    expect(exercises.length).toEqual(4);
  });
  it('should show error toast if on create a new exercise has some form error', async () => {
    const newExercise = {
      _id: '1',
      name: 'exercise',
      categories: ['empurrar'],
      muscles: ['Antebraço'],
      createdAt: Date.now(),
      user_id: '1',
    };
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue([]);
    const mockedUpsetExercise = jest
      .spyOn(exerciseService, 'upsertExercise')
      .mockResolvedValue(newExercise);

    const {findByTestId, getByPlaceholderText, getByText, findByText, debug} =
      renderScreen(<AddExerciseScreen />);

    const openBottomSheetBtn = await findByTestId('openBottomSheetBtn');
    fireEvent.press(openBottomSheetBtn);

    const inputExerciseName = getByPlaceholderText('Nome do exercício');
    fireEvent.changeText(inputExerciseName, newExercise.name);

    const submitBtn = getByText('Concluir');
    await act(() => {
      fireEvent.press(submitBtn);
    });

    expect(mockedUpsetExercise).not.toBeCalled();

    expect(mockedShowToast).toBeCalledWith({
      type: 'error',
      props: {message: 'Seleceione ao menos uma categoria'},
    });
  });
  it('should create a new exercise', async () => {
    jest.spyOn(exerciseService, 'getExercise').mockResolvedValue([]);
    const mockedUpsetExercise = jest
      .spyOn(exerciseService, 'upsertExercise')
      .mockResolvedValue(mocks.newExercise);

    const {findByTestId, getByPlaceholderText, getByText, findByText, debug} =
      renderScreen(<AddExerciseScreen />);

    const openBottomSheetBtn = await findByTestId('openBottomSheetBtn');
    fireEvent.press(openBottomSheetBtn);

    const inputExerciseName = getByPlaceholderText('Nome do exercício');
    fireEvent.changeText(inputExerciseName, mocks.newExercise.name);

    const muscleSelected = getByText(mocks.newExercise.muscles[0]);
    const categorySelected = getByText(mocks.newExercise.categories[0]);

    const submitBtn = getByText('Concluir');
    await act(() => {
      fireEvent.press(muscleSelected);
      fireEvent.press(categorySelected);
    });
    expect(categorySelected.props.style[0].color).toEqual(dark.colors.text);

    await act(() => {
      fireEvent.press(categorySelected);
    });
    expect(categorySelected.props.style[0].color).toEqual(
      dark.colors.secondText,
    );
    await act(() => {
      fireEvent.press(categorySelected);
      fireEvent.press(submitBtn);
    });

    await waitFor(() => expect(mockedUpsetExercise).toBeCalled());

    const createdExerciseComponent = await findByText(mocks.newExercise.name);
    expect(createdExerciseComponent).toBeTruthy();

    expect(mockedShowToast).toBeCalledWith({
      type: 'success',
      props: {message: 'Exercício criado com sucesso!'},
    });
  });
  it('should add the exercise in workout', async () => {
    const store = setupStore({
      workout: {
        canEdit: true,
        isWorkingout: false,
        timer: null,
        workout: {
          _id: '1',
          title: 'MyWorkout',
          exercises: [],
          createdAt: Date.now(),
          user_id: mocks.user.uid,
          banner: '',
        },
      },
    });
    jest
      .spyOn(exerciseService, 'getExercise')
      .mockResolvedValue([mocks.newExercise]);
    const {findByTestId, findByText, getByText} = renderScreen(
      <AddExerciseScreen />,
      {
        store,
      },
    );

    const exercise = await findByText(mocks.newExercise.name);
    fireEvent.press(exercise);
    expect(mockedShowToast).not.toBeCalled();
    expect(mockedgoBack).toBeCalled();
    expect(store.getState().workout.workout.exercises.length).toEqual(1);
  });
  it('should show error toast when try add the exercise already exist', async () => {
    const store = setupStore({
      workout: {
        canEdit: true,
        isWorkingout: false,
        timer: null,
        workout: {
          _id: '1',
          title: 'MyWorkout',
          exercises: [
            {
              exercise_id: mocks.newExercise.name,
              series: [],
            },
          ],
          createdAt: Date.now(),
          user_id: mocks.user.uid,
          banner: '',
        },
      },
    });
    jest
      .spyOn(exerciseService, 'getExercise')
      .mockResolvedValue([mocks.newExercise]);
    const {findByTestId, findByText, getByText} = renderScreen(
      <AddExerciseScreen />,
      {
        store,
      },
    );

    const exercise = await findByText(mocks.newExercise.name);
    fireEvent.press(exercise);
    expect(mockedShowToast).toBeCalled();
    expect(mockedgoBack).not.toBeCalled();
    expect(store.getState().workout.workout.exercises.length).toEqual(1);
  });
  it('should delete exercise when confirm alert', async () => {
    let mockedConfirm: AlertButton['onPress'];

    const mockedAlert = jest
      .spyOn(Alert, 'alert')
      .mockImplementation((title, message, buttons) => {
        if (buttons && buttons[0].onPress) {
          mockedConfirm = buttons[0].onPress;
        }
      });

    jest
      .spyOn(exerciseService, 'getExercise')
      .mockResolvedValue([mocks.newExercise]);

    const {findByText, queryByText} = renderScreen(<AddExerciseScreen />);

    const someInitialExercise = await findByText('dips', {exact: false});
    fireEvent(someInitialExercise, 'longPress');

    expect(mockedAlert).not.toBeCalled();

    const myExercise = await findByText(mocks.newExercise.name);
    fireEvent(myExercise, 'longPress');

    expect(mockedAlert).toBeCalled();

    await act(() => mockedConfirm && mockedConfirm());

    expect(queryByText(mocks.newExercise.name)).toBeNull();
  });
});
