import {Theme} from '@/theme/dark';
import {createText} from '@shopify/restyle';
import React from 'react';

import {textsVariantsStyles, variants} from './variants';

const RestyleText = createText<Theme>();
export type RestyleTextProps = React.ComponentProps<typeof RestyleText>;

type TextProps = RestyleTextProps & {
  preset: keyof typeof variants;
  children: React.ReactNode;
  bold?: boolean;
};
const Text: React.FC<TextProps> = ({preset, children, bold, ...rest}) => {
  return (
    <RestyleText
      fontWeight={bold ? 'bold' : undefined}
      {...textsVariantsStyles[preset]}
      {...rest}>
      {children}
    </RestyleText>
  );
};

export default Text;
