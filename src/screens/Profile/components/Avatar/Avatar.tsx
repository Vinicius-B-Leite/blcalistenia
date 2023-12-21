import Image from '@/components/Image/Image';
import {UserType} from '@/models/UserType';
import React from 'react';
import DefaultUserPhoto from '@/assets/defaultUserPhoto.png';
import {BoxPressable} from '@/components/Box/Box';

type AvatarProps = Pick<UserType, 'avatar'> & {
  handlePickImage: () => Promise<void>;
};

const Avatar: React.FC<AvatarProps> = ({avatar, handlePickImage}) => {
  return (
    <BoxPressable alignSelf="center" onPress={handlePickImage}>
      <Image
        source={
          avatar?.length > 0
            ? {
                uri: avatar,
              }
            : DefaultUserPhoto
        }
        resizeMode="cover"
        height={200}
        width={200}
        isCircle
      />
    </BoxPressable>
  );
};

export default Avatar;
