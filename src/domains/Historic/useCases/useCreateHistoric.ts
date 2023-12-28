import {useAuth} from '@/contexts';
import {historicService} from '../historicService';
import uuid from 'react-native-uuid';

import {HistoricType} from '@/models';

export function useCreateHistoric() {
  const {user} = useAuth();

  const handleCreateHistoric = async (
    props: Omit<HistoricType, '_id' | 'user_id' | 'createdAt'>,
  ) => {
    await historicService.createHistoric({
      ...props,
      _id: uuid.v4().toString(),
      user_id: user!.uid,
      createdAt: new Date(),
    });
  };

  return {
    handleCreateHistoric,
  };
}
