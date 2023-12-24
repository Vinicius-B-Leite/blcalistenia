import React from 'react';

import {ImageProps, Image} from '../Image/Image';
import {BoxType} from '../Box/Box';

type CircleImageProps = ImageProps & {
  size: BoxType['width'];
};

const CircleImage: React.FC<CircleImageProps> = ({
  size,
  resizeMode,
  source,
}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      width={size}
      height={size}
      borderRadius={'full'}
    />
  );
};

export default CircleImage;
