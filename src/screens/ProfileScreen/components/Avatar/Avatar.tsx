import {UserType} from '@/models';
import React from 'react';
import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {BoxPressable, CircleImage} from '@/components';

type AvatarProps = Pick<UserType, 'avatar'> & {
  handlePickImage: () => Promise<void>;
};

const Avatar: React.FC<AvatarProps> = ({avatar, handlePickImage}) => {
  return (
    <BoxPressable alignSelf="center" onPress={handlePickImage} mb={24}>
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
