import {UserType} from '@/models/UserType';
import React from 'react';
import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {BoxPressable} from '@/components/Box/Box';
import CircleImage from '@/components/CircleImage/CircleImage';

type AvatarProps = Pick<UserType, 'avatar'> & {
  handlePickImage: () => Promise<void>;
};

const Avatar: React.FC<AvatarProps> = ({avatar, handlePickImage}) => {
  return (
    <BoxPressable alignSelf="center" onPress={handlePickImage}>
      <CircleImage
        source={
          avatar?.length > 0
            ? {
                uri: avatar,
              }
            : DefaultUserPhoto
        }
        resizeMode="cover"
        size={200}
      />
    </BoxPressable>
  );
};

export default Avatar;
