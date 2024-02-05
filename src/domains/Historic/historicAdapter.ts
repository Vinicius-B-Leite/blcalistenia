import {HistoricType, HistoricTypeStorage} from '@/models';

const adapter = (historic: HistoricTypeStorage): HistoricType => {
  return {
    _id: historic._id,
    date: historic.date,
    timerInSeconds: historic.timerInSeconds,
    user_id: historic.user_id,
    workout: JSON.parse(historic.workout),
    createdAt: historic.createdAt,
    deletedAt: historic.deletedAt,
    updatedAt: historic.updatedAt,
  };
};

export const historicAdapter = {
  adapter,
};
