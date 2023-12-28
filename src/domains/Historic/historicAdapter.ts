import {HistoricType} from '@/models';

const adapter = (historic: any): HistoricType => {
  return {
    _id: historic._id,
    date: historic.date,
    timerInSeconds: historic.timerInSeconds,
    user_id: historic.user,
    workout: historic.workout,
    createdAt: historic.createdAt,
    deletedAt: historic.deletedAt,
    updatedAt: historic.updatedAt,
  };
};

export const historicAdapter = {
  adapter,
};
