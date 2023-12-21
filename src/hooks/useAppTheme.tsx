import {Theme} from '@/theme/dark';
import {useTheme} from '@shopify/restyle';

export const useAppTheme = () => useTheme<Theme>();
