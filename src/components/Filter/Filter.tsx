import React from 'react';

import {BoxPressable} from '../Box/Box';
import {Text} from '../Text/Text';
import {BoxPressableProps} from '../Box/types';

type FilterProps = BoxPressableProps & {
  label: string;
  isActive: boolean;
};

export const Filter: React.FC<FilterProps> = ({isActive, label, ...rest}) => {
  return (
    <BoxPressable
      paddingVertical={4}
      paddingHorizontal={14}
      bg={isActive ? 'contrast' : 'secondBg'}
      borderRadius={'full'}
      {...rest}>
      <Text
        preset="pSmall"
        color={isActive ? 'text' : 'secondText'}
        numberOfLines={1}>
        {label}
      </Text>
    </BoxPressable>
  );
};


