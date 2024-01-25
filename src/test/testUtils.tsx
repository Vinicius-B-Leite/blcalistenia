import UserContextProvider from '@/contexts/AuthContext';
import {dark} from '@/theme';
import {ThemeProvider} from '@shopify/restyle';
import {
  RenderHookOptions,
  RenderOptions,
  render,
  renderHook,
} from '@testing-library/react-native';

const AllProviders = ({children}: React.PropsWithChildren) => {
  return (
    <UserContextProvider>
      <ThemeProvider theme={dark}>{children}</ThemeProvider>
    </UserContextProvider>
  );
};

const customRender = <T,>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(component, {wrapper: AllProviders, ...options});
};

const customRenderHook = <Result, Props>(
  renderCallback: (props: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>,
) => {
  return renderHook(renderCallback, {wrapper: AllProviders, ...options});
};

export * from '@testing-library/react-native';
export {customRender as render};
export {customRenderHook as renderHook};
