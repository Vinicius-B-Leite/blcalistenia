import React from 'react';
import {Dimensions, View} from 'react-native';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import Box, {BoxType} from '../Box/Box';
import {Theme, dark} from '@/theme/dark';

const {height} = Dimensions.get('screen');
type ImageProps = Pick<FastImageProps, 'source' | 'resizeMode'> &
  Pick<BoxType, 'width' | 'height' | 'borderRadius'> & {
    isCircle?: boolean;
  };
const Image: React.FC<ImageProps> = ({
  source,
  resizeMode,
  isCircle = false,
  borderRadius,
  ...boxProps
}) => {
  return (
    <FastImage
      source={source}
      resizeMode={resizeMode}
      style={{
        width: boxProps.width,
        height: boxProps.height,
        borderRadius: isCircle ? height : dark.borderRadii[borderRadius || 0],
      }}
    />
  );
};

export default Image;
