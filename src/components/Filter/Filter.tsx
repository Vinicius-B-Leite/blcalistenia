import React from 'react';

import {BoxPressable, BoxPressableProps} from '../Box/Box';
import Text from '../Text/Text';

type FilterProps = BoxPressableProps & {
  label: string;
  isActive: boolean;
};

const Filter: React.FC<FilterProps> = ({isActive, label, ...rest}) => {
  return (
    <BoxPressable
      paddingVertical={4}
      paddingHorizontal={14}
      bg={isActive ? 'contrast' : 'secondBg'}
      borderRadius={'full'}
      {...rest}>
      <Text preset="pSmall" color={isActive ? 'text' : 'secondText'}>
        {label}
      </Text>
    </BoxPressable>
  );
};

export default Filter;
