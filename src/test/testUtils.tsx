import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {WorkoutReducer, workoutListReducer, exerciseReducer} from '@/features';
import {dark} from '@/theme';
import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from '@shopify/restyle';
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import UserContextProvider from '@/contexts/AuthContext';
import ThemeContextProvider from '@/contexts/ThemeContext';

const AllProviders = () => {
  return ({children}: React.PropsWithChildren) => (
    <ThemeProvider theme={dark}>{children}</ThemeProvider>
  );
};

const customRender = <T,>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(component, {wrapper: AllProviders(), ...options});
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const rootReducer = combineReducers({
  workout: WorkoutReducer,
  workoutList: workoutListReducer,
  exercise: exerciseReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
const ScreensProviders = (store: AppStore) => {
  return ({children}: React.PropsWithChildren) => (
    <UserContextProvider>
      <Provider store={store}>
        <NavigationContainer>
          <ThemeProvider theme={dark}>
            <ThemeContextProvider>{children}</ThemeContextProvider>
          </ThemeProvider>
        </NavigationContainer>
      </Provider>
    </UserContextProvider>
  );
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;

export const renderScreen = <T,>(
  component: React.ReactElement<T>,
  {
    preloadedState = {},
    store = configureStore({
      reducer: rootReducer,
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) => {
  return {
    store,
    ...render(component, {wrapper: ScreensProviders(store), ...renderOptions}),
  };
};

const customRenderHook = <Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) => {
  return renderHook(renderCallback, {wrapper: AllProviders(), ...options});
};

export * from '@testing-library/react-native';
export {customRender as render};
export {customRenderHook as renderHook};
