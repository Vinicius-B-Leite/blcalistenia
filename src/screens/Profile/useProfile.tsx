import {pickeImage} from '@/utils/pickImage';
import {useState} from 'react';

export default function useProfile() {
  const [showChangeUsername, setShowChangeUsername] = useState(false);

  const handlePickImage = async () => {
    const image = await pickeImage();

    if (image.assets && image.assets[0].uri) {
    }
  };

  const handleChangeName = async (newName: string) => {
    if (!newName) return;

    setShowChangeUsername(false);
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
