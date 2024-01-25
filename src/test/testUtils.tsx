import {dark} from '@/theme';
import {ThemeProvider} from '@shopify/restyle';
import {RenderOptions, render} from '@testing-library/react-native';

const AllProviders = ({children}: React.PropsWithChildren) => {
  return <ThemeProvider theme={dark}>{children}</ThemeProvider>;
};

const customRender = <T,>(
  component: React.ReactElement<T>,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return render(component, {wrapper: AllProviders, ...options});
};

export * from '@testing-library/react-native';
export {customRender as render};
