import {useAuth} from '@/contexts';

import {pickeImage} from '@/utils';

import {useState} from 'react';
import Toast from 'react-native-toast-message';

export default function useProfile() {
  const [showChangeUsername, setShowChangeUsername] = useState(false);
  const {user, updateUser} = useAuth();

  const handlePickImage = async () => {
    const image = await pickeImage();

    if (image.assets && image.assets[0].uri && user) {
      updateUser({...user, avatar: image.assets[0].uri || ''});
    }
  };

  const handleChangeName = async (newName: string) => {
    if (!newName || !user) return;
    await updateUser({...user, username: newName});

    closeChangeUsernameModal();
  };
  const openChangeUsernameModal = () => setShowChangeUsername(true);
  const closeChangeUsernameModal = () => setShowChangeUsername(false);

  return {
    showChangeUsername,

    handleChangeName,
    handlePickImage,
    openChangeUsernameModal,
    closeChangeUsernameModal,
  };
}